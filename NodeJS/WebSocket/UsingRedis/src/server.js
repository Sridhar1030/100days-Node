import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

// Redis connection
const pubClient = createClient({ url: "redis://localhost:6379" });
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));

io.on("connection", (socket) => {
	console.log("a user connected");

	socket.on("message", (msg) => {
		console.log("message: " + msg);
		io.emit("message", msg);
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

// Serve the client HTML file
app.use(express.static(path.join(__dirname, "../public")));

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
