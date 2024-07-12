import express from "express";
import { body, validationResult } from "express-validator";

const app = express();
app.use(express.json());

// Define validation rules
const userValidationRules = () => [
	body("username")
		.isString()
		.isLength({ min: 3 })
		.withMessage("Username must be at least 3 characters long"),
	body("email").isEmail()
        .withMessage("Email must be valid"),
	body("password")
		.isLength({ min: 5 })
		.withMessage("Password must be at least 5 characters long"),
];

// Define validation middleware
const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

// Apply validation middleware to a route
app.post("/register", userValidationRules(), validate, (req, res) => {
	// If validation passes, proceed with route logic
	res.send("User registered successfully");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});



//  !Sample post request 
//  curl -X POST http://localhost:3000/register \
//      -H "Content-Type: application/json" \
//      -d '{"username": "ab", "email": "invalid-email", "password": "123"}'
