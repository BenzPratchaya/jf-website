// backend/routes/productRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url'; // *** เพิ่ม: สำหรับ __dirname ใน ES Modules ***
import { dirname } from 'path';      // *** เพิ่ม: สำหรับ __dirname ใน ES Modules ***
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

// ตั้งค่า Multer สำหรับการอัปโหลดไฟล์
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '..', 'uploads', 'products')); // กำหนด Folder ปลายทางเป็น uploads/products
  },
  filename: (req, file, cb) => {
    // *** แก้ไขบรรทัดนี้: ใช้ req.body.pdt_id ในการตั้งชื่อไฟล์ ***
    const pdtId = req.body.pdt_id; // ดึง pdt_id จาก req.body
    const fileExtension = path.extname(file.originalname); // นามสกุลไฟล์เดิม (.jpg, .png)
    cb(null, `${pdtId}${fileExtension}`); // ตั้งชื่อไฟล์เป็น pdt_id.นามสกุล
  },
});

// ตรวจสอบชนิดไฟล์ (Optional แต่แนะนำเพื่อความปลอดภัย)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) { // อนุญาตเฉพาะไฟล์รูปภาพ
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // จำกัดขนาดไฟล์ 5MB (สามารถปรับเปลี่ยนได้)
});

router.route('/')
  .get(getAllProducts)
  // 'productImage' คือชื่อ field ใน FormData ที่ Frontend ส่งไฟล์มา
  .post(protect, authorizeRoles('admin', 'superadmin'), upload.single('productImage'), createProduct);

router.route('/:id') 
  .get(getProductById) 
  // หากต้องการให้ updateProduct รองรับการเปลี่ยนรูปภาพ
  .put(protect, authorizeRoles('admin', 'superadmin'), upload.single('productImage'), updateProduct) 
  .delete(protect, authorizeRoles('admin', 'superadmin'), deleteProduct); 

export default router;