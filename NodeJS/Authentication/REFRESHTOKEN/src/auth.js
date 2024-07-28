import pkg from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import {
	accessTokenSecret,
	accessTokenLife,
	refreshTokenSecret,
	refreshTokenLife,
} from "./config/config.js";

const { hashSync, compareSync } = bcryptjs;
const { sign, verify } = pkg;
let refreshTokens = [];

const users = [
	{
		username: "testuser",
		password: hashSync("password", 8),
	},
];

const generateAccessToken = (user) => {
	return sign(user, accessTokenSecret, {
		expiresIn: accessTokenLife,
	});
};

const generateRefreshToken = (user) => {
	const refreshToken = sign(user, refreshTokenSecret, {
		expiresIn: refreshTokenLife,
	});
	refreshTokens.push(refreshToken);
	return refreshToken;
};

const login = (req, res) => {
	const { username, password } = req.body;
	const user = users.find((u) => u.username === username);

	if (!user || !compareSync(password, user.password)) {
		return res.sendStatus(403);
	}

	const accessToken = generateAccessToken({ username: user.username });
	const refreshToken = generateRefreshToken({ username: user.username });

	res.json({ accessToken, refreshToken });
};

const refreshToken = (req, res) => {
	const { token } = req.body;

	if (!token) return res.sendStatus(401);
	if (!refreshTokens.includes(token)) return res.sendStatus(403);

	verify(token, refreshTokenSecret, (err, user) => {
		if (err) return res.sendStatus(403);

		const accessToken = generateAccessToken({ username: user.username });
		res.json({ accessToken });
	});
};

const logout = (req, res) => {
	const { token } = req.body;
	refreshTokens = refreshTokens.filter((t) => t !== token);
	res.sendStatus(204);
};

const authController = {
	login,
	refreshToken,
	logout,
};

export default authController;
