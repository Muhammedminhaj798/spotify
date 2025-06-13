import jwt from 'jsonwebtoken';
import CustomError from '../routes/utils/customError';
import User from '../model/userSchema';

const user_auth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

        if (!token) {
            return next(new CustomError('Access token missing, da! Login cheyyu!', 401));
        }

        // JWT verify cheyyuka
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if (!decoded) {
            return next(new CustomError('Invalid token, please try again', 401));
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return next(new CustomError('User not found. Please register to continue', 404));
        }

        if (user.block) {
            return next(new CustomError('User is blocked. Access is denied.', 403));
        }

        if (!user.isVerified) {
            return next(new CustomError('Account not verified. Please complete the verification process.', 403));
        }

        req.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            isPremium: user.isPremium
        };

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(new CustomError('Token expired, please login try again', 401));
        }
        return next(new CustomError('Invalid token, please try again', 401));
    }
};

export default user_auth;