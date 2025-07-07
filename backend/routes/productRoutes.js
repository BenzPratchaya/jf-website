// backend/routes/productRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url'; // สำหรับ __dirname ใน ES Modules
import { dirname } from 'path';      // สำหรับ __dirname ใน ES Modules

import { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct,  
  deleteProduct   
} from '../controllers/productController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// สำหรับ __dirname ใน ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// *** ตั้งค่า Multer สำหรับการอัปโหลดไฟล์ ***
const storage = multer.diskStorage({
  // กำหนด Folder ปลายทางที่จะบันทึกไฟล์
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '..', 'uploads', 'products')); // Path ที่ถูกต้อง: /backend/uploads/products
  },
  // กำหนดชื่อไฟล์
  filename: (req, file, cb) => {
    // ใช้ pdt_id จาก req.body ในการตั้งชื่อไฟล์
    const pdtId = req.body.pdt_id; 
    const fileExtension = path.extname(file.originalname); // นามสกุลไฟล์เดิม (.jpg, .png)
    cb(null, `${pdtId}${fileExtension}`); // ตั้งชื่อไฟล์เป็น pdt_id.นามสกุล
  },
});

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