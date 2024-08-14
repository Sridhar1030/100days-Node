import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const jwtSecret = process.env.JWT_SECRET || "y0urStrong$ecreTKey#123!";
export const jwtExpiry = "15m";
