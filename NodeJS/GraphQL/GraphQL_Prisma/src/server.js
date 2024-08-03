// src/server.js
import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
import { join } from "path";
import resolvers from "./resolvers/User.js";

const server = new ApolloServer({
	typeDefs: readFileSync(join(__dirname, "schema.graphql"), "utf8"),
	resolvers,
	context: ({ req }) => ({ prisma }),
});

server.listen().then(({ url }) => {
	console.log(`Server is running on ${url}`);
});
