import nodemailer from 'nodemailer';
import CustomError from '../utils/CustomError.js';
import User from '../../model/userSchema.js';

// Nodemailer setup for OTP email
const transporter = nodemailer.createTransport({
    service: 'gmail', // Or ninte email service (Gmail, Outlook, etc.)
    auth: {
        user: process.env.EMAIL_USER, // Ninte email ID, .env-il store cheyyu
        pass: process.env.EMAIL_PASS  // Ninte email password or app-specific password
    }
});

// Generate OTP function
const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    return otp;
};

// Send OTP Controller
const sendOTP = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return next(new CustomError('Email venam, da! Enter cheyyu!', 400));
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return next(new CustomError('User not found, da! Register cheyyu!', 404));
        }

        // Generate OTP and expiry (10 minutes)
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        // Update user with OTP and expiry
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        // Send OTP via email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Adipoli OTP for Verification',
            text: `Ninte OTP aanu: ${otp}. 10 minutes-il expire aakum, da! Fast aay verify cheyyu!`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'OTP ninte email-il adipoli aay send cheythu, da! Check cheyyu!'
        });
    } catch (error) {
        console.error('Adipoli OTP Send Error:', error);
        return next(new CustomError('OTP send cheyyan pattiyilla, da! Try again!', 500));
    }
};

// Verify OTP Controller
const verifyOTP = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return next(new CustomError('Email and OTP venam, da! Enter cheyyu!', 400));
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return next(new CustomError('User not found, da! Register cheyyu!', 404));
        }

        // Check if OTP matches and not expired
        if (user.otp !== otp) {
            return next(new CustomError('Invalid OTP, da! Correct aay enter cheyyu!', 400));
        }

        if (user.otpExpiry < Date.now()) {
            return next(new CustomError('OTP expired, da! New OTP request cheyyu!', 400));
        }

        // OTP correct, mark user as verified
        user.isVerified = true;
        user.otp = null; // Clear OTP
        user.otpExpiry = null; // Clear expiry
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Adipoli! OTP verified, ninte account ready aanu, da!'
        });
    } catch (error) {
        console.error('Adipoli OTP Verify Error:', error);
        return next(new CustomError('OTP verify cheyyan pattiyilla, da! Try again!', 500));
    }
};

export { sendOTP, verifyOTP };