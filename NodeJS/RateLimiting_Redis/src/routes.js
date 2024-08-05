import express from "express";
import rateLimiter from "./rateLimiter.js";

const router = express.Router();

router.get("/api", rateLimiter, (req, res) => {
	res.send("Hello, world!");
});

export default router;
