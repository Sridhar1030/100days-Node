import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from '../src/schema.js';
import { resolvers } from '../src/resolvers.js';
import { createTestClient } from 'apollo-server-testing';

// Mock server for testing
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

describe('GraphQL API', () => {
  it('returns Hello World! for hello query', async () => {
    const { query } = createTestClient(server);

    const HELLO_QUERY = `
      query {
        hello
      }
    `;

    const res = await query({ query: HELLO_QUERY });
    expect(res.data.hello).toBe('Hello World!');
  });
});
