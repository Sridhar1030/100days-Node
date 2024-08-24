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

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const fetch = require("node-fetch");

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
app.get("/", (req, res) => {
	res.send("WebSocket Server with Express");
});

app.post("/analytics", (req, res) => {
	const analyticsData = req.body;
	console.log("Received analytics data:", analyticsData);
	// Here you can save analytics data to a database or log file
	res.sendStatus(200);
});

// WebSocket connection handler
io.on("connection", (socket) => {
	console.log("a user connected");

	// Listen for custom 'analytics' event from the client
	socket.on("analytics", (data) => {
		console.log("Analytics event received:", data);
		// Send the data to the '/analytics' endpoint
		fetch("http://localhost:8080/analytics", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}).catch((error) =>
			console.error("Error sending analytics data:", error)
		);
	});

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
httpServer.listen(PORT, () =>
	console.log(`Server listening on http://localhost:${PORT}`)
);
