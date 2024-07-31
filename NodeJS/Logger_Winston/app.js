// app.js
import express from "express";
import bodyParser from "body-parser";
import logger from "./logger.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Middleware for logging errors
app.use((err, req, res, next) => {
	logger.error(err.message, { stack: err.stack });
	res.status(500).send("Something went wrong!");
});

// Example route
app.post("/webhook", (req, res) => {
	logger.info("Received webhook:", req.body);
    console.log(req.body)
	logger.info("webhook accessed ");
	res.sendStatus(200);
});

app.get("/", (req, res) => {
	logger.info("Root route accessed");

	console.log("hello");
	res.send("hello");
});

app.listen(PORT, () => {
	logger.info(`Server is running on port ${PORT}`);
});
