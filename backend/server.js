// backend/server.js

import 'dotenv/config'; 
import express from 'express'; 
import cors from 'cors';       
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser'; // Import cookie-parser
// Import Routes
import productRoutes from './routes/productRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; // Import Admin Routes

// เชื่อมต่อฐานข้อมูล
connectDB(); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // หรือ URL ของ Frontend ของคุณ
    credentials: true, // อนุญาตให้ส่ง cookies ระหว่าง origin ที่ต่างกัน
})); 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // สำหรับ parse URL-encoded data
app.use(cookieParser()); // ใช้ cookie-parser middleware

// API Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Backend API!');
});

app.use('/api/products', productRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes); // ใช้ Admin Routes

// Error handling middleware (ควรเพิ่มเพื่อจัดการ errors ที่เกิดขึ้น)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});