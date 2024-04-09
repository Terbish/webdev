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
    const { tags } = req.body;
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
    const { id } = req.body;
    const book = findBookById(id);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
}

export const updateBook = (req, res) => {
    const { id, newTitle, newSubtitle, newPublicationDate, newTags, newPrimaryAuthorId } = req.body;
    const book = findBookById(id);
  
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
  
    const updatedBook = updateBookProperties(book, {
      newTitle,
      newSubtitle,
      newPublicationDate,
      newTags,
      newPrimaryAuthorId,
    });
    res.json(updatedBook);
  };

function findBookById(id) {
    return books.find((b) => b.id === parseInt(id));
}

function updateBookProperties(book, updates) {
    const { newTitle, newSubtitle, newPublicationDate, newTags, newPrimaryAuthorId } = updates;

    if (newTitle !== undefined) {
        book.title = newTitle;
    }
    if (newSubtitle !== undefined) {
        book.subtitle = newSubtitle;
    }
    if (newPublicationDate !== undefined) {
        book.publicationDate = newPublicationDate;
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