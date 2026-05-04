const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/authMiddleware');

// Get categories (Public)
router.get('/', categoryController.getCategories);

// Manage categories (Admin - logic for role should be added in middleware or controller)
router.post('/', auth, categoryController.addCategory);
router.put('/:id', auth, categoryController.updateCategory);
router.delete('/:id', auth, categoryController.deleteCategory);

module.exports = router;
