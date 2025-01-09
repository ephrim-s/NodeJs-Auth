import Image from '../models/image.js';
import { uploadToCloudinary } from '../helpers/cloudinaryHelper.js';
import fs from 'fs';
import cloudinary from '../config/cloudinary.js';

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

export const deleteImageController = async (req, res) => {
    try {
         const getCurrentImageId = req.params.id;
         const userId = req.userInfo.userId;

         const image = await Image.findById(getCurrentImageId);
         if(!image){
            return res.status(404).json({
                success: false,
                message : "Image not found"
            });
         }

         //check if this image is uploated by the current user trying to delete the image
         if(image.uploadedBy.toString() !== userId){
            return res.status(403).json({
                success: false,
                message : "You are not authorized to delete ths image"
            });
         }

         //delete this image first from your cloudinary storage
         await cloudinary.uploader.destroy(image.publicId);

         //delete this image from mongo database
         await image.findByIdAndDelete(getCurrentImageId);

         res.status(200).json({
            success: true,
            message: 'Image deleted successfully'
         });
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: "Something went wrong! Please try again"
        });
    }
}