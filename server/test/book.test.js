import request from "supertest";
import { expect } from "chai";
import app from "../server.js";

describe("Book Routes", () => {
    const newBookData = {
        title: "Sample Book",
        subtitle: "A Sample Subtitle",
        originalPublicationDate: "2022-01-01",
        tags: ["sample", "book"],
        primaryAuthorId: 1
    };
    const newAuthorData = {
        authorName: "Sample Author",
        bio: "A Sample Bio",
        birthDate: "2022-01-01",
        primaryGenre: "Sample Genre",
        authorId: 1
    };
    describe("POST /books", () => {
        it("should add a new book", async () => {
            const response = await request(app)
                .post("/books")
                .send(newBookData);

            expect(response.status).to.equal(201);
            expect(response.body).to.deep.equal({
                title: "Sample Book",
                subtitle: "A Sample Subtitle",
                originalPublicationDate: "2022-01-01",
                tags: ["sample", "book"],
                primaryAuthorId: 1,
                bookId: 1
            });
        });
    });

    describe("GET /books", () => {
        it("should list all books", async () => {
            const response = await request(app).get("/books");

            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal([newBookData.title]);
        });
    });

    describe("GET /books/authorName", () => {
        it("should list all books by a specific author", async () => {
            const response = await request(app).get("/books/authorName");

            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal([newBookData.primaryAuthorId]);
        });
    });
});
