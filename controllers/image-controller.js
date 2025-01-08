import Image from '../models/image.js';
import { uploadToCloudinary } from '../helpers/cloudinaryHelper.js';
import fs from 'fs';

export const updloadImageController = async(req, res) => {
    try {
        //check if file is missing in reques object 
        if(!req.file){
            return res.status(400).json({
                success: false, 
                message: 'File is required! Please upload an image'
            });
        }
        //upload to cloudinary
        const {url, publicId} = await uploadToCloudinary(req.file.path);

        //store the image url and publicId along with user id in you database
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        });

        await newlyUploadedImage.save();

        //delete the image from local storage
        fs.unlinkSync(req.file.path);
        
        res.status(201).json({
            success: true, 
            messege: 'Image uploaded successfuly',
            image: newlyUploadedImage
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false, 
            message: "Something went wrong! Please try again"
        });
    }
};

export const fetctImageController = async(req, res)=>{
    try {
        const images = await Image.find({});

        if(images){
            res. status(200).json({
                success: true, 
                data: images
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false, 
            message: "Something went wrong! Please try again"
        });
    }
}