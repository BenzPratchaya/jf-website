// backend/routes/productRoutes.js
import express from 'express';
import { 
  getAllProducts, // ใช้ชื่อนี้ตามที่ให้มาล่าสุด
  getProductById, 
  createProduct, 
  updateProduct,  
  deleteProduct   
} from '../controllers/productController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAllProducts) // GET all products
  .post(protect, authorizeRoles('admin', 'superadmin'), createProduct); // POST new product

// ใช้ route ที่ใช้ _id (:id) สำหรับ GET, PUT, DELETE
router.route('/:id') 
  .get(getProductById) 
  .put(protect, authorizeRoles('admin', 'superadmin'), updateProduct) 
  .delete(protect, authorizeRoles('admin', 'superadmin'), deleteProduct); 

export default router;