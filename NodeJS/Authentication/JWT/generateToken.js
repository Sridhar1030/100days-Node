const jwt = require("jsonwebtoken");

const token = jwt.sign({ _id: "user_id" }, "your_jwt_secret_key", {
	expiresIn: "1h",
});
console.log(token);
