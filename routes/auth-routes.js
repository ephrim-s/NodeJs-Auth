import express from 'express';
import { registerUser, loginUser, changePassword } from '../controllers/auth-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const router = express.Router();

const {} = 
//all routes related to authentication
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/changepassword', authMiddleware, changePassword);


export default router;