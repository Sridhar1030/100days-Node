//write a code for errorhandling in express using  MIddleware
// 1. Create a new express application

// 2. Create a new middleware function called errorHandlingMiddleware that takes three arguments: error, req, and res
// 3. In the errorHandlingMiddleware function, log the error to the console using console.error
// 4. In the errorHandlingMiddleware function, send a 500 status code and a message to the client using res.status and res.send

// 5. Add the errorHandlingMiddleware function to the express application using app.use
// 6. Create a new route that throws an error using throw new Error('Something went wrong')
// 7. Start the express application on port 3000
const express = require("express");
const app = express();
const port = 3000;

// Middleware function to handle errors
const errorHandlingMiddleware = (error, req, res, next) => {
	console.error(error); // Log the error to the console

	res.status(500).send("Error with code 500"); // Send a 500 status code and a message to the client
};

// Add error handling middleware to the Express app
app.use(errorHandlingMiddleware);

// Route that throws an error
app.get("/", (req, res, next) => {
	try {
		throw new Error("Something went wrong");
	} catch (error) {
		next(error); // Pass the error to the error handling middleware
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Express server is running on http://localhost:${port}`);
});
