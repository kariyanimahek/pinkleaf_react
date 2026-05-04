const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Multer Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Get products (Public)
router.get('/', productController.getProducts);

// Manage products (Admin)
router.post('/', auth, upload.single('img'), productController.addProduct);
router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;
