// backend/routes/newsRoutes.js

import express from 'express';
const router = express.Router();
import * as newsController from '../controllers/newsController.js';

router.get('/', newsController.getAllNews); // GET /api/news
router.get('/:id', newsController.getNewsById); // GET /api/news/:id

export default router;