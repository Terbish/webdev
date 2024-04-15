import request from "supertest";
import { expect } from "chai";
import app from "../server.js";
import { getBookByAuthor } from "../src/api/controllers/bookController.js";

describe("Book Routes", () => {
    // ...existing test cases...

    describe("GET /books/authorName", () => {
        it("should list all books by a specific author", async () => {
            const response = await request(app).get("/books/authorName");

            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal([newBookData.primaryAuthorId]);
        });
    });

    describe("GET /books/:authorId", () => {
        it("should return books by a specific author", async () => {
            const authorId = 1;
            const req = { params: { authorId } };
            const res = {
                status: (statusCode) => {
                    expect(statusCode).to.equal(200);
                    return res;
                },
                json: (data) => {
                    expect(data).to.deep.equal([newBookData]);
                }
            };

            await getBookByAuthor(req, res);
        });

        it("should return 404 if authorId is not provided", async () => {
            const req = { params: {} };
            const res = {
                status: (statusCode) => {
                    expect(statusCode).to.equal(404);
                    return res;
                },
                json: (data) => {
                    expect(data).to.deep.equal({ error: 'Author not found' });
                }
            };

            await getBookByAuthor(req, res);
        });

        it("should return 500 if an error occurs", async () => {
            const authorId = 1;
            const req = { params: { authorId } };
            const res = {
                status: (statusCode) => {
                    expect(statusCode).to.equal(500);
                    return res;
                },
                json: (data) => {
                    expect(data).to.deep.equal({ error: 'An error occurred while fetching the books' });
                }
            };

            // Mocking the books.filter function to throw an error
            const originalFilter = Array.prototype.filter;
            Array.prototype.filter = function () {
                throw new Error("Mocked error");
            };

            await getBookByAuthor(req, res);

            // Restoring the original books.filter function
            Array.prototype.filter = originalFilter;
        });
    });
});