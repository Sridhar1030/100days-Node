const express = require("express");
const app = express();
const port = 3000;

// Middleware function to handle errors
const errorHandlingMiddleware = (error, req, res, next) => {
    console.error(error); // Log the error to the console

    res.status(400).json({
        success: false,
        message: "Invalid input. Please provide integer values only."
    });
};

// Add error handling middleware to the Express app
app.use(errorHandlingMiddleware);

// Route handler for POST request expecting integer values
app.post("/", express.json(), (req, res, next) => {
    const { value1, value2 } = req.body;

    // Check if values are integers
    if (!Number.isInteger(Number(value1)) || !Number.isInteger(Number(value2))) {
        const error = new Error("Invalid input. Please provide integer values only.");
        error.status = 400; // Set custom error status
        return next(error); // Pass the error to the error handling middleware
    }

    // Process the integer values
    const result = Number(value1) + Number(value2);
    res.json({
        success: true,
        result: result
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Express server is running on http://localhost:${port}`);
});
