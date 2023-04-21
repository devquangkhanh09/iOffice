var mqtt = require('mqtt');
var { sendDataToFirebase } = require('./firebaseApp');
require('dotenv').config();
var { admin } = require('./firebaseApp');

aioSensor = mqtt.connect(`mqtts://${process.env.AIO_USERNAME}:${process.env.AIO_KEY}@io.adafruit.com`, 8883);
aioControl = mqtt.connect(`mqtts://${process.env.AIO_USERNAME}:${process.env.AIO_KEY}@io.adafruit.com`, 8883);
aioSensor.subscribe(`${process.env.AIO_USERNAME}/groups/${process.env.AIO_GROUP_DATA}`, function (err) {
  if (!err) {
    console.log('Subscribe topic successful');
  } else {
    console.log('Subscribe topic failed, error:', err);
  }
})

var temp_threshold = [20, 23, 25, 27];
var humd_threshold = 50;
var automode = 1;

const getCurrentTime = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String((date.getMonth() + 1)).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

const curTime = getCurrentTime();

aioSensor.on('message', async function (topic, message) {
  const payload = JSON.parse(message.toString());
  const key = Object.keys(payload.feeds);
  const value = Object.values(payload.feeds);
  const data = {
    feed: key[0],
    value: value[0],
    timestamp: getCurrentTime()
  };
  await sendDataToFirebase(data);

  val = parseFloat(data.value);
  if (automode === 1){
    if (data.feed === 'data-humd'){
      if (val < humd_threshold) aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_RELAY}`, '1');
      else aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_RELAY}`, '0');
    }
    else if (data.feed === 'data-temp'){
      if (val < temp_threshold[0]) aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_FAN}`, '0');
      else if (val < temp_threshold[1]) aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_FAN}`, '1');
      else if (val < temp_threshold[2]) aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_FAN}`, '2');
      else if (val < temp_threshold[3]) aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_FAN}`, '3');
      else aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_FAN}`, '4');
    }
  }
  console.log(data);
})

async function sendDataToAda({
  feedkey, 
  value
}) {
  aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${feedkey}`, value);
  console.log(`Send data to Adafruit: ${feedkey} = ${value}`);
}

const db = admin.firestore();
const logFeed = 'control';
const logRef = db.collection(logFeed);
const queryLog = logRef.where('timestamp', '>=', curTime);
queryLog.onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      const log = change.doc.data();
      if (log.mode === 1){
        automode = 1;
        if (log.device === 'fan') temp_threshold = log.threshold;
        else if (log.device === 'relay') humd_threshold = log.threshold;
      }
    }
  });
})

module.exports = {
  sendDataToAda,
  getCurrentTime
};