import { findAuthorByName } from './authorController.js';

let books = [];

export const addBook = (req, res) => {
    const { title, subtitle, publicationDate, tags, primaryAuthorId } = req.body;
    const newBook = { title, subtitle, publicationDate, tags, primaryAuthorId, id: books.length + 1 };
    books.push(newBook);
    res.status(201).json(newBook);
}

export const listBooks = (req, res) => {
    // return the title only for each book
    const titles = books.map((b) => b.title);
    res.json(titles);
}

export const getBookByAuthor = (req, res) => {
    const { authorName } = req.body;
    const name = findAuthorByName(authorName);
    if (!authorName) {
        return res.status(404).json({ error: 'Author not found' });
    }
    try {
        const booksByAuthor = books.filter((b) => b.primaryAuthorId === name.id);
        res.json(booksByAuthor);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching the books' });
    }
}

export const getBookByTag = (req, res) => {
    const {tags} = req.body;
    console.log(tags);
    if (tags.length === 0) {
        return res.status(400).json({ error: 'No tags provided' });
    }
    try {
        const booksByTag = books.filter((b) => b.tags.includes(tags));
        res.json(booksByTag);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching the books' });
    }
}

export const getBookById = (req, res) => {
    const {id} = req.body;
    const book = books.find((b) => b.id === parseInt(id));
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
}

export const updateBook = (req, res) => {
    const { newTitle, newSubtitle, newPublicationDate, newTags, newPrimaryAuthorId, id } = req.body;
    const book = books.find((b) => b.id === parseInt(id));
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    switch (Object.keys(req.body)[0]) {
        case newTitle:
            book.title = newTitle;
            break;
        case newSubtitle:
            book.subtitle = newSubtitle;
            break;
        case newPublicationDate:
            book.publicationDate = newPublicationDate;
            break;
        case newTags:
            book.tags = newTags;
            break;
        case newPrimaryAuthorId:
            book.primaryAuthorId = newPrimaryAuthorId;
            break;
        default:
            return res.status(400).json({ error: 'Invalid field to update' });
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