import { Router } from "express";
import { addBook, listBooks, getBookByAuthor, getBookByTag, getBookById, updateBook, removeBook } from "../controllers/bookController.js"; 

const router = Router();

router.post('/', addBook);
router.get('/', listBooks);
router.get('/author/:authorId', getBookByAuthor);
router.get('/tags/:tags', getBookByTag);
router.get('/id/:id', getBookById);
router.put('/id/:id', updateBook);
router.delete('/id/:id', removeBook);

export default router;