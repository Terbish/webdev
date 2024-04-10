import { Router } from "express";
import { addBook, listBooks, getBookByAuthor, getBookByTag, getBookById, updateBook, removeBook } from "../controllers/bookController.js"; 

const router = Router();

router.post('/', addBook);
router.get('/', listBooks);
router.get('/authorName', getBookByAuthor);
router.get('/tags', getBookByTag);
router.get('/id', getBookById);
router.put('/id', updateBook);
router.delete('/id', removeBook);

export default router;