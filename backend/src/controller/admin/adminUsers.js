
import User from "../../model/userSchema.js";
import CustomError from "../../utils/customError.js";
import asyncHandler from "express-async-handler";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({isAdmin:false});

    if (!users) {
      return next(new CustomError("User not found", 404));
    }
    res.status(200).json({
      message: "User details is success",
      status: "success",
      users,
    });
  } catch (error) {
    next(error);
  }
};

const getUSerById = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const userId = await User.findById(_id);
    if (!userId) {
      return next(new CustomError("user not found", 404));
    }

    res.status(200).json({
      message: "user get by id successfully",
      status: "success",
      userId,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const toggleBlockUser = asyncHandler(async (req, res, next) => {
  try {
    // Check if req.body exists and has isBlocked
    if (!req.body || req.body.isBlocked === undefined) {
      return next(new Error("Missing isBlocked in request body"));
    }

    const { isBlocked } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked },
      { new: true }
    );

    
    if (!updatedUser) {
      return next(new Error("User not found"));
    }

    res.status(200).json({
      message: "User block status updated successfully",
      status: "success",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error in toggleBlockUser:", error);
    next(error); // Pass the error to the error-handling middleware
  }
});

// const unblockUser = asyncHandler(async (req, res, next) => {
//   const userId = req.params.id;

//   const user = await User.findById(userId);
//   if (!user) {
//     return next(new CustomError("user not found", 404));
//   }

//   user.isBlocked = false;
//   await user.save();

//   res.status(200).json({
//     message:"user unblock successfully",
//     status:"success",
//     user:{
//         id:user._id,
//         name:user.name,
//         email:user.email,
//         isBlocked:user.isBlocked
//     }
//   })
// });

export { getAllUsers, getUSerById, };
