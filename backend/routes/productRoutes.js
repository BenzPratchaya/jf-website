// backend/routes/productRoutes.js
import express from 'express';
import multer from 'multer';

import { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct,  
  deleteProduct   
} from '../controllers/productController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// *** แก้ไข: เปลี่ยนไปใช้ memoryStorage แทน diskStorage ***
// Multer จะเก็บไฟล์ใน RAM ชั่วคราว
const storage = multer.memoryStorage(); 

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// สร้าง Multer instance พร้อมการตั้งค่า
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // จำกัดขนาดไฟล์ 5MB
});

// Routes สำหรับ Products
router.route('/')
  .get(getAllProducts) // GET /api/products (ดึงสินค้าทั้งหมด)
  // POST /api/products (สร้างสินค้าใหม่พร้อมอัปโหลดรูปภาพ)
  // 'productImage' คือชื่อ field ใน FormData ที่ Frontend ส่งไฟล์มา
  .post(protect, authorizeRoles('admin', 'superadmin'), upload.single('productImage'), createProduct);

router.route('/:id') // ใช้ :id เป็น parameter (ซึ่งจะรับค่า pdt_id)
  .get(getProductById) // GET /api/products/:id (ดึงสินค้าเดียว)
  // PUT /api/products/:id (อัปเดตสินค้าและรูปภาพ)
  .put(protect, authorizeRoles('admin', 'superadmin'), upload.single('productImage'), updateProduct) 
  .delete(protect, authorizeRoles('admin', 'superadmin'), deleteProduct); // DELETE /api/products/:id (ลบสินค้า)


export default router;