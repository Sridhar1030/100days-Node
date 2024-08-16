
// !Using Http
// const http = require("http").createServer();
// const io = require("socket.io")(http, {
// 	cors: { origin: "*" },
// });

// io.on("connection", (socket) => {
// 	console.log("a user connected");
// 	socket.on("message", (message) => {
// 		console.log(message);
// 		io.emit("message", `${socket.id.substr(0, 2)} said ${message}`);
// 	});
// });

// http.listen(8080, () => console.log(`listening on http://localhost:8080`));

//! Using Express

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize Express
const app = express();

// Create an HTTP server using the Express app
const httpServer = http.createServer(app);

// Attach socket.io to the HTTP server
const io = socketIo(httpServer, {
	cors: { origin: "*" }, // Enable CORS for all origins
});

// Middleware to parse JSON requests
app.use(express.json());

// Route to test server
app.get('/', (req, res) => {
	res.send('WebSocket Server with Express');
});

// WebSocket connection handler
io.on("connection", (socket) => {
	console.log("a user connected");

	socket.on("message", (message) => {
		console.log(message);
		io.emit("message", `${socket.id.substr(0, 2)} said ${message}`);
	});

	socket.on("disconnect", () => {
		console.log("a user disconnected");
	});
});

// Start the server
const PORT = 8080;
httpServer.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
