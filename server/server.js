const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));
app.use(express.json());

// Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// Routes
// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/wholesale', require('./routes/wholesale'));
app.use('/api/orders', require('./routes/orders'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
