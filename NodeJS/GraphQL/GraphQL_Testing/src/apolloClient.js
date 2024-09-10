import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: "https://your-graphql-endpoint/graphql",
	cache: new InMemoryCache(),
});

export default client;
