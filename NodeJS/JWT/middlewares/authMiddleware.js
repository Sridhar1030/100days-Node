import pkg from "jsonwebtoken";
const { verify } = pkg;  // Destructure 'verify' from the 'jsonwebtoken' package
import { jwtSecret } from "../config/config.js";

const authMiddleware = (req, res, next) => {
    const token =
        req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = verify(token, jwtSecret);
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default authMiddleware;
