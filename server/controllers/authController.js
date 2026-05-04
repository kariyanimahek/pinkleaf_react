const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
    try {
        const { fullName, email, password, address, phone } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ fullName, email, password, address, phone });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, fullName: user.fullName, role: user.role } });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, fullName: user.fullName, role: user.role } });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get User Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const { fullName, address, phone, profilePic } = req.body;
        let user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.fullName = fullName || user.fullName;
        user.address = address || user.address;
        user.phone = phone || user.phone;
        user.profilePic = profilePic || user.profilePic;

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
