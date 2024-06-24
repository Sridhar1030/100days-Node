const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3000;
const SECRET_KEY = "your_secret_key";





app.use(cors());
app.use(bodyParser.json());

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
	const token = req.header("Authorization")?.split(" ")[1];

	if (token) {
		jwt.verify(token, SECRET_KEY, (err, user) => {   
			if (err) {
				return res.sendStatus(403);
			}
			req.user = user;
			next();
		});
	} else {
		res.sendStatus(401);
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
app.post("/login", (req, res) => {
	const { username, password } = req.body;

	const user = users.find(
		(u) => u.username === username && u.password === password
	);

	if (user) {
		const accessToken = jwt.sign({ username: user.username }, SECRET_KEY, { //JWT sign makes the payload in jwt string payload
			expiresIn: "1h",
		});
		res.json({ accessToken });
	} else {
		res.sendStatus(401);
	}
});

// Protected route
app.get("/protected", authenticateJWT, (req, res) => {
	res.json({ message: "This is a protected route", user: req.user });
	res.json({ message: "hello" });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
