import { Router } from "express";
const router = Router();

// Example route
router.get("/", (req, res) => {
	res.send("User route working!");
});

export default router;
