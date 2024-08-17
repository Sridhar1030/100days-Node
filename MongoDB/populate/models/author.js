const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
	name: String,
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
