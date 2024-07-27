// src/app.js
import express, { json } from "express";

const app = express();
app.use(json());

app.get("/hello", (req, res) => {
	res.status(200).send("Hello, world!");
});

app.post("/data", (req, res) => {
	res.status(201).send(req.body);
});

export default app;
