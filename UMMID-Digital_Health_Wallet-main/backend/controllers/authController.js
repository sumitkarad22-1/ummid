const User = require('../models/User');
const jwt = require('jsonwebtoken');
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
        const { firstName, lastName, mobile, email, address, zipCode } = req.body;

        if (global.dbConnected === false) {
            const existing = mockUsers.find(u => u.email === email || u.mobile === mobile);
            if (existing) return res.status(400).json({ message: 'User already exists' });

            const newUser = {
                _id: Date.now().toString(),
                firstName, lastName, mobile, email, address, zipCode
            };
            mockUsers.push(newUser);
            return res.status(201).json({ message: 'User registered successfully (Demo Mode)' });
        }

        let user = await User.findOne({ $or: [{ email }, { mobile }] });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new User({ firstName, lastName, mobile, email, address, zipCode });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        let user;
        if (global.dbConnected === false) {
            user = mockUsers.find(u => u.email === email);
        } else {
            user = await User.findOne({ email });
        }

        if (!user) return res.status(404).json({ message: 'User not found' });

        const otp = generateOTP();
        const otpExpires = Date.now() + 10 * 60 * 1000;

        if (global.dbConnected === false) {
            user.otp = otp;
            user.otpExpires = otpExpires;
        } else {
            user.otp = otp;
            user.otpExpires = otpExpires;
            await user.save();
        }

        console.log(`DEMO MODE: OTP for ${email} is ${otp}`);

        try {
            if (process.env.EMAIL_USER !== 'your-email@gmail.com') {
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'Your UMMID Login OTP',
                    text: `Your OTP is ${otp}`
                });
            }
        } catch (emailError) {
            // Ignore email error in demo
        }

        res.json({ message: 'OTP sent successfully (Demo Mode)', otp: otp });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        let user;
        if (global.dbConnected === false) {
            user = mockUsers.find(u => u.email === email);
        } else {
            user = await User.findOne({ email });
        }

        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        if (global.dbConnected === false) {
            user.otp = undefined;
            user.otpExpires = undefined;
        } else {
            user.otp = undefined;
            user.otpExpires = undefined;
            await user.save();
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
