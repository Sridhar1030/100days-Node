// src/graphql/resolvers.js
import db from "_db.js";
import DataLoader from "dataloader";

// Batch loading function for games by IDs
const batchGames = async (ids) => {
	return ids.map((id) => db.games.find((game) => game.id === id));
};

// Create a DataLoader instance
const gameLoader = new DataLoader((ids) => batchGames(ids));

export const resolvers = {
	Query: {
		games: () => db.games,
		game: (_, args) => gameLoader.load(args.id),
		reviews: () => db.reviews,
		review: (_, args) => db.reviews.find((review) => review.id === args.id),
		authors: () => db.authors,
		author: (_, args) => db.authors.find((author) => author.id === args.id),
	},
	Game: {
		reviews(parent) {
			return db.reviews.filter((review) => review.game_id === parent.id);
		},
	},
	Author: {
		reviews(parent) {
			return db.reviews.filter(
				(review) => review.author_id === parent.id
			);
		},
	},
	Review: {
		author(parent) {
			return db.authors.find((author) => author.id === parent.author_id);
		},
		game(parent) {
			return gameLoader.load(parent.game_id);
		},
	},
};
