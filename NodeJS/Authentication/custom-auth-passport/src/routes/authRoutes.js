import express from "express";
import passport from "../auth/customStrategy.js"; // Make sure the correct path is used

const router = express.Router();

router.post(
	"/login",
	passport.authenticate("custom", { session: false }),
	(req, res) => {
		res.json({ message: "Logged in successfully", user: req.user });
	}
);

export default router;
