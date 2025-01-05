import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware.js';
const router = express.Router();

router.get('/welcome', authMiddleware, (req, res)=>{
    const {username, userId, role} = req.userInfo;
    res.json({
        message: 'welecome to the HOme page',
        user: {
            _id: userId,
            username,
            role
        }
    })
});

export default router;