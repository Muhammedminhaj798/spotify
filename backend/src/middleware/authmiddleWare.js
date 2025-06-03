import jwt from 'jsonwebtoken';
import CustomError from '../utils/customError';
import User from '../model/userSchema';

const user_auth = async (req, res, next) => {
    try {
        // Token extract cheyyuka from header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

        // Token illenkil error
        if (!token) {
            return next(new CustomError('Access token missing, da! Login cheyyu!', 401));
        }

        // JWT verify cheyyuka
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (!decoded) {
            return next(new CustomError('Invalid token, da! Adipoli alla!', 401));
        }

        // User databaseil ninnu find cheyyuka
        const user = await User.findById(decoded.id);
        if (!user) {
            return next(new CustomError('User not found, da! Register cheyyu!', 404));
        }

        // Check if user blockedanu
        if (user.block) {
            return next(new CustomError('User blocked, da! Access illa!', 403));
        }

        // Check if user verifiedanu
        if (!user.isVerified) {
            return next(new CustomError('Account not verified, da! Verify cheyyu!', 403));
        }

        // User details request-il add cheyyuka
        req.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            isPremium: user.isPremium
        };

        // Adipoli aay next-il pokuka
        next();
    } catch (error) {
        console.error('Adipoli JWT Error:', error);
        if (error.name === 'TokenExpiredError') {
            return next(new CustomError('Token expired, da! Login again cheyyu!', 401));
        }
        return next(new CustomError('Invalid token, da! Adipoli alla!', 401));
    }
};

export default user_auth;