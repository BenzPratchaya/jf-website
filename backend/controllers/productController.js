// backend/controllers/productController.js

import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import { v2 as cloudinary } from 'cloudinary'; // *** เพิ่ม: Import Cloudinary SDK ***
import fs from 'fs'; // ยังคงใช้ fs สำหรับลบไฟล์ชั่วคราวจาก Disk (ถ้ามี)
import path from 'path'; // ยังคงใช้ path

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// *** กำหนดค่า Cloudinary (สำคัญมาก!) ***
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Helper function to delete image from Cloudinary (ไม่ใช่จาก Local Disk แล้ว)
const deleteImageFromCloudinary = async (imageUrl) => {
    if (imageUrl && imageUrl.startsWith('http')) { // ตรวจสอบว่าเป็น URL ที่ถูกต้อง
        // ดึง public_id จาก URL ของ Cloudinary
        const publicId = imageUrl.split('/').pop()?.split('.')[0]; 
        if (publicId) {
            try {
                const result = await cloudinary.uploader.destroy(`uploads/products/${publicId}`); // ระบุ folder ใน Cloudinary ถ้ามี
                console.log(`Cloudinary image deleted: ${publicId}`, result);
            } catch (error) {
                console.error(`Error deleting Cloudinary image: ${publicId}`, error);
            }
        }
    } else {
        console.log(`No valid Cloudinary URL found to delete: ${imageUrl}`);
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
        const pdt_details = JSON.parse(req.body.pdt_details); 
        let imageUrl = '';

        // *** อัปโหลดไฟล์ไป Cloudinary ***
        if (req.file) {
            const result = await cloudinary.uploader.upload(
                req.file.path || `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`, 
                {
                    folder: 'uploads/products', // Folder ใน Cloudinary
                    public_id: req.body.pdt_id // ตั้งชื่อ public_id ตาม pdt_id
                }
            );
            imageUrl = result.secure_url; // URL ของรูปภาพที่อัปโหลดบน Cloudinary
        }

        const newProduct = new Product({
            pdt_id: req.body.pdt_id,
            pdt_name: req.body.pdt_name,
            pdt_image: imageUrl, // Path จาก Cloudinary
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
        // หากเกิด Error แต่ไฟล์ถูกอัปโหลดไปแล้ว ควรลบไฟล์นั้นทิ้งจาก Cloudinary
        if (req.file && imageUrl) { // ถ้ามี imageUrl แสดงว่าอัปโหลด Cloudinary สำเร็จไปแล้ว
            deleteImageFromCloudinary(imageUrl);
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
    let newImageUrl = product.pdt_image; // เก็บ URL รูปภาพเดิมไว้ก่อน

    // ถ้ามีไฟล์ใหม่ถูกอัปโหลดมา
    if (req.file) {
        // ถ้ามีรูปภาพเก่าอยู่แล้ว ให้ลบรูปภาพเก่าจาก Cloudinary ก่อน
        if (product.pdt_image) {
            await deleteImageFromCloudinary(product.pdt_image); 
        }
        // อัปโหลดรูปภาพใหม่ไป Cloudinary
        const result = await cloudinary.uploader.upload(
            req.file.path || `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
            {
                folder: 'uploads/products',
                public_id: req.body.pdt_id // ตั้งชื่อ public_id ตาม pdt_id (จะทับรูปเก่าถ้าชื่อเดียวกัน)
            }
        );
        newImageUrl = result.secure_url;
    } else if (req.body.pdt_image !== undefined && req.body.pdt_image === '') { 
        // ถ้า Frontend ส่ง pdt_image เป็นค่าว่าง (หมายถึงต้องการลบรูปภาพ)
        if (product.pdt_image) {
            await deleteImageFromCloudinary(product.pdt_image); // ลบรูปภาพเก่าจาก Cloudinary
        }
        newImageUrl = ''; // ตั้งค่าให้เป็นค่าว่างใน DB
    }
    // ถ้า req.file เป็น undefined และ req.body.pdt_image ไม่ใช่ค่าว่างหรือ undefined (คือไม่ได้เปลี่ยนรูป)
    // newImageUrl จะยังคงเป็นค่าเดิมของ product.pdt_image

    product.pdt_id = req.body.pdt_id || product.pdt_id;
    product.pdt_name = req.body.pdt_name || product.pdt_name;
    product.pdt_image = newImageUrl; // อัปเดต Path ของรูปภาพใหม่ (จาก Cloudinary)
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
    // ถ้ามีรูปภาพเก่าอยู่ ให้ลบรูปภาพนั้นทิ้งจาก Cloudinary
    if (product.pdt_image) {
        await deleteImageFromCloudinary(product.pdt_image);
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