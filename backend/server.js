// backend/server.js

import 'dotenv/config'; // โหลด .env variables ด้วย syntax แบบ ESM

import express from 'express'; // Import Express
import cors from 'cors';       // Import CORS
import connectDB from './config/db.js';
// Import Routes (ต้องเพิ่ม .js ท้ายไฟล์)
import productRoutes from './routes/productRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

// เชื่อมต่อฐานข้อมูล
connectDB(); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json());

// API Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Backend API!');
});

app.use('/api/products', productRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/contact', contactRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});