import jwt from "jsonwebtoken";
// import CustomError from '../routes/utils/customError.js';
// import User from '../model/userSchema.js';
import CustomError from "../utils/customError.js";
import User from "../model/userSchema.js";

const user_auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if (err) {
          throw new CustomError("Token is not valid", 401);
        }
        req.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          isPremium: user.isPremium,
        };
        next();
      });
    } else {
      next(new CustomError("You are not authenticated", 401));
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(
        new CustomError("Token expired, please login try again", 401)
      );
    }
    return next(new CustomError("Invalid token, please try again", 401));
  }
};

export default user_auth;
