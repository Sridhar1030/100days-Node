// src/main.js
import { Worker } from "worker_threads";
import path from "path";

// Create a new worker
const worker = new Worker(path.resolve("src/workers/taskWorker.js"));

// Listen for messages from the worker
worker.on("message", (result) => {
    console.log(`Result from worker: ${result}`);
    worker.terminate(); // Terminate the worker when done
});

// Handle errors from the worker
worker.on("error", (error) => {
    console.error(`Worker error: ${error}`);
});

// Handle when the worker exits
worker.on("exit", (code) => {
    if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
    }
});

// Start the worker task
worker.postMessage("start");
