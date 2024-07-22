import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import authRoutes from "./route/auth.js"; // corrected path
import authenticateToken from "./middlewares/authenticateToken.js"; // import the middleware

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = "your_jwt_secret"; // Replace with a secure key

mongoose.connect("mongodb://localhost:27017/jwt-auth", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

// Protect this route with authenticateToken middleware
app.get("/protected", authenticateToken, (req, res) => {
	res.send("This is a protected route");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
