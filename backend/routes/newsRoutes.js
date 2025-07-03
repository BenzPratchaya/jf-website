// backend/routes/newsRoutes.js
import express from 'express';
import { 
  getNews, 
  getNewsById, 
  createNews, 
  updateNews,  
  deleteNews   
} from '../controllers/newsController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getNews) // GET all news
  .post(protect, authorizeRoles('admin', 'superadmin'), createNews); // POST new news item

// ใช้ route ที่ใช้ nit_id (:id) สำหรับ GET, PUT, DELETE
router.route('/:id') // ใช้ :id เป็น parameter (ซึ่งจะรับค่า nit_id)
  .get(getNewsById) 
  .put(protect, authorizeRoles('admin', 'superadmin'), updateNews) 
  .delete(protect, authorizeRoles('admin', 'superadmin'), deleteNews); 

export default router;