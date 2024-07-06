const express = require("express");
const router = express.Router();

// Middleware specific to this router
router.use((req, res, next) => {
	console.log("Time:", Date.now());
	next();
});

// Define the user list route
router.get("/", (req, res) => {
	res.send("User List");
});

// Define the user detail route
router.get("/:userId", (req, res) => {
	res.send(`User details for user with ID: ${req.params.userId}`);
});

// Define a route for adding a user
router.post("/", (req, res) => {
	res.send("Add a new user");
});

module.exports = router;
