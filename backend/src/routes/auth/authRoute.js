import express from 'express'
import tryCatch from '../../utils/trycatch.js';
import Register from '../../controller/auth/registerController.js';

const authRouter =express.Router();

authRouter
.post('/register',tryCatch(Register))

export default authRouter