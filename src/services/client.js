import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

init({
	size: 10000,
	storageBackend: AsyncStorage,
	defaultExpires: 3600 * 24,
	enableCache: true,
	sync: {}
});

const connect = async (path) => {
	const options = {
		host: 'io.adafruit.com',
		port: 443,
		path,
	};

	const client = new Paho.MQTT.Client(options.host, Number(options.port), options.path);

	return new Promise((resolve, reject) => {
		client.connect({
			onSuccess: () => {
				console.log(`connected to ${options.path}`);
				resolve(client);
			},
			useSSL: true,
			timeout: 3,
			onFailure: (e) => {
				reject(e);
			},
			userName: "metacrektal",
			password: "aio_JBcy15rQ5AtQZBWmGupHjUzYcbQ1"
		});
	});
}

export default connect;