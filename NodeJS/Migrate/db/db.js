import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const dbName = "yourdatabase";
let client;

export const connect = async () => {
	client = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	await client.connect();
	return client.db(dbName);
};

export const close = async () => {
	await client.close();
};
