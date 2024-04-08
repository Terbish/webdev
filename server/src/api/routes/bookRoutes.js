import { Router } from "express";
import { addBook, listBooks, getBookByAuthor } from "../controllers/bookController.js"; 

const router = Router();

router.post('/', addBook);
router.get('/', listBooks);
router.get('/author/:name', getBookByAuthor);
// router.put('/:id', updateBook);
// router.delete('/:id', removeBook);

export default router;