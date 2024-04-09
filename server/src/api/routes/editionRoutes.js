import { Router } from "express";
const router = Router();
import { addEdition } from "../controllers/editionController.js";

router.post('/', addEdition);
// router.get('/books/edition/', listEditions);
// router.delete('/books/edition/', removeEdition);

export default router;