import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
dotenv.config();

//register controller
export const registerUser = async (req, res) => {
    try {
        //extract user information from request.body
        const {username, email, password, role} = req.body;

        //check if user exist in database
        const userExist = await User.findOne({$or :[{username}, {email}]});
        if(userExist){
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }
        //has user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create a new user and save in database
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user',
        });
         await newUser.save();

         if(newUser){
            res.status(201).json({
                success: true,
                message: 'User registered successfuly'
            });
         } else {
            res.status(400).json({
                success: false,
                message: 'Unable to register User'
            });
         }
    } catch (error) {
    console.log(error);
    res.status(500).json({
        success: false,
        message: "Somthing went wrong"
    });
    }
}; 

// login controller
export const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;

        //check if user exists
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Invalid cridentials'
            });
        }
        //if the password is correct or not
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: 'Invalid cridentials'
            });
        }
        //create user token (bearer token)
        const accessToken = jwt.sign({
            userId: user._id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET_KEY, {expiresIn: '15m'});

        res.status(200).json({
            success: true,
            message: 'Login Successful',
            accessToken
        });
    } catch (error) {
    console.log(error);
    res.status(500).json({
        success: false,
        message: "Somthing went wrong"
    });
    }
}; 