// backend/controllers/productController.js

import Product from '../models/Product.js'; // Import Product Model

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
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
        const product = await Product.findOne({ id: req.params.id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
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
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error in createProduct:', error);
        // Mongoose validation errors can be accessed via error.errors
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
        const updatedProduct = await Product.findOneAndUpdate(
            { id: req.params.id }, // Find by our custom 'id' slug
            req.body,
            { new: true, runValidators: true } // Return the updated document, run schema validators
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
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
        const deletedProduct = await Product.findOneAndDelete({ id: req.params.id }); // Find and delete by custom 'id' slug

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product removed' });
    } catch (error) {
        console.error('Error in deleteProduct:', error);
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};