// src/server.js
import express from "express";

const app = express();
const PORT = 3000;

// A CPU-intensive endpoint
app.get("/compute", (req, res) => {
	let sum = 0;
	for (let i = 0; i < 1e7; i++) {
		sum += i;
	}
	res.send(`Sum is ${sum}`);
});

// A memory-intensive endpoint
app.get("/memory", (req, res) => {
	const bigArray = [];
	for (let i = 0; i < 1e6; i++) {
		bigArray.push({ index: i, value: Math.random() });
	}
	res.send("Memory intensive task done!");
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
