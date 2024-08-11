import { verifyToken } from "../utils/jwt.js";

export const authenticate = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decoded = await verifyToken(token);
		req.user = decoded;
		next();
	} catch (err) {
		res.status(401).json({ error: "Unauthorized" });
	}
};
