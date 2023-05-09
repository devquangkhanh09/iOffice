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
var fan_automode = 0;
var humd_automode = 0;

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
  if (data.feed === 'data-humd' && humd_automode === 1){
    if (val < humd_threshold) aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_RELAY}`, '1');
    else aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_RELAY}`, '0');
  }
  else if (data.feed === 'data-temp' && fan_automode === 1){
    if (val < temp_threshold[0]) aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_FAN}`, '0');
      else if (val < temp_threshold[1]) aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_FAN}`, '25');
      else if (val < temp_threshold[2]) aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_FAN}`, '50');
      else if (val < temp_threshold[3]) aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_FAN}`, '75');
      else aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_FAN}`, '100');
  }
  console.log(`Send data to Firebase: ${data}`);
})

async function sendDataToAda({
  feedkey, 
  value
}) {
  aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${feedkey}`, String(value));
  console.log(`Send data to Adafruit: ${feedkey} = ${value}`);
}

const db = admin.firestore();
const fanFeed = 'control-fan';
const fanRef = db.collection(fanFeed);
const fanQueryLog = fanRef.orderBy('timestamp','desc').limit(1);
fanQueryLog.onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      const log = change.doc.data();
      console.log(`Receive from Firebase ${fanFeed}`);
      console.log(log);
      if (log.status !== undefined)
        if (log.status === 'off') fan_automode = 0;
      if (log.mode !== undefined) 
        if (log.mode === 'auto') fan_automode = 1; else fan_automode = 0;
      if (log.threshold !== undefined)
        temp_threshold = log.threshold;      
    }
  });
});

const humdFeed = 'control-relay';
const humdRef = db.collection(humdFeed);
const humdQueryLog = humdRef.orderBy('timestamp').limit(1);
humdQueryLog.onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      const log = change.doc.data();
      console.log(`Receive from Firebase ${humdFeed}`);
      console.log(log);
      if (log.status !== undefined)
        if (log.status === 'off') humd_automode = 0;
      if (log.mode !== undefined) 
        if (log.mode === 'auto') humd_automode = 1; else humd_automode = 0;
      if (log.threshold !== undefined)
        humd_automode = log.threshold;      
    }
  });
});

module.exports = {
  sendDataToAda,
  getCurrentTime
};