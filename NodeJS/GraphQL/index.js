import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { applyMiddleware } from "graphql-middleware";
import { makeExecutableSchema } from "@graphql-tools/schema";
import rateLimit from "express-rate-limit";

// Database and Middleware
import db from "./_db.js";

//! Type Definitions
import { typeDefs } from "./schema.js";

//! Resolvers
const resolvers = {
	Query: {
		games: () => db.games,
		game: (_, args) => {
			const game = db.games.find((game) => game.id === args.id);
			if (!game) {
				throw new Error("Game not found.");
			}
			return game;
		},
		reviews: () => db.reviews,
		review: (_, args) => {
			const review = db.reviews.find((review) => review.id === args.id);
			if (!review) {
				throw new Error("Review not found.");
			}
			return review;
		},
		authors: () => db.authors,
		author: (_, args) => {
			const author = db.authors.find((author) => author.id === args.id);
			if (!author) {
				throw new Error("Author not found.");
			}
			return author;
		},
	},
	Game: {
		reviews(parent) {
			return db.reviews.filter((r) => r.game_id === parent.id);
		},
	},
	Author: {
		reviews(parent) {
			return db.reviews.filter((r) => r.author_id === parent.id);
		},
	},
	Review: {
		author(parent) {
			const author = db.authors.find((a) => a.id === parent.author_id);
			if (!author) {
				throw new Error("Author not found for this review.");
			}
			return author;
		},
		game(parent) {
			const game = db.games.find((g) => g.id === parent.game_id);
			if (!game) {
				throw new Error("Game not found for this review.");
			}
			return game;
		},
	},
	Mutation: {
		deleteGame(_, args) {
			const gameIndex = db.games.findIndex((g) => g.id === args.id);
			if (gameIndex === -1) {
				throw new Error("Game not found.");
			}
			db.games.splice(gameIndex, 1);
			return db.games;
		},
		addGame(_, args) {
			if (!args.game.title || !args.game.platform) {
				throw new Error("Game title and platform are required.");
			}
			let game = {
				...args.game,
				id: Math.floor(Math.random() * 10000).toString(),
			};
			db.games.push(game);
			return game;
		},
		updateGame(_, args) {
			let game = db.games.find((g) => g.id === args.id);
			if (!game) {
				throw new Error("Game not found.");
			}
			game = { ...game, ...args.edits };
			db.games = db.games.map((g) => (g.id === args.id ? game : g));
			return game;
		},
	},
};

//! Import Middleware
import { loggingMiddleware } from "./middleware.js";

// Create the executable schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Apply middleware to the schema
const schemaWithMiddleware = applyMiddleware(schema, loggingMiddleware);

// Create Express App
const app = express();

// Apply Rate Limiting Middleware
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
	message: "Too many requests, please try again later.",
});

app.use(limiter);

// Create Apollo Server
const server = new ApolloServer({
	schema: schemaWithMiddleware,
});

// Apply Apollo Server middleware to Express
await server.start();
app.use("/graphql", expressMiddleware(server));

// Start the Express Server
app.listen(4000, () => {
	console.log("Server ready at http://localhost:4000/graphql");
});
