import BlacklistedToken from "../models/BlacklistedToken.js";

export const blacklistToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const blacklistedToken = new BlacklistedToken({ token });
		await blacklistedToken.save();
		res.status(200).json({ message: "Token blacklisted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
