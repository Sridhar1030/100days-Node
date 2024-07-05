// Debugger.js

const express = require("express");
const app = express();
const port = 3000;

// A simple function to add two numbers
function add(a, b) {
	return a + b;
}

// A route to demonstrate the use of debugger
app.get("/compute", (req, res) => {
	const num1 = parseInt(req.query.num1);
	const num2 = parseInt(req.query.num2);

	// Use debugger statement to pause execution here
	debugger;

	const result = add(num1, num2);
	console.log(`The result is: ${result}`);

	// Another debugger statement
	debugger;

	res.send(`The result is: ${result}`);
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});
