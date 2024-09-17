import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server running at http://localhost:4000/graphql');
  });
});
