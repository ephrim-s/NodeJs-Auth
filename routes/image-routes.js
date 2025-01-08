import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware.js';
import { isAdminUser } from '../middleware/admin-middleware.js';
import uploadMiddleware from '../middleware/upload-middleware.js';
import { updloadImageController } from '../controllers/image-controller.js';
const router = express.Router();

//upload the image
router.post('/upload', authMiddleware, isAdminUser, uploadMiddleware.single('image'), updloadImageController)



export default router;