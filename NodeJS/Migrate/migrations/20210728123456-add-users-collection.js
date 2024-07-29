import { connect, close } from "../db/db.js";

export const up = async (next) => {
	const db = await connect();
	await db.createCollection("users");
	await close();
	next();
};

export const down = async (next) => {
	const db = await connect();
	await db.collection("users").drop();
	await close();
	next();
};
