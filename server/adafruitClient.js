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

var fanDetail;
var relayDetail;

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
    value: value[0],
    timestamp: getCurrentTime()
  };
  await sendDataToFirebase(key[0], data);

  val = parseFloat(data.value);

  if (key[0] === 'data-humd' && relayDetail.mode === 'auto'){
    let status;

    if (val < relayDetail.threshold) {
      aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_RELAY}`, '1');
      status = 'on';
    }
    else {
      aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_RELAY}`, '0');
      status = 'off';
    }

    await sendDataToFirebase('control-relay', {
      ...relayDetail,
      status,
      timestamp: getCurrentTime()
    });

    await sendDataToFirebase('control', {
      device: 'relay',
      user: 'auto',
      status,
      timestamp: getCurrentTime()
    });

  }
  else if (key[0] === 'data-temp' && fanDetail.mode === 'auto'){
    let level;

    if (val < fanDetail.threshold[0]) level = 0;
    else if (val < fanDetail.threshold[1]) level = 25;
    else if (val < fanDetail.threshold[2]) level = 50;
    else if (val < fanDetail.threshold[3]) level = 75;
    else level = 100;
      
    aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_FAN}`, String(level));
    await sendDataToFirebase('control-fan', {
      ...fanDetail,
      level: level / 25,
      timestamp: getCurrentTime()
    });

    await sendDataToFirebase('control', {
      device: 'fan',
      user: 'auto',
      level: level / 25,
      timestamp: getCurrentTime()
    });

  }
  console.log(`Send data to Firebase: ${JSON.stringify(data)}`);
})

async function sendDataToAda({
  feedkey, 
  value
}) {
  aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${feedkey}`, String(value));
  console.log(`Send data to Adafruit: ${feedkey} = ${value}`);
}

const db = admin.firestore();
const fanCollection = 'control-fan';
const fanRef = db.collection(fanCollection);
const fanQuery = fanRef.orderBy('timestamp','desc').limit(1);
fanQuery.onSnapshot(snapshot => {
  fanDetail = snapshot.docs[0].data();
});

const relayCollection = 'control-relay';
const relayRef = db.collection(relayCollection);
const relayQuery = relayRef.orderBy('timestamp','desc').limit(1);
relayQuery.onSnapshot(snapshot => {
  relayDetail = snapshot.docs[0].data();
});

module.exports = {
  sendDataToAda,
  getCurrentTime
};