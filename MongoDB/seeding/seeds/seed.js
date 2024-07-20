import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/users.js";

const seedUsers = [
	{ name: "Alice", email: "alice@example.com", password: "password123" },
	{ name: "Bob", email: "bob@example.com", password: "password456" },
	{ name: "Charlie", email: "charlie@example.com", password: "password789" },

];

const seedDB = async () => {
	await User.deleteMany({});
	await User.insertMany(seedUsers);
	console.log("Database seeded!");
	mongoose.connection.close();
};

connectDB()
	.then(seedDB)
	.catch((err) => {
		console.error("Error seeding database", err);
	});
