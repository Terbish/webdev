import { findBookById } from './bookController.js';

let editions = [];

export const addEdition = (req, res) => {
    const { bookId, editionNumber, publicationDate } = req.body;
    const book = findBookById(bookId);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    const newEdition = {
        book,
        editionNumber,
        publicationDate
    };
    editions.push(newEdition);
    res.json(newEdition);
}

export const listEditions = (req, res) => {
    const { bookId } = req.body;
    const bookEditions = editions.filter((e) => e.book.bookId === bookId);
    res.json(bookEditions);
}

export const removeEdition = (req, res) => {
    const { bookId } = req.body;
    const bookEditions = editions.filter((e) => e.book.bookId === bookId);
    if (!bookEditions) {
        return res.status(404).json({ error: 'Edition not found' });
    }
    const removedEdition = editions.splice(editions.indexOf(bookEditions), 1);
    res.json(removedEdition);
}

export function removeEditionByBookId(bookId) {
    const bookEditions = editions.filter((e) => e.book.bookId === bookId);
    if (!bookEditions) {
        return null;
    }
    const removedEdition = editions.splice(editions.indexOf(bookEditions), 1);
    return removedEdition;
}

export default{
    addEdition,
    listEditions,
}