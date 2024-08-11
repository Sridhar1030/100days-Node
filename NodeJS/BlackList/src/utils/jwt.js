import jwt from "jsonwebtoken";
import BlacklistedToken from "../models/BlacklistedToken.js";

export const signToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = async (token) => {
	const blacklisted = await BlacklistedToken.findOne({ token });
	if (blacklisted) throw new Error("Token is blacklisted");
	return jwt.verify(token, process.env.JWT_SECRET);
};
