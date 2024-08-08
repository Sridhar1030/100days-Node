import express, { json,  } from "express";
import compression from "compression";
import rateLimit from "express-rate-limit";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(compression()); // Compress responses
app.use(json()); // Parse JSON bodies
app.use("public", { maxAge: "1d" }); // Serve static files with caching

// Rate Limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use("/users", userRoutes); // User-related routes

// Error Handling
app.use(errorHandler); // Custom error handling middleware

export default app;
