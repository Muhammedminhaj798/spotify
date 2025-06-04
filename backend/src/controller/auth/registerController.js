import User from "../../model/userSchema.js";
import CustomError from "../../utils/customError.js";
import joiUserSchema from "../../utils/registrationValidation.js";
import bcrypt from 'bcrypt'; // For password hashing
import jwt from 'jsonwebtoken'; // For token generation

const Register = async (req, res, next) => {
  try {
    // Validate request body with Joi schema
    const { value, error } = joiUserSchema.validate(req.body);
    if (error) {
      return next(new CustomError(error.details[0].message, 400));
    }

    // Destructure validated values
    const { name, email, password, DOB, gender } = value;

    // Check if user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return next(new CustomError("User already exist!", 400));
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10); // 10 rounds for salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      DOB, // Date of Birth from request
      gender, // Gender from request
      isVerified: false // Default, to be verified via OTP
    });

    // Save user to database
    await newUser.save();

    // Generate JWT token for authentication
    const token = jwt.sign(
      { id: newUser._id, name: newUser.name, email: newUser.email },
      process.env.JWT_TOKEN, // Secret key from .env
      { expiresIn: '15m' } // Token expires in 15 minutes
    );

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Adipoli! User registered, da! OTP verify cheyyu!',
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token
      }
    });
  } catch (error) {
    console.error('Adipoli Register Error:', error);
    return next(new CustomError('Registration failed, da! Try again!', 500));
  }
};

export default Register;