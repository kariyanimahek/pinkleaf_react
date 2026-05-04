const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    size: { type: String, default: 'M' },
    img: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema);
