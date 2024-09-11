import { Counter, Gauge, Histogram, Summary } from "prom-client";

// Example metrics
export const httpRequestCounter = new Counter({
	name: "http_requests_total",
	help: "Total number of HTTP requests made",
	labelNames: ["method", "endpoint"],
});

export const activeSessionsGauge = new Gauge({
	name: "active_sessions",
	help: "Current number of active sessions",
});

export const responseTimeHistogram = new Histogram({
	name: "http_response_time_seconds",
	help: "HTTP response time in seconds",
	labelNames: ["method", "endpoint"],
});

export const responseSizeSummary = new Summary({
	name: "http_response_size_bytes",
	help: "HTTP response size in bytes",
	labelNames: ["method", "endpoint"],
});
