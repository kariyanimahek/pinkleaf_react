const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');

// User routes
router.post('/', auth, orderController.createOrder);
router.get('/myorders', auth, orderController.getUserOrders);
router.get('/:id', auth, orderController.getOrderById);

// Admin routes
router.get('/', auth, orderController.getAllOrders);
router.put('/:id/status', auth, orderController.updateOrderStatus);

module.exports = router;
