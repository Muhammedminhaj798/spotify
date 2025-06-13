import User from "../../model/userSchema.js";
import CustomError from "../../utils/customError.js";
import asyncHandler from "express-async-handler";

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("name email");

    if (!users) {
      return next(new CustomError("User not found", 404));
    }
    res.status(200).json({
      message: "User details is success",
      status: "success",
      users,
    });
  } catch (error) {
    console.log(error, "this is error");
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

const blockUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    return next(new CustomError("User not found", 404));
  }

  if (user.isAdmin) {
    res.status(400);
    throw new Error("Cannot block admin user");
  }

  user.isBlocked = true;
  await user.save();

  res.status(200).json({
    message: "User blocked successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isBlocked: user.isBlocked,
    },
  });
});

const unblockUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    return next(new CustomError("user not found", 404));
  }

  user.isBlocked = false;
  await user.save();

  res.status(200).json({
    message:"user unblock successfully",
    status:"success",
    user:{
        id:user._id,
        name:user.name,
        email:user.email,
        isBlocked:user.isBlocked
    }
  })
});
export { getAllUsers, getUSerById, blockUser , unblockUser };
