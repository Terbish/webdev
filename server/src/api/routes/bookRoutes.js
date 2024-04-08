import { Router } from "express";
import { addBook, listBooks, getBookByAuthor, getBookByTag, getBookById} from "../controllers/bookController.js"; 

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
router.get('/author/:authorName', getBookByAuthor);
router.get('/tags/:tag', getBookByTag);
router.get('/id/:id', getBookById);
// router.put('/:id', updateBook);
// router.delete('/:id', removeBook);

export default router;