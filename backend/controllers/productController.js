// backend/controllers/productController.js
import asyncHandler from 'express-async-handler'; // ต้องแน่ใจว่าได้ติดตั้งแล้ว
import Product from '../models/Product.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
// เปลี่ยนเป็นใช้ asyncHandler เพื่อจัดการ Error อัตโนมัติ
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
// เปลี่ยนเป็นใช้ asyncHandler เพื่อจัดการ Error อัตโนมัติ
const createProduct = asyncHandler(async (req, res) => {
    try { // ยังคง try-catch ได้ถ้าต้องการจัดการ Error บางประเภทเป็นพิเศษ
        const newProduct = new Product(req.body); 
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        // Error handling ที่ specific กว่าถูกย้ายมาใน try-catch block นี้
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        if (error.code === 11000) { // Duplicate key error
            return res.status(400).json({ message: 'Product with this ID already exists.' });
        }
        // Error อื่นๆ จะถูกส่งต่อไปยัง asyncHandler และ Error Middleware ทั่วไป
        throw error; 
    }
});

// @desc    Get single product by ID (เปลี่ยนไปใช้ pdt_id)
// @route   GET /api/products/:id  <-- ตรงนี้ req.params.id จะเป็น pdt_id
const getProductById = asyncHandler(async (req, res) => {
  // *** เพิ่ม console.log สองบรรทัดนี้ ***
  console.log('Fetching product with pdt_id:', req.params.id); 
  const product = await Product.findOne({ pdt_id: req.params.id }); 
  console.log('Product found:', product); 
  // *** สิ้นสุดการเพิ่ม console.log ***

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Update a product by ID (เปลี่ยนไปใช้ pdt_id)
// @route   PUT /api/products/:id  <-- ตรงนี้ req.params.id จะเป็น pdt_id
const updateProduct = asyncHandler(async (req, res) => {
  // *** แก้ไขบรรทัดนี้: ค้นหาด้วย pdt_id แทน _id ***
  const product = await Product.findOne({ pdt_id: req.params.id }); 

  if (product) {
    product.pdt_id = req.body.pdt_id || product.pdt_id;
    product.pdt_name = req.body.pdt_name || product.pdt_name;
    product.pdt_image = req.body.pdt_image || product.pdt_image;
    product.pdt_description = req.body.pdt_description || product.pdt_description;
    product.pdt_link = req.body.pdt_link || product.pdt_link;
    product.pdt_partnerId = req.body.pdt_partnerId || product.pdt_partnerId;
    product.pdt_categoryId = req.body.pdt_categoryId || product.pdt_categoryId;

    if (req.body.pdt_details) {
      product.pdt_details.pdd_category = req.body.pdt_details.pdd_category || product.pdt_details.pdd_category;
      product.pdt_details.pdd_client = req.body.pdt_details.pdd_client || product.pdt_details.pdd_client;
      product.pdt_details.pdd_projectDate = req.body.pdt_details.pdd_projectDate || product.pdt_details.pdd_projectDate;
      product.pdt_details.pdd_projectUrl = req.body.pdt_details.pdd_projectUrl || product.pdt_details.pdd_projectUrl;
      product.pdt_details.pdd_longDescription = req.body.pdt_details.pdd_longDescription || product.pdt_details.pdd_longDescription;
    }
    
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product by ID (เปลี่ยนไปใช้ pdt_id)
// @route   DELETE /api/products/:id  <-- ตรงนี้ req.params.id จะเป็น pdt_id
const deleteProduct = asyncHandler(async (req, res) => {
  // *** แก้ไขบรรทัดนี้: ค้นหาด้วย pdt_id แทน _id ***
  const product = await Product.findOne({ pdt_id: req.params.id }); 

  if (product) {
    await Product.deleteOne({ _id: product._id }); // ยังคงลบด้วย _id ได้
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new new Error('Product not found');
  }
});

export { 
  getAllProducts,
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
};