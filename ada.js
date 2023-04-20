var client = require('./config');
require('dotenv').config();

const timeZone = 'Asia/Jakarta';
const options = { timeZone: timeZone, timeZoneName: 'short' };

client.aioSensor.subscribe(`${process.env.AIO_USERNAME}/groups/${process.env.AIO_GROUP_DATA}`, function (err) {
  if (!err) {
    console.log('Subscribe topic successful')
  }
})

client.aioSensor.on('message', async function (topic, message) {
  payload = JSON.parse(message.toString())
  key = Object.keys(payload.feeds)
  value = Object.values(payload.feeds)
  data = {
    table: key[0],
    value: value[0],
    time: new Date().toLocaleString('en-US', options)
  }
  console.log(data);
})
