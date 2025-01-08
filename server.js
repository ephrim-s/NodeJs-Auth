import dotenv from 'dotenv';
import express from 'express';
import connectedToDB from './database/db.js';
import authRoutes from './routes/auth-routes.js';
import homeRoutes from './routes/home-routes.js';
import adminRoutes from './routes/admin-routes.js';
import uploadImageRoutes from './routes/image-routes.js';
dotenv.config();

connectedToDB();
const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes)
app.use('/api/image', uploadImageRoutes);

app.listen(PORT, ()=>{
    console.log(`Server connected Successfully on Port: ${PORT}`);
});