import User from "../../model/userSchema.js";
import CustomError from "../../utils/customError.js";
import joiUserSchema from "../../utils/registrationValidation.js";
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 

const Register = async (req, res, next) => {
  try {
    const { value, error } = joiUserSchema.validate(req.body);
    if (error) {
      return next(new CustomError(error.details[0].message, 400));
    }

    const { name, email, password, DOB, gender } = value;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return next(new CustomError("User already exist!", 400));
    }

    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      DOB, 
      gender, 
      isVerified: false 
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, name: newUser.name, email: newUser.email },
      process.env.JWT_TOKEN, 
      { expiresIn: '15m' } 
    );

    res.status(201).json({
      success: true,
      message: 'Success! User registered. Please verify your OTP',
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token
      }
    });
  } catch (error) {
    return next(new CustomError('Registration failed, please try again', 500));
  }
};

export default Register;