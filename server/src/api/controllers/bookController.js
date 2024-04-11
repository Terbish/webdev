import { removeEditionByBookId } from './editionController.js';

let books = [];

export const addBook = (req, res) => {
    const { title, subtitle, originalPublicationDate, tags, primaryAuthorId } = req.body;
    const newBook = { title, subtitle: subtitle || '', originalPublicationDate, tags, primaryAuthorId, bookId: books.length + 1 };
    books.push(newBook);
    res.status(201).json(newBook);
}

export const listBooks = (req, res) => {
    // return the title only for each book
    const titles = books.map((b) => b.title);
    res.json(titles);
}

export const getBookByAuthor = (req, res) => {
    const authorId = parseInt(req.params.authorId);
    if (!req.params.authorId) {
        return res.status(404).json({ error: 'Author not found' });
    }
    try {
        const booksByAuthor = books.filter((b) => b.primaryAuthorId === authorId);
        res.json(booksByAuthor);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the books' });
    }
}

export const getBookByTag = (req, res) => {
    const { tags } = req.params;
    const tagArray = tags.split(' ');
    if (tagArray.length === 0) {
        return res.status(400).json({ error: 'No tags provided' });
    }
    try {
        const booksByTag = books.filter((b) => tagArray.every((tag) => b.tags.includes(tag)));
        res.json(booksByTag);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the books' });
    }
}

export const getBookById = (req, res) => {
    const { id } = req.params;
    const book = findBookById(id);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
}

export const updateBook = (req, res) => {
    const { id } = req.params;
    const { newTitle, newSubtitle, neworiginalPublicationDate, newTags, newPrimaryAuthorId } = req.body;
    const book = findBookById(id);

    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    const updatedBook = updateBookProperties(book, {
        newTitle,
        newSubtitle,
        neworiginalPublicationDate,
        newTags,
        newPrimaryAuthorId,
    });
    res.json(updatedBook);
}

export const removeBook = (req, res) => {
    const { id } = req.body;
    const book = findBookById(id);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    const removedBook = books.splice(books.indexOf(book), 1);
    removeEditionByBookId(id);
    res.json(removedBook);
}

export function findBookById(id) {
    return books.find((b) => b.bookId === parseInt(id));
}

function updateBookProperties(book, updates) {
    const { newTitle, newSubtitle, neworiginalPublicationDate, newTags, newPrimaryAuthorId } = updates;

    if (newTitle !== undefined) {
        book.title = newTitle;
    }
    if (newSubtitle !== undefined) {
        book.subtitle = newSubtitle;
    }
    if (neworiginalPublicationDate !== undefined) {
        book.originalPublicationDate = neworiginalPublicationDate;
    }
    if (newTags !== undefined) {
        book.tags = newTags;
    }
    if (newPrimaryAuthorId !== undefined) {
        book.primaryAuthorId = newPrimaryAuthorId;
    }

    return book;
}

export default {
    addBook,
    listBooks,
    getBookByAuthor,
    getBookByTag,
    getBookById,
}