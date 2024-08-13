import nock from "nock";
import { fetchUserData } from "../src/api/userApi";

describe("fetchUserData", () => {
	it("should return user data when API call is successful", async () => {
		// Mock the API response
		nock("https://api.example.com")
			.get("/users/123")
			.reply(200, { id: 123, name: "John Doe" });

		const data = await fetchUserData(123);
		expect(data).toEqual({ id: 123, name: "John Doe" });
	});

	it("should handle errors when the API call fails", async () => {
		// Mock an error response
		nock("https://api.example.com")
			.get("/users/123")
			.reply(404, { message: "User not found" });

		try {
			await fetchUserData(123);
		} catch (error) {
			expect(error.response.status).toBe(404);
			expect(error.response.data).toEqual({ message: "User not found" });
		}
	});
});
