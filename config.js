var mqtt = require('mqtt');
require('dotenv').config();

exports.aioSensor = mqtt.connect(`mqtts://${process.env.AIO_USERNAME}:${process.env.AIO_KEY}@io.adafruit.com`, 8883)
exports.aioControl = mqtt.connect(`mqtts://${process.env.AIO_USERNAME}:${process.env.AIO_KEY}@io.adafruit.com`, 8883)