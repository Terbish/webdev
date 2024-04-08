import { findAuthorByName } from './authorController.js';

let books = [];

export const addBook = (req, res) => {
    const { title, subtitle, publicationDate, tags, primaryAuthorId } = req.body;
    const newBook = { title, subtitle, publicationDate, tags, primaryAuthorId };
    books.push(newBook);
    res.status(201).json(newBook);
}

export const listBooks = (req, res) => {
    res.json(books);
}

export const getBookByAuthor = (req, res) => {
    const name = req.params.authorName;
    const author = findAuthorByName(name);
    console.log(author);
    if (!author) {
        return res.status(404).json({ error: 'Author not found' });
    }
    try {
        const booksByAuthor = books.filter((b) => b.primaryAuthorId === author.id);
        res.json(booksByAuthor);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching the books' });
    }
}

export default {
    addBook,
    listBooks,
    getBookByAuthor,
}