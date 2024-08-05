import { createClient } from "redis";

const client = createClient({
	url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

if (process.env.REDIS_PASSWORD) {
	client.auth(process.env.REDIS_PASSWORD);
}

client.connect().catch(console.error);

const rateLimiter = (req, res, next) => {
	const ip = req.ip;
	const key = `rate-limit:${ip}`;
	const limit = 10; // Maximum number of requests
	const window = 60; // Time window in seconds

	client
		.multi()
		.set([key, 0, "EX", window, "NX"])
		.incr(key)
		.exec()
		.then((replies) => {
			const requestCount = replies[1];
			if (requestCount > limit) {
				return res.status(429).json({ error: "Too many requests" });
			}
			next();
		})
		.catch((err) => {
			console.error("Redis error:", err);
			res.status(500).json({ error: "Internal server error" });
		});
};

export default rateLimiter;
