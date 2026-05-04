const Product = require('../models/Product');
const path = require('path');

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};
        if (category && category !== 'all') {
            query.category = category;
        }
        const products = await Product.find(query).sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Add product (Admin only)
exports.addProduct = async (req, res) => {
    try {
        const { name, price, category, size } = req.body;
        let img = '';
        if (req.file) {
            img = `/uploads/${req.file.filename}`;
        }

        const product = new Product({
            name,
            price: Number(price),
            category,
            size,
            img
        });

        await product.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update product (Admin only)
exports.updateProduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        product.name = name || product.name;
        product.price = price ? Number(price) : product.price;

        await product.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete product (Admin only)
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        await product.remove();
        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
