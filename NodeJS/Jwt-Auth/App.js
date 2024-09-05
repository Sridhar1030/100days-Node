const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const { jwtDecrypt, jwtEncrypt, generateKeyPair } = require("jose");

const app = express();
const PORT = 3000;
const SECRET_KEY = "your_secret_key";

// Generate RSA key pair for encryption
const { publicKey, privateKey } = generateKeyPair("RSA-OAEP");

app.use(cors());
app.use(bodyParser.json());

// Middleware to protect routes
const authenticateJWT = async (req, res, next) => {
	const token = req.header("Authorization")?.split(" ")[1];

	if (token) {
		try {
			const decryptedToken = await jwtDecrypt(token, privateKey); // Decrypt token
			const decoded = jwt.verify(decryptedToken.payload, SECRET_KEY);
			req.user = decoded;
			next();
		} catch (err) {
			return res.sendStatus(403); // Invalid token
		}
	} else {
		res.sendStatus(401); // No token provided
	}
};

// Sample users data
const users = [
	{ username: "sridhar", password: "newPassword" },
	{ username: "XYZ", password: "password2" },
	{ username: "ABC", password: "password3" },
	{ username: "DEF", password: "password4" },
];

// Login route
app.post("/login", async (req, res) => {
	const { username, password } = req.body;

	const user = users.find(
		(u) => u.username === username && u.password === password
	);

	if (user) {
		const payload = { username: user.username };
		const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

		// Encrypt the JWT token
		const encryptedToken = await jwtEncrypt(token, publicKey);

		res.json({ accessToken: encryptedToken });
	} else {
		res.sendStatus(401); // Invalid credentials
	}
});

// Protected route
app.get("/protected", authenticateJWT, (req, res) => {
	res.json({ message: "This is a protected route", user: req.user });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
