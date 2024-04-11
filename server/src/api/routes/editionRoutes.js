import { Router } from "express";
const router = Router();
import { addEdition, listEditions, removeEdition } from "../controllers/editionController.js";

router.post('/:bookId', addEdition);
router.get('/:bookId', listEditions);
router.delete('/:bookId', removeEdition);

export default router;