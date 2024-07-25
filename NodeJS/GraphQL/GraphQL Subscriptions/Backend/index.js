import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import { typeDefs, resolvers } from "./schema.js";

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
	// Start Apollo Server
	await server.start();

	// Apply middleware after server starts
	server.applyMiddleware({ app });

	const httpServer = createServer(app);

	// Start HTTP server
	httpServer.listen({ port: 4000 }, () => {
		console.log(
			`Server is running at http://localhost:4000${server.graphqlPath}`
		);
		console.log(
			`GraphQL Playground is available at http://localhost:4000${server.graphqlPath}`
		);

		// Set up Subscription Server
		SubscriptionServer.create(
			{
				schema: server.schema,
				execute,
				subscribe,
				onConnect: () => {
					console.log("WebSocket connected");
				},
				onDisconnect: () => {
					console.log("WebSocket disconnected");
				},
			},
			{
				server: httpServer,
				path: server.graphqlPath,
			}
		);
	});
}

// Start the server
startServer().catch((error) => {
	console.error("Error starting the server:", error);
});
