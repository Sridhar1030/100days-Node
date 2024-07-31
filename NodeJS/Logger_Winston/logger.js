// logger.js
import winston from "winston";

// Define log format
const logFormat = winston.format.printf(
	({ timestamp, level, message, stack }) => {
		return `${timestamp} ${level}: ${stack || message}`;
	}
);

// Create logger
const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(
		winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
		winston.format.errors({ stack: true }),
		winston.format.splat(),
		winston.format.json(),
		logFormat
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: "logs/error.log",
			level: "error",
		}),
		new winston.transports.File({ filename: "logs/combined.log" }),
	],
});

export default logger;
