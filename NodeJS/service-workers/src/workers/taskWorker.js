import { parentPort } from "worker_threads";

// Example background task function
const performBackgroundTask = () => {
	let sum = 0;
	for (let i = 0; i < 1e6; i++) {
		sum += i;
	}
	return sum;
};

// Listen for messages from the main thread
parentPort.on("message", (message) => {
	if (message === "start") {
		const result = performBackgroundTask();
		parentPort.postMessage(result);
	}
});
