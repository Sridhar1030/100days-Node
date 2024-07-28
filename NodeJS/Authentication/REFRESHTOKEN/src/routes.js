import { Router } from "express";
import authController from "./auth.js";
import authenticateToken from "./middleware/authMiddleware.js";

const router = Router();

const { login, refreshToken, logout } = authController;

router.post("/login", login);
router.post("/token", refreshToken);
router.post("/logout", logout);

router.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});

export default router;
