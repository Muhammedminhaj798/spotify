// const tryCatch = (func) => async (req, res, next) => {
//   try {
//     await func(req, res, next);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// }

// export default tryCatch;
const tryCatch = (controllers) => async (req, res, next) => {
  try {
    await controllers(req, res, next);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
export default tryCatch;