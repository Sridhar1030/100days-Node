const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

// Define rate limit rule: 100 requests per 15 minutes
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // limit each IP to 100 requests per windowMs
	message:
		"Too many requests from this IP, please try again after 15 minutes",
});

// Apply rate limit to all requests
app.use("/api/", apiLimiter);

app.get("/api/some-endpoint", (req, res) => {
	res.send("This is a rate-limited endpoint.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
