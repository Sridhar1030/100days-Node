import jwt from "jsonwebtoken";
import BlacklistedToken from "../models/BlacklistedToken.js";


const signToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

export default signToken;


export const verifyToken = async (token) => {
	const blacklisted = await BlacklistedToken.findOne({ token });
	if (blacklisted) throw new Error("Token is blacklisted");
	return jwt.verify(token, process.env.JWT_SECRET);
};
