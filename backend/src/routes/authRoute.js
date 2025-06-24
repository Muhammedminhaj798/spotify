import express from 'express'
// import tryCatch from './utils/trycatch.js';
// import Register from '../controller/auth/registerController.js';
// import { sendOTP, verifyOTP } from '../controller/auth/loginController.js';
import Register from '../controller/auth/registerController.js';
import { sendOTP, verifyOTP } from '../controller/auth/loginController.js';
import tryCatch from '../utils/trycatch.js';
import { loginWithPass } from '../controller/auth/loginWithPass.js';
import adminLogout from '../controller/auth/logout.js';

const authRouter =express.Router();

authRouter
//emailpassword register
.post('/register',tryCatch(Register))


//googleregister
.post('/sendOTP',tryCatch(sendOTP))
.post('/verifyOTP',tryCatch(verifyOTP))
.post('/loginWithPass',tryCatch(loginWithPass))
.post('/logout', tryCatch(adminLogout))

export default authRouter