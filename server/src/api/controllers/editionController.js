import { findBookById } from './bookController.js';

const editions = [];

export const addEdition = (req, res) => {
    const { bookId, editionNumber, publicationDate} = req.body;
    console.log(req.body);
    const book = findBookById(bookId);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    const newEdition = { book, editionNumber, publicationDate, editionId: editions.length + 1};
    editions.push(newEdition);
    res.status(201).json(newEdition);
}

export default{
    addEdition,
}