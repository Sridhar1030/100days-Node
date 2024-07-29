import path from "path";
import { fileURLToPath } from "url";
import { load } from "migrate";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("file name is ",__filename)
const migrationsPath = path.join(__dirname, "migrations");
const storePath = path.join(__dirname, "migrations-store.json");
console.log("store path is" , storePath)
// Ensure the store file exists
if (!fs.existsSync(storePath)) {
	fs.writeFileSync(storePath, JSON.stringify({}));
}

const store = {
	get: (key, callback) => {
		fs.readFile(storePath, "utf8", (err, data) => {
			if (err) return callback(err);
			const state = JSON.parse(data || "{}");
			callback(null, state[key]);
		});
	},
	set: (key, value, callback) => {
		fs.readFile(storePath, "utf8", (err, data) => {
			if (err) return callback(err);
			const state = JSON.parse(data || "{}");
			state[key] = value;
			fs.writeFile(storePath, JSON.stringify(state), callback);
		});
	},
};

load(migrationsPath, store, (err, migrations) => {
	if (err) {
		console.error("Error loading migrations:", err);
		process.exit(1);
	}

	migrations
		.run()
		.then(() => console.log("Migrations ran successfully"))
		.catch((err) => {
			console.error("Error running migrations:", err);
			process.exit(1);
		});
});
