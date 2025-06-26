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
  tls: {
    rejectUnauthorized: false, // 🚨 Accept self-signed certificates (for dev only)
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
    
    // Verify environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email credentials are missing in environment variables");
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return next(
        new CustomError("User not found. Please register to continue", 404)
      );
    }
    if(user.isAdmin){
      return next(new CustomError("Admin cannot login", 403))
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    console.log("Saving OTP to user:", { otp, otpExpiry });
    await user.save();
    console.log("User saved successfully");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for verification is ready",
      text: `OTP: ${otp}. Valid for 10 minutes only. Kindly complete verification`,
    };

    console.log("Sending email to:", email);
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    res.status(200).json({
      success: true,
      message:
        "The OTP has been successfully sent to your email. Please check your inbox",
    });
  } catch (error) {
    console.error("Error in sendOTP:", error);
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

    const user = await User.findOne({ email  });
    if (!user) {
      return next(
        new CustomError("User not found. Please register to continue", 404)
      );
    }
    console.log("otp", otp);
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
      { expiresIn: "7d" }
    );

    res.cookie("jwt", token, {
      httpOnly: false, // if you want to access in frontend
      secure: true, // REQUIRED with sameSite: "none"
      sameSite: "none", // allows cross-site cookies
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login successfully",
      user: { username: user.name, email: user.email },
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    return next(
      new CustomError("OTP verification failed. Please try again", 500)
    );
  }
};

export { sendOTP, verifyOTP };
