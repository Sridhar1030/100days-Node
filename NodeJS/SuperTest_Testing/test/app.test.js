// test/app.test.js
import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js";

describe("GET /hello", () => {
	it("should return Hello, world!", async () => {
		const res = await request(app).get("/hello");
		expect(res.status).to.equal(200);
		expect(res.text).to.equal("Hello, world!");
	});
});

describe("POST /data", () => {
	it("should return the posted data", async () => {
		const data = { name: "John Doe" };
		const res = await request(app).post("/data").send(data);
		expect(res.status).to.equal(201);
		expect(res.body).to.deep.equal(data);
	});
});
