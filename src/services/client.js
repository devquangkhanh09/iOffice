import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AIO_KEY } from '@env';

const controlFeeds = [
    'led',
    'relay',
    'fan',
];
const prefixControlFeed = "metacrektal/feeds/iot-control.control-";
const baseUrl = "https://io.adafruit.com/api/v2";

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

	const client = new Paho.MQTT.Client(options.host, Number(options.port), options.path, `client-${Math.random()}`);

	client.connect({
		onSuccess: () => {
			console.log(`connected to ${options.path}`);
			client.subscribe(options.path);
			connections[path] = client;
			callback(options.path);
		},
		useSSL: true,
		timeout: 3,
		onFailure: (e) => {
			console.log(e);
		},
		userName: "metacrektal",
		password: AIO_KEY,
	});
}

const getClient = (path) => {
	return connections[path];
}

const disconnect = () => {
	Object.keys(connections).forEach((path) => {
		connections[path].disconnect();
	});
}

const resetControlFeeds = () => {
	controlFeeds.forEach(async (feed) => {
		const feedData = await fetch(`${baseUrl}/${prefixControlFeed}${feed}/data`, {
			method: "GET",
			headers: {
				"X-AIO-Key": AIO_KEY
			}
		});
		const data = await feedData.json();
		data.forEach(async (item) => {
			await fetch(`${baseUrl}/${prefixControlFeed}${feed}/data/${item.id}`, {
				method: "DELETE",
				headers: {
					"X-AIO-Key": AIO_KEY
				}
			});
			console.log("deleted", item.id);
		});
	});
}

export {
	controlFeeds,
	prefixControlFeed,
	baseUrl,
	connect, 
	getClient,
	disconnect,
	resetControlFeeds 
};