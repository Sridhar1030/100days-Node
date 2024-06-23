const express = require("express");
const app = express();
const port = 4000;

// Route that handles query parameters
app.get("/search", (req, res) => {
	const query = req.query;
	res.send(`Query parameters received: ${JSON.stringify(query)}`);
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
