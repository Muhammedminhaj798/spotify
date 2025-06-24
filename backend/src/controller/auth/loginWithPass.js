import User from "../../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginWithPass = async (req, res, next) => {
    try {
      console.log("Request body in controller:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    if (!user.isAdmin) {
      const error = new Error("Access denied: Not an admin");
      error.statusCode = 403;
      throw error;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_TOKEN,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("user", token, {
      httpOnly: false, // if you want to access in frontend
      secure: true, // REQUIRED with sameSite: "none"
      sameSite: "none", // allows cross-site cookies
      maxAge: 15 * 60 * 1000,
    });
    res.json({ user:{username:user.name,email:user.email}, message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    next(err);
  }
};
