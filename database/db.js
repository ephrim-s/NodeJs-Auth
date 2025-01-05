import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectedToDB = async ()=>{
    try {

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected Successfuly"); 

    } catch (error) {

        console.error(error, "Mongodb connection failed");
        process.exit(1);
    }
};
export default connectedToDB;