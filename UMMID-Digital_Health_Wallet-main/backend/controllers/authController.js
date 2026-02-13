const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// In-memory store for demo mode
let mockUsers = [];

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, mobile, email, address, zipCode, password } = req.body;

        if (global.dbConnected === false) {
            const existing = mockUsers.find(u => u.email === email || u.mobile === mobile);
            if (existing) return res.status(400).json({ message: 'User already exists' });

            const newUser = {
                _id: Date.now().toString(),
                firstName, lastName, mobile, email, address, zipCode, password
            };
            mockUsers.push(newUser);
            return res.status(201).json({ message: 'User registered successfully (Demo Mode)' });
        }

        let user = await User.findOne({ $or: [{ email }, { mobile }] });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            firstName,
            lastName,
            mobile,
            email,
            address,
            zipCode,
            password: hashedPassword
        });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user;
        if (global.dbConnected === false) {
            user = mockUsers.find(u => u.email === email);
            if (!user || user.password !== password) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
        } else {
            user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: 'Invalid credentials' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
