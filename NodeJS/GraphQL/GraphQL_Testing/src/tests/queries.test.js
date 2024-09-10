import { render, screen } from "@testing-library/react";
import { ApolloProvider } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { GET_BOOKS } from "../queries";
import client from "../apolloClient";

// Mocked responses
const mocks = [
	{
		request: {
			query: GET_BOOKS,
		},
		result: {
			data: {
				books: [
					{
						title: "The Great Gatsby",
						author: "F. Scott Fitzgerald",
					},
					{ title: "1984", author: "George Orwell" },
				],
			},
		},
	},
];

test("renders books from GraphQL query", async () => {
	// Component that uses the query
	const TestComponent = () => {
		const { loading, error, data } = useQuery(GET_BOOKS);

		if (loading) return <p>Loading...</p>;
		if (error) return <p>Error :(</p>;

		return (
			<ul>
				{data.books.map((book) => (
					<li key={book.title}>
						{book.title} by {book.author}
					</li>
				))}
			</ul>
		);
	};

	render(
		<MockedProvider mocks={mocks} addTypename={false}>
			<TestComponent />
		</MockedProvider>
	);

	// Check if the mocked data is rendered
	expect(await screen.findByText("The Great Gatsby")).toBeInTheDocument();
	expect(screen.getByText("1984")).toBeInTheDocument();
});
