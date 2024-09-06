import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { applyMiddleware } from "graphql-middleware";
import rateLimit from "express-rate-limit";
import { gql } from "graphql-tag";
import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";
import db from "./_db.js";
import { loggingMiddleware } from "./middleware.js";

// RedisPubSub setup
const pubSub = new RedisPubSub({
	publisher: new Redis(),
	subscriber: new Redis(),
});

//! Type Definitions with Federation support
const typeDefs = gql`
	type Query {
		games: [Game]
		game(id: ID!): Game
		reviews: [Review]
		review(id: ID!): Review
		authors: [Author]
		author(id: ID!): Author
	}

	type Game @key(fields: "id") {
		id: ID!
		title: String!
		platform: String!
		reviews: [Review]
	}

	type Author @key(fields: "id") {
		id: ID!
		name: String!
		reviews: [Review]
	}

	type Review @key(fields: "id") {
		id: ID!
		content: String!
		author: Author
		game: Game
	}
`;

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
};

// Create the executable schema with federation support
const schema = buildSubgraphSchema([{ typeDefs, resolvers }]);

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
