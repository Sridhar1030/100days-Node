import React from "react";
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import Messages from "./Messages";

const httpLink = new HttpLink({
	uri: "http://localhost:4000/graphql",
});

const wsLink = new WebSocketLink({
	uri: `ws://localhost:4000/graphql`,
	options: {
		reconnect: true,
	},
});

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	httpLink
);

const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache(),
});

const App = () => (
	<ApolloProvider client={client}>
		<div>
			<h2>My GraphQL Subscription App 🚀</h2>
			<Messages />
		</div>
	</ApolloProvider>
);

export default App;
