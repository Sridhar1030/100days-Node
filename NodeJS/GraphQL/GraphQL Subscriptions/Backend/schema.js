import { gql } from "apollo-server-express";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();
const MESSAGE_SENT = "MESSAGE_SENT";

const messages = [];

const typeDefs = gql`
	type Message {
		id: ID!
		content: String!
	}

	type Query {
		messages: [Message!]
	}

	type Mutation {
		sendMessage(content: String!): Message
	}

	type Subscription {
		messageSent: Message
	}
`;

const resolvers = {
	Query: {
		messages: () => messages,
	},
	Mutation: {
		sendMessage: (_, { content }) => {
			const message = { id: String(messages.length + 1), content };
			messages.push(message);
			pubsub.publish(MESSAGE_SENT, { messageSent: message });
			return message;
		},
	},
	Subscription: {
		messageSent: {
			subscribe: () => pubsub.asyncIterator([MESSAGE_SENT]),
		},
	},
};

export { typeDefs, resolvers };
