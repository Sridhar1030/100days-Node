import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();
const JWT_SECRET = "your_jwt_secret"; // Replace with a secure key
            
// Registration Route
router.post("/register", async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res
			.status(400)
			.json({ message: "Username and password are required" });
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = new User({ username, password: hashedPassword });

	try {
		await newUser.save();
		res.status(201).json({ message: "User registered" });
	} catch (err) {
		res.status(400).json({
			message: "User registration failed",
			error: err.message,
		});
	}
});

// Login Route
router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res
			.status(400)
			.json({ message: "Username and password are required" });
	}

	try {
		const user = await User.findOne({ username });

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res
				.status(401)
				.json({ message: "Invalid username or password" });
		}

		const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
			expiresIn: "1h",
		});

		res.cookie("token", token, {
			httpOnly: true, //!The httpOnly flag ensures that the cookie is not accessible via JavaScript running in the browser, providing protection against cross-site scripting (XSS) attacks.
			secure: true, // Ensures that the cookie is only sent to the server over HTTPS (secure) connections.
			maxAge: 3600000, // 1 hour
		});

		res.status(200).json({ message: "Logged in successfully" });
	} catch (err) {
		res.status(500).json({ message: "Login failed", error: err.message });
	}
});

export default router;
