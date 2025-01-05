import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
dotenv.config();

export const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    // console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    // console.log('Splited token:', token);
    
    if(!token){
        return res.status(404).json({
            sucess: false,
            message: 'Access No Access todken. No token provide. Please log in to continue'
        });
    }
    //decode the token
    try {
        const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(decodedTokenInfo);

        req.userInfo = decodedTokenInfo;
        next();        
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: 'Access denied. No token provide. Please log in to continue'
        });
    }
    
};