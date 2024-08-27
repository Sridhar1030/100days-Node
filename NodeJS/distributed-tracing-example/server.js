// server.js
require("./tracing"); // Import tracing before other modules to ensure tracing starts first
const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

app.get("/slow", (req, res) => {
	setTimeout(() => {
		res.send("This was a slow request.");
	}, 2000);
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
