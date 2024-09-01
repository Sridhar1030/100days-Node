// dataloader.js
import DataLoader from "dataloader";
import db from "./_db.js";

const reviewLoader = new DataLoader(async (gameIds) => {
	const reviews = db.reviews.filter((review) =>
		gameIds.includes(review.game_id)
	);
	return gameIds.map((id) =>
		reviews.filter((review) => review.game_id === id)
	);
});

const authorLoader = new DataLoader(async (authorIds) => {
	const authors = db.authors.filter((author) =>
		authorIds.includes(author.id)
	);
	return authorIds.map((id) => authors.find((author) => author.id === id));
});

export { reviewLoader, authorLoader };
