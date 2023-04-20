var mqtt = require('mqtt');
require('dotenv').config();

aioSensor = mqtt.connect(`mqtts://${process.env.AIO_USERNAME}:${process.env.AIO_KEY}@io.adafruit.com`, 8883);
aioControl = mqtt.connect(`mqtts://${process.env.AIO_USERNAME}:${process.env.AIO_KEY}@io.adafruit.com`, 8883);

const timeZone = 'Asia/Jakarta';
const options = { timeZone: timeZone, timeZoneName: 'short' };

aioSensor.subscribe(`${process.env.AIO_USERNAME}/groups/${process.env.AIO_GROUP_DATA}`, function (err) {
  if (!err) {
    console.log('Subscribe topic successful');
  }
})

const temp_threshold = 25;
const humd_threshold = 50;
const automode = 1;

aioSensor.on('message', async function (topic, message) {
  payload = JSON.parse(message.toString());
  key = Object.keys(payload.feeds);
  value = Object.values(payload.feeds);
  data = {
    feed: key[0],
    value: value[0],
    time: new Date().toLocaleString('en-US', options)
  };
  val = parseFloat(data.value);
  if (automode === 1){
    if (data.feed === 'data-humd'){
      if (val < humd_threshold) aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_RELAY}`, '1');
      else if (val > 60) aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_RELAY}`, '0');
    }
    else if (data.feed === 'data-temp'){
      if (val < 20) aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_FAN}`, '0');
      else if (val - temp_threshold < 2) aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_FAN}`, '1');
      else if (val - temp_threshold < 3) aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_FAN}`, '2');
      else if (val - temp_threshold < 4) aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_FAN}`, '3');
      else if (val - temp_threshold < 6) aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_FAN}`, '4');  
      else aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${process.env.AIO_FAN}`, '5');
    }
  }
  console.log(data);
})

async function sendDate(feed, value) {
  var feedkey;
  if (feed === 'relay') feedkey = process.env.AIO_RELAY;
  else if (feed === 'led') feedkey = process.env.AIO_LED;
  else feedkey = process.env.AIO_FAN;
  aioControl.publish(`${process.env.AIO_USERNAME}/feeds/${feedkey}`, `${value}`)
}