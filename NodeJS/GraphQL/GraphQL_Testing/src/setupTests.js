import { server } from "./mocks/server"; // Import the mock server

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that are declared in a test.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
