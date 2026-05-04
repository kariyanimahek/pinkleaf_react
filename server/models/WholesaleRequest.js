const mongoose = require('mongoose');

const WholesaleRequestSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fullName: { type: String, required: true },
    company: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    gst: { type: String },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WholesaleRequest', WholesaleRequestSchema);
