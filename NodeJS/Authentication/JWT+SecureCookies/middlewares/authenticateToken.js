import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret"; // Replace with a secure key

const authenticateToken = (req, res, next) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({ message: "Access denied" });
	}

	try {
		const verified = jwt.verify(token, JWT_SECRET);
		req.user = verified;
		next();
	} catch (err) {
		res.status(401).json({ message: "Invalid token" });
	}
};

export default authenticateToken;
