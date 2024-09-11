import express from "express";
import { register, collectDefaultMetrics } from "prom-client";

const app = express();

// Collect default metrics
collectDefaultMetrics();

// Endpoint to get Prometheus metrics
app.get("/metrics", async (req, res) => {
	res.set("Content-Type", register.contentType);
	res.end(await register.metrics());
});

// Example endpoint to monitor
app.get("/api", (req, res) => {
	res.json({ message: "Hello, world!" });
});

export default app;
