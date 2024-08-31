import express from "express";
import http from "http";
import { Server } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "socket.io-redis";

// Setup Express
const app = express();
const server = http.createServer(app);

// Setup Redis clients for pub/sub
const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();

// Setup Socket.IO and integrate Redis adapter
const io = new Server(server);
io.adapter(createAdapter({ pubClient, subClient }));

app.get("/", (req, res) => {
	res.send("WebSocket Server with Redis scaling");
});

// Handle WebSocket connections
io.on("connection", (socket) => {
	console.log("a user connected");

	socket.on("message", (message) => {
		console.log(`Received message: ${message}`);
		// Broadcast message to all connected clients
		io.emit("message", message);
	});

	socket.on("disconnect", () => {
		console.log("a user disconnected");
	});
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
