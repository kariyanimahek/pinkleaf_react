const WholesaleRequest = require('../models/WholesaleRequest');

// Get all requests (Admin)
exports.getRequests = async (req, res) => {
    try {
        const requests = await WholesaleRequest.find().sort({ createdAt: -1 });
        res.json(requests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Create request (User)
exports.createRequest = async (req, res) => {
    try {
        const { fullName, company, email, phone, address, city, state, gst } = req.body;

        const request = new WholesaleRequest({
            user: req.user.id,
            fullName,
            company,
            email,
            phone,
            address,
            city,
            state,
            gst
        });

        await request.save();
        res.json(request);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update request status (Admin)
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        let request = await WholesaleRequest.findById(req.params.id);
        if (!request) return res.status(404).json({ msg: 'Request not found' });

        request.status = status;
        await request.save();
        res.json(request);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
