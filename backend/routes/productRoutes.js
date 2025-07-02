// backend/routes/productRoutes.js (เวอร์ชันย้อนกลับ)

import express from 'express'; // ใช้ express สำหรับการสร้าง Router
const router = express.Router();
import * as productController from '../controllers/productController.js'; 

router.get('/', productController.getAllProducts); // GET /api/products
router.get('/:id', productController.getProductById); // GET /api/products/:id

// POST, PUT, DELETE routes
router.post('/', productController.createProduct);  // POST /api/products
router.put('/:id', productController.updateProduct); // PUT /api/products/:id
router.delete('/:id', productController.deleteProduct); // DELETE /api/products/:id

export default router;