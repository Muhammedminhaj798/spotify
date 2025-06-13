import nodemailer from "nodemailer";
// import User from "../../../model/userSchema.js";
// import CustomError from "../../../routes/utils/customError.js";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken"; // Ensure jwt is imported
import User from "../../model/userSchema.js";
import CustomError from "../../utils/customError.js";

configDotenv();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
};

const sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(
        new CustomError(
          "Email is required. Please enter your email address",
          400
        )
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(
        new CustomError("User not found. Please register to continue", 404)
      );
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for verification is ready",
      text: `OTP: ${otp}. Valid for 10 minutes only. Kindly complete verification`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message:
        "The OTP has been successfully sent to your email. Please check your inbox",
    });
  } catch (error) {
    return next(new CustomError("Failed to send OTP. Please try again", 500));
  }
};

const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return next(
        new CustomError("Email and OTP are required. Please enter both", 400)
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(
        new CustomError("User not found. Please register to continue", 404)
      );
    }

    if (user.otp !== otp) {
      return next(
        new CustomError("Invalid OTP. Please enter the correct code", 400)
      );
    }

    if (user.otpExpiry < Date.now()) {
      return next(
        new CustomError("OTP expired. Please request a new one", 400)
      );
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_TOKEN,
      { expiresIn: "15m" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login successfully",
      token,
    });
  } catch (error) {
    return next(
      new CustomError("OTP verification failed. Please try again", 500)
    );
  }
};

export { sendOTP, verifyOTP };
