import { Router } from 'express';
const router = Router();
import { addAuthor, listAuthors, updateAuthorBio } from '../controllers/authorController.js';

router.post('/', addAuthor);
router.get('/', listAuthors);
router.put('/bio', updateAuthorBio);

export default router;