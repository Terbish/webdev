import { Router } from 'express';
const router = Router();
import { addAuthor, listAuthors, updateAuthorBio, getAuthorByName } from '../controllers/authorController.js';

router.post('/', addAuthor);
router.get('/', listAuthors);
router.put('/bio', updateAuthorBio);
router.get('/name', getAuthorByName);

export default router;