import { verify, sign } from "jsonwebtoken";
import { jwtSecret } from "../config/config";

const verifyToken = (token) => {
	try {
		return verify(token, jwtSecret);
	} catch (error) {
		throw new Error("Token verification failed");
	}
};

const generateToken = (user) => {
	return sign({ userId: user.id }, jwtSecret, { expiresIn: "15m" });
};

export default { verifyToken, generateToken };
