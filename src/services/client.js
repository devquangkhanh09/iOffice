import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

init({
	size: 10000,
	storageBackend: AsyncStorage,
	defaultExpires: 3600 * 24,
	enableCache: true,
	sync: {}
});

connections = {};

const connect = async (path, callback) => {
	const options = {
		host: 'io.adafruit.com',
		port: 443,
		path,
	};

	const client = new Paho.MQTT.Client(options.host, Number(options.port), options.path);

	client.connect({
		onSuccess: () => {
			console.log(`connected to ${options.path}`);
			connections[path] = client;
			callback(options.path);
		},
		useSSL: true,
		timeout: 3,
		onFailure: (e) => {
			throw new Error(e);
		},
		userName: "metacrektal",
		password: "aio_JBcy15rQ5AtQZBWmGupHjUzYcbQ1"
	});
}

const getClient = (path) => {
	return connections[path];
}

export { connect, getClient };