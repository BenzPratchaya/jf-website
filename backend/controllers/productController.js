// backend/controllers/productController.js

import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
// import fs from 'fs';   // *** เพิ่ม: Import fs module สำหรับจัดการไฟล์ ***
// import path from 'path'; // *** เพิ่ม: Import path module สำหรับจัดการ Path ***
// import { fileURLToPath } from 'url'; // *** เพิ่ม: สำหรับ __dirname ใน ES Modules ***
// import { dirname } from 'path';      // *** เพิ่ม: สำหรับ __dirname ใน ES Modules ***

// *** เพิ่ม: Import Cloudinary SDK ***
import { v2 as cloudinary } from 'cloudinary'; 

// *** กำหนดค่า Cloudinary (สำคัญมาก!) ***
// ค่าเหล่านี้จะถูกดึงมาจาก Environment Variables ใน Production (Render)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to delete image from Cloudinary (เหมือนเดิม)
const deleteImageFromCloudinary = async (imageUrl) => {
    if (imageUrl && imageUrl.startsWith('http') && imageUrl.includes('res.cloudinary.com')) { 
        const publicIdWithFolder = imageUrl.split('/').slice(-2).join('/').split('.')[0]; 
        
        try {
            const result = await cloudinary.uploader.destroy(`uploads/products/${publicIdWithFolder}`); 
            console.log(`Cloudinary image deleted: ${publicIdWithFolder}`, result);
        } catch (error) {
            console.error(`Error deleting Cloudinary image: ${publicIdWithFolder}`, error);
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

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    try {
        const pdt_details = JSON.parse(req.body.pdt_details); 
        let imageUrl = ''; 

        if (req.file) { 
            // *** แก้ไข: ใช้ req.file.buffer โดยตรง ***
            const result = await cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`, 
                {
                    folder: 'uploads/products', 
                    public_id: req.body.pdt_id, 
                    overwrite: true 
                }
            );
            imageUrl = result.secure_url; 
        }

        const newProduct = new Product({
            pdt_id: req.body.pdt_id,
            pdt_name: req.body.pdt_name,
            pdt_image: imageUrl, 
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
        if (req.file && imageUrl) { 
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

// @desc    Update a product by ID (pdt_id)
// @route   PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ pdt_id: req.params.id }); 

  if (product) {
    let newImageUrl = product.pdt_image; 

    if (req.file) {
        if (product.pdt_image) {
            await deleteImageFromCloudinary(product.pdt_image); 
        }
        // *** แก้ไข: ใช้ req.file.buffer โดยตรง ***
        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
            {
                folder: 'uploads/products',
                public_id: req.body.pdt_id,
                overwrite: true
            }
        );
        newImageUrl = result.secure_url;
    } else if (req.body.pdt_image !== undefined && req.body.pdt_image === '') { 
        if (product.pdt_image) {
            await deleteImageFromCloudinary(product.pdt_image); 
        }
        newImageUrl = ''; 
    }
    // ... (ส่วนที่เหลือของโค้ด updateProduct เหมือนเดิม) ...
    
    product.pdt_id = req.body.pdt_id || product.pdt_id;
    product.pdt_name = req.body.pdt_name || product.pdt_name;
    product.pdt_image = newImageUrl; 
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