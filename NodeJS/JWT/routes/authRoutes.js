import { Router } from "express";
import { login, signup } from "../controllers/authController.js";
import validateRequest from "../middlewares/validationMiddleware.js";
import { loginSchema, signupSchema } from "../validators/authValidator.js";

const router = Router();

router.post("/login", validateRequest(loginSchema), login);
router.post("/signup", validateRequest(signupSchema), signup);

export default router;
