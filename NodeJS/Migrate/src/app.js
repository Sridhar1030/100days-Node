import express from "express";
import bodyParser from "body-parser";
import { login, refreshToken, logout } from "../routes/auth.js";

const app = express();
app.use(bodyParser.json());

app.post("/login", login);
app.post("/token", refreshToken);
app.post("/logout", logout);

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
