// backend/controllers/productController.js

import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import fs from 'fs';   // *** เพิ่ม: Import fs module สำหรับจัดการไฟล์ ***
import path from 'path'; // *** เพิ่ม: Import path module สำหรับจัดการ Path ***
import { fileURLToPath } from 'url'; // *** เพิ่ม: สำหรับ __dirname ใน ES Modules ***
import { dirname } from 'path';      // *** เพิ่ม: สำหรับ __dirname ใน ES Modules ***

// สำหรับ __dirname ใน ES Modules (ถ้า backend ใช้ "type": "module" ใน package.json)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper function to delete image file from server
const deleteImageFile = (filePath) => {
    if (filePath) {
        // Path รูปภาพที่บันทึกใน DB คือ /uploads/products/filename.ext
        // เราต้องแปลงให้เป็น Path ที่ถูกต้องบน Server
        const fullPath = path.join(__dirname, '..', '..', filePath); 

        fs.unlink(fullPath, (err) => {
            if (err) {
                // ถ้าไฟล์ไม่มีอยู่แล้ว (เช่น ถูกลบไปก่อน) ก็ไม่เป็นไร
                if (err.code === 'ENOENT') {
                    console.log(`Old image file not found: ${fullPath}`);
                } else {
                    console.error(`Error deleting old image file: ${fullPath}`, err);
                }
            } else {
                console.log(`Old image file deleted successfully: ${fullPath}`);
            }
        });
    }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    try {
        // ข้อมูล Text Fields จาก FormData จะอยู่ใน req.body
        // ข้อมูลไฟล์ที่อัปโหลดจะอยู่ใน req.file
        
        // pdt_details จะถูกส่งมาเป็น JSON String จาก Frontend (ต้อง Parse)
        const pdt_details = JSON.parse(req.body.pdt_details); 

        // Path ของรูปภาพที่อัปโหลด (ถ้ามี)
        const imageUrl = req.file ? `/uploads/products/${req.file.filename}` : ''; 

        const newProduct = new Product({
            pdt_id: req.body.pdt_id,
            pdt_name: req.body.pdt_name,
            pdt_image: imageUrl, // ใช้ Path รูปภาพที่ได้จากการอัปโหลด
            pdt_description: req.body.pdt_description,
            pdt_link: req.body.pdt_link,
            pdt_partnerId: req.body.pdt_partnerId,
            pdt_categoryId: req.body.pdt_categoryId,
            pdt_details: pdt_details,
        }); 
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error in createProduct:', error);
        // หากเกิด Error ระหว่างการบันทึกข้อมูลลง DB แต่ไฟล์ถูกอัปโหลดไปแล้ว ควรลบไฟล์นั้นทิ้ง
        if (req.file) {
            deleteImageFile(`/uploads/products/${req.file.filename}`);
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Product with this ID already exists.' });
        }
        throw error; 
    }
});

// @desc    Get single product by ID (pdt_id)
// @route   GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ pdt_id: req.params.id }); 

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Update a product by ID (pdt_id)
// @route   PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ pdt_id: req.params.id }); 

  if (product) {
    // ถ้ามีไฟล์ใหม่ถูกอัปโหลดมา และมีรูปภาพเก่าอยู่
    if (req.file && product.pdt_image) {
        deleteImageFile(product.pdt_image); // ลบรูปภาพเก่าทิ้ง
    }

    product.pdt_id = req.body.pdt_id || product.pdt_id;
    product.pdt_name = req.body.pdt_name || product.pdt_name;
    // อัปเดต pdt_image ด้วย Path ของไฟล์ใหม่ หรือถ้า frontend ส่งค่าว่างมา (ต้องการลบรูป)
    if (req.file) { // ถ้ามีไฟล์ใหม่
        product.pdt_image = `/uploads/products/${req.file.filename}`;
    } else if (req.body.pdt_image !== undefined) { // ถ้า Frontend ส่ง pdt_image (ซึ่งอาจเป็นค่าว่าง) มา
        product.pdt_image = req.body.pdt_image;
    }
    // หาก req.file ไม่มี และ req.body.pdt_image ก็ไม่มีการส่งมา (คือไม่ได้เปลี่ยนรูปหรือลบรูป)
    // pdt_image ใน DB ก็จะยังคงเป็นค่าเดิมของ product.pdt_image

    product.pdt_description = req.body.pdt_description || product.pdt_description;
    product.pdt_link = req.body.pdt_link || product.pdt_link;
    product.pdt_partnerId = req.body.pdt_partnerId || product.pdt_partnerId;
    product.pdt_categoryId = req.body.pdt_categoryId || product.pdt_categoryId;

    if (req.body.pdt_details) {
        const pdt_details_parsed = typeof req.body.pdt_details === 'string' ? JSON.parse(req.body.pdt_details) : req.body.pdt_details;
        product.pdt_details.pdd_category = pdt_details_parsed.pdd_category || product.pdt_details.pdd_category;
        product.pdt_details.pdd_client = pdt_details_parsed.pdd_client || product.pdt_details.pdd_client;
        product.pdt_details.pdd_projectDate = pdt_details_parsed.pdd_projectDate || product.pdt_details.pdd_projectDate;
        product.pdt_details.pdd_projectUrl = pdt_details_parsed.pdd_projectUrl || product.pdt_details.pdd_projectUrl;
        product.pdt_details.pdd_longDescription = pdt_details_parsed.pdd_longDescription || product.pdt_details.pdd_longDescription;
    }
    
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product by ID (pdt_id)
// @route   DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ pdt_id: req.params.id }); 

  if (product) {
    // ถ้ามีรูปภาพเก่าอยู่ ให้ลบรูปภาพนั้นทิ้ง
    if (product.pdt_image) {
        deleteImageFile(product.pdt_image);
    } else {
        console.log(`DEBUG: No image path found in DB for product: ${product.pdt_id}, skipping file deletion.`);
    }
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { 
  getAllProducts,
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
};