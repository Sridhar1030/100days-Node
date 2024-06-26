const mongoose = require("mongoose");
mongoose
	.connect("mongodb://localhost:27017/LoginSignUpTutorial")
	.then(() => {
		console.log("Connection Successful");
	})
	.catch((e) => {
		console.log("Failed to Connection");
	});

const LoginSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const collection = new mongoose.model("collection1", LoginSchema);

module.exports = collection;
