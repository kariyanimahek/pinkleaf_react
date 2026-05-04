const express = require('express');
const router = express.Router();
const wholesaleController = require('../controllers/wholesaleController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, wholesaleController.getRequests);
router.post('/', auth, wholesaleController.createRequest);
router.put('/:id', auth, wholesaleController.updateStatus);

module.exports = router;
