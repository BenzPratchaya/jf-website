// backend/routes/productRoutes.js (เวอร์ชันย้อนกลับ)

import express from 'express';
const router = express.Router();
import * as productController from '../controllers/productController.js';

// GET all products (Public)
router.get('/', productController.getAllProducts); 
// GET single product by ID (Public)
router.get('/:id', productController.getProductById);

// **KEY CHANGE: POST, PUT, DELETE routes จะไม่มี middleware 'protect' และ 'admin' แล้ว**
router.post('/', productController.createProduct); 
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;