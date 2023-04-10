import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 3600 * 24,
  enableCache: true,
  sync : {}
});

const options = {
  host: 'io.adafruit.com',
  port: 443,
  path: '/metacrektal/feeds/iot-control.control-led',
};

client = new Paho.MQTT.Client(options.host, options.port, options.path);

client.connect({
  onSuccess: () => console.log(`connected to ${options.path}`),
  useSSL: true,
  timeout: 3,
  onFailure: (e) => console.log(e),
  userName: "metacrektal",
  password: "aio_JBcy15rQ5AtQZBWmGupHjUzYcbQ1"
});