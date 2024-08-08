import express from "express";
import redis from "redis";
import util from "util";
import mongoose from "mongoose";

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/caching", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Create and configure Redis client
const client = redis.createClient({ url: "redis://127.0.0.1:6380" }); // Use default port 6379
client.on("error", (err) => console.error("Redis error:", err));
client.on("ready", () => console.log("Redis client connected"));

client.get = util.promisify(client.get);
client.set = util.promisify(client.set);

// Middleware to handle Redis caching
app.get("/user/:id", async (req, res) => {
	const { id } = req.params;

	try {
		// Ensure Redis client is connected
		if (!client.connected) {
			return res
				.status(500)
				.json({ message: "Redis client is not connected" });
		}

		// Check Redis cache
		const cachedUser = await client.get(id);

		if (cachedUser) {
			return res.json(JSON.parse(cachedUser));
		}

		// If not cached, fetch from MongoDB
		const user = await User.findById(id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Cache the user data
		await client.set(id, JSON.stringify(user), "EX", 3600); // Cache for 1 hour

		return res.json(user);
	} catch (error) {
		console.error("Error fetching user:", error);
		return res.status(500).json({ message: "Server error" });
	}
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
