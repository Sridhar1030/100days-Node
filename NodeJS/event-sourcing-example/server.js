// server.js
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { storeEvent, getEvents } = require("./eventStore");
const { handleEvent, getAccountState } = require("./handlers");

const app = express();
app.use(express.json());

app.post("/create-account", (req, res) => {
	const accountId = uuidv4();
	const event = {
		type: "AccountCreated",
		data: { accountId, ...req.body },
	};

	storeEvent(event);
	handleEvent(event);

	res.status(201).send({ accountId });
});

app.post("/deposit", (req, res) => {
	const event = {
		type: "MoneyDeposited",
		data: req.body,
	};

	storeEvent(event);
	handleEvent(event);

	res.status(200).send({
		balance: getAccountState(req.body.accountId).balance,
	});
});

app.post("/withdraw", (req, res) => {
	const event = {
		type: "MoneyWithdrawn",
		data: req.body,
	};

	storeEvent(event);
	handleEvent(event);

	res.status(200).send({
		balance: getAccountState(req.body.accountId).balance,
	});
});

app.get("/events", (req, res) => {
	res.status(200).send(getEvents());
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
