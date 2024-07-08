// index.js
const { ApolloServer, gql } = require("apollo-server");

// Sample data
const books = [
	{
		title: "The Awakening",
		author: "Kate Chopin",
	},
	{
		title: "City of Glass",
		author: "Paul Auster",
	},
];

// Type definitions (schema)
const typeDefs = gql`
	type Book {
		title: String
		author: String
	}

	type Query {
		books: [Book]
	}
`;

// Resolvers
const resolvers = {
	Query: {
		books: () => books,
	},
};

// Creating an Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Starting the server
server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
