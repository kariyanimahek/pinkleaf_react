const Category = require('../models/Category');

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Add category (Admin only)
exports.addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        let category = await Category.findOne({ name });
        if (category) return res.status(400).json({ msg: 'Category already exists' });

        category = new Category({ name });
        await category.save();
        res.json(category);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update category (Admin only)
exports.updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        let category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ msg: 'Category not found' });

        category.name = name;
        await category.save();
        res.json(category);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete category (Admin only)
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ msg: 'Category not found' });

        await category.remove();
        res.json({ msg: 'Category removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
