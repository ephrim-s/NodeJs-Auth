import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware.js';
import { isAdminUser } from '../middleware/admin-middleware.js';
const router = express.Router();

router.get('/welcome', authMiddleware, isAdminUser, (req, res)=>{
    res.status(200).json({message: 'welecome to the Admin page'})
});

export default router;