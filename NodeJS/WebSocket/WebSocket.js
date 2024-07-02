const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (ws) => {
	console.log("New client connected");

	// Handle incoming messages from clients
	ws.on("message", (message) => {
		console.log(`Received: ${message}`);
		// Echo the message back to the client
		ws.send(`Server: Hello to you too"`);
	});

	// Handle client disconnection
	ws.on("close", () => {
		console.log("Client disconnected");
	});

	// Handle errors
	ws.on("error", (error) => {
		console.log(`Error: ${error.message}`);
	});
});

console.log("WebSocket server is listening on ws://localhost:8080");
