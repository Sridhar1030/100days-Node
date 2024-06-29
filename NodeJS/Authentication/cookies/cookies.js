const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

app.get("/", (req, res) => {
	res.send("Welcome to the homepage");
});

app.get("/set-cookie", (req, res) => {
	// res.setHeader('set-cookie',"foo=bar")
	res.cookie("foo", "bar", {
		// !expiry time

		// maxAge: 5000,
		// expires: new Date('28 June 2024'),
		// httpOnly:true,
		// secure: true,
        // domain: "example.com"
        



	});
	// res.cookie("cookie1","milk")
	res.send("cookies are set");
});

app.get("/get-cookie", (req, res) => {
	console.log(req.cookies);
	res.send(req.cookies);
});

app.get("/del-cookie", (req, res) => {
	res.clearCookie("cookie1");
	res.send("cookie foo deleted");
});

app.listen(3000, () => {
	console.log("Server running on http://localhost:3000");
});


