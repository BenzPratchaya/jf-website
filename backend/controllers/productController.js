// backend/controllers/productController.js

import Product from '../models/Product.js'; // Import Product Model

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // ดึงข้อมูลทั้งหมด
        res.json(products); // จะ return Field ชื่อใหม่แล้ว
    } catch (error) {
        console.error('Error in getAllProducts:', error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// @desc    Get single product by ID (slug)
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        // **KEY FIX: เปลี่ยนจาก { id: req.params.id } เป็น { pdt_id: req.params.id }**
        const product = await Product.findOne({ pdt_id: req.params.id }); 
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product); // จะ return Field ชื่อใหม่แล้ว
    } catch (error) {
        console.error('Error in getProductById:', error);
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
    try {
        // req.body ควรมีข้อมูล Field ชื่อใหม่มาจาก Frontend แล้ว
        const newProduct = new Product(req.body); 
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct); // ส่งข้อมูล Field ชื่อใหม่กลับไป
    } catch (error) {
        console.error('Error in createProduct:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        if (error.code === 11000) { // Duplicate key error
            return res.status(400).json({ message: 'Product with this ID already exists.' });
        }
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
    try {
        // **KEY FIX: ค้นหาด้วย pdt_id และอัปเดต Field ชื่อใหม่**
        const updatedProduct = await Product.findOneAndUpdate(
            { pdt_id: req.params.id }, // Find by our custom 'pdt_id' slug
            req.body, // req.body ควรมีข้อมูล Field ชื่อใหม่มาจาก Frontend แล้ว
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct); // ส่งข้อมูล Field ชื่อใหม่กลับไป
    } catch (error) {
        console.error('Error in updateProduct:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
    try {
        // **KEY FIX: ค้นหาด้วย pdt_id**
        const deletedProduct = await Product.findOneAndDelete({ pdt_id: req.params.id }); 

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product removed' });
    } catch (error) {
        console.error('Error in deleteProduct:', error);
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};