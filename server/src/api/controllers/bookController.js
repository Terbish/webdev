import { findAuthorByName } from './authorController.js';

let books = [];

export const addBook = (req, res) => {
    const { title, subtitle, publicationDate, tags, primaryAuthorId } = req.body;
    const newBook = { title, subtitle, publicationDate, tags, primaryAuthorId, id: books.length + 1};
    books.push(newBook);
    res.status(201).json(newBook);
}

export const listBooks = (req, res) => {
    // return the title only for each book
    const titles = books.map((b) => b.title);
    res.json(titles);
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

export const getBookByTag = (req, res) => {
    const tag = req.params.tag.split('%20');
    if(!tag) {
        return res.status(400).json({ error: 'Please provide a tag' });
    }
    const booksByTag = books.filter((b) => tag.every((t) => b.tags.includes(t)));
    res.json(booksByTag);
}

export const getBookById = (req, res) => {
    const id = req.params.id;
    const book = books.find((b) => b.id === parseInt(id));
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
}

export default {
    addBook,
    listBooks,
    getBookByAuthor,
    getBookByTag, 
    getBookById,
}