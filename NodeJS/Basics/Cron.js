const cron = require("node-cron");
const fs = require("fs");

// Schedule a CRON job to run every minute
let task = cron.schedule("* * * * *", () => {
	try {
		const now = new Date();
		fs.appendFileSync("cron-log.txt", `CRON job ran at ${now}\n`);
		console.log(`Logged CRON job run time: ${now}`);
	} catch (error) {
		console.error("Error writing to file", error);
	}
});

console.log("CRON job has been started. Check cron-log.txt for entries.");

// Stop the CRON job after 10 minutes (for demonstration purposes)
setTimeout(() => {
	task.stop();
	console.log("CRON job has been stopped after 10 minutes.");
}, 10 * 60 * 1000); // 10 minutes in milliseconds

// Restart the CRON job after 15 minutes (for demonstration purposes)
setTimeout(() => {
	task.start();
	console.log("CRON job has been restarted after 15 minutes.");
}, 15 * 60 * 1000); // 15 minutes in milliseconds
