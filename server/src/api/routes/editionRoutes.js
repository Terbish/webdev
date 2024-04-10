import { Router } from "express";
const router = Router();
import { addEdition, listEditions, removeEdition } from "../controllers/editionController.js";

router.post('/', addEdition);
router.get('/', listEditions);
router.delete('/', removeEdition);

export default router;