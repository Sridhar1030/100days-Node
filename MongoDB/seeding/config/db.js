import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect("mongodb://localhost:27017/yourDatabaseName", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connected to MongoDB");
	} catch (err) {
		console.error("Error connecting to MongoDB", err);
		process.exit(1);
	}
};

export default connectDB;
