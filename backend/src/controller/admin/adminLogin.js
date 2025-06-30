import bcrypt from "bcrypt"; // Missing import
import jwt from "jsonwebtoken"; // Missing import
import User from "../../model/userSchema.js";

const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is an admin
    if (!user.isAdmin) {
      // Assuming you have an isAdmin field in your userSchema
      return res.status(403).json({ message: "Access denied: Not an admin" });
    }F

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_TOKEN,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("isAdmin", token, {
      httpOnly: false, // if you want to access in frontend
      secure: true, // REQUIRED with sameSite: "none"
      sameSite: "none", // allows cross-site cookies
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({
      message: "Admin logged in successfully",
      status: "success",
      admin: { username: user.name, email: user.name },
    });
  } catch (err) {
    next(err); // Consider logging the error for debugging
  }
};

export { adminLogin }; // Add export
