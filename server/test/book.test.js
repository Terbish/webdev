import request from "supertest";
import { expect } from "chai";
import app from "../server.js";

describe("Book Routes", () => {
    let books = [];
    let authors = [];
    const author = {
        fullName: "Charles Dickens",
        bio: "An acclaimed novelist.",
        birthDate: "1812-02-07",
        primaryGenre: "fiction",
        id: 1
    };
    authors.push(author);

    it("should create a new book", async () => {
        const newBook = {
            title: "A Tale of Two Cities",
            subtitle: "A novel",
            publicationDate: "1859-01-01",
            tags: ["historical", "fiction"],
            primaryAuthorId: 1
        };
        const response = await request(app).post("/books").send(newBook).expect(201);
        expect(response.body).to.eql(newBook);
        books.push(newBook);
    });
    it("should list all books", async () => {
        const response = await request(app).get("/books").expect(200);
        expect(response.body).to.eql(books);
    });
    it("should get books by author", async () => {
        const author = authors[0];
        console.log(author.fullName, author.id);
        console.log(books.filter((b) => b.primaryAuthorId === author.id));
        const response = await request(app).get(`/books/author/${author.fullName}`).expect(200);
        const booksByAuthor = books.filter((b) => b.primaryAuthorId === author.id);
        expect(response.body).to.eql(booksByAuthor);
    });
});
