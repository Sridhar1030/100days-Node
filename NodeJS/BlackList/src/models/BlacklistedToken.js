import mongoose from "mongoose";

const blacklistedTokenSchema = new mongoose.Schema({
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: "1h" }, // Token expires after 1 hour
});

const BlacklistedToken = mongoose.model(
	"BlacklistedToken",
	blacklistedTokenSchema
);

export default BlacklistedToken;
