import express from "express";
import { blacklistToken } from "../middlewares/blacklist.js";
import { authenticate } from "../middlewares/authenticate.js";
import signToken from "../utils/jwt.js"; // Adjust the path as needed
import User from "../models/user.js"; // Assuming you have a User model
import BlacklistedToken from "../models/BlacklistedToken.js";

const router = express.Router();

router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	// Find the user in the database
	const user = await User.findOne({ username });

	if (!user || !(await user.comparePassword(password))) {
		return res
			.status(401)
			.json({ message: "Invalid username or password" });
	}

	// Check if the user is blacklisted
	const token = signToken(user._id);
	const blacklistedToken = await BlacklistedToken.findOne({ token });

	if (blacklistedToken) {
		return res.status(401).json({ message: "Token has been blacklisted" });
	}

	res.status(200).json({ token });
});

router.post("/logout", authenticate, blacklistToken);

export default router;
