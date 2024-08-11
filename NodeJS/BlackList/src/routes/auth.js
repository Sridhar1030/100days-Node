import express from "express";
import { blacklistToken } from "../middlewares/blacklist.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/login", (req, res) => {
	// Handle login and generate JWT
	const token = signToken({ id: user.id });
	res.status(200).json({ token });
});

router.post("/logout", authenticate, blacklistToken);

export default router;
