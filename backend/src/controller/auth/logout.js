const adminLogout = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res
      .status(200)
      .json({ message: "Admin logged out successfully", status: "success" });
  } catch (err) {
    next(err);
  }
};
export default adminLogout;