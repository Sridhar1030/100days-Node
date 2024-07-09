import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

//db
import db from "./_db.js";

//!types
import { typeDefs } from "./schema.js";

// !resolvers
const resolvers = {
	Query: {
		games: () => db.games,
		reviews: () => db.reviews,
		authors: () => db.authors,
	},
};

//*server setup
const server = new ApolloServer({
	// typeDefs -- definations of different types of Data
	typeDefs,

	// resolvers, --used to handle queries based on the schema and type
	resolvers,
});

const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
});

console.log("server ready at port ", 4000);
