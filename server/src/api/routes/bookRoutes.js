import { Router } from "express";
import { addBook, listBooks, getBookByAuthor, getBookByTag, getBookById, updateBook, removeBook } from "../controllers/bookController.js"; 

const router = Router();

/*
Add a book 
List all books
List all books that match a given list of tags
List all books by a specific author
Get the details of a specific book
Update any of the attributes of a specific book
*/

router.post('/', addBook);
router.get('/', listBooks);
router.get('/authorName', getBookByAuthor);
router.get('/tags', getBookByTag);
router.get('/id', getBookById);
router.put('/id', updateBook);
router.delete('/id', removeBook);

export default router;