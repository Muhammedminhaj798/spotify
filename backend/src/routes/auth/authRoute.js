import express from 'express'
import tryCatch from '../../utils/trycatch.js';
import Register from '../../controller/auth/registerController.js';
import { sendOTP, verifyOTP } from '../../controller/auth/loginController.js';

const authRouter =express.Router();

authRouter
//emailpassword register
.post('/register',tryCatch(Register))


//googleregister
.post('/sendOTP',tryCatch(sendOTP))
.post('/verifyOTP',tryCatch(verifyOTP))

export default authRouter