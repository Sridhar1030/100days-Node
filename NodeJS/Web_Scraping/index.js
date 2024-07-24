import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";

const url = "https://m.imdb.com/chart/top/";
const moviesData = {};

async function getHTML() {
	try {
		const { data } = await axios.get(url, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			},
		});
		return data;
	} catch (error) {
		console.error(`Error fetching the HTML: ${error}`);
		return null;
	}
}

async function scrapeAndSaveData() {
	const html = await getHTML();

	if (!html) {
		console.error("Failed to fetch HTML, scraping aborted.");
		return;
	}

	const $ = cheerio.load(html);

	// console.log($.html());

	$(".ipc-metadata-list-summary-item").each((i, movie) => {
		const title = $(movie)
			.find(".ipc-title .ipc-title-link-wrapper")
			.text()
		const rating = $(movie)
			.find(".ipc-rating-star--rating")
			.text()

		console.log(`Scraped movie: ${title} with rating: ${rating}`); // Debugging statement

		if (title && rating ) {
			moviesData[title] = rating;
		}
	});

	if (Object.keys(moviesData).length === 0) {
		console.error(
			"No movies data was scraped. Please check the selectors and the website structure."
		);
	} else {
		fs.writeFile(
			"moviesData.json",
			JSON.stringify(moviesData, null, 2),
			(err) => {
				if (err) {
					console.error("Error saving the file:", err);
				} else {
					console.log("File saved successfully");
				}
			}
		);
	}
}

scrapeAndSaveData();
