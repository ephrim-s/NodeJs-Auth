import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
username : {
    type: String,
    required: true,
    unique : true,
    trim : true
},
email : {
    type: String,
    required: true,
    unique : true,
    trim : true,
    lowercase : true
},
password : {
    type: String,
    required: true
},
role : {
    type: String,
    enum : ['user', 'admin'], // allow only 'user' or 'admin' role
    default : 'user'
}
},{timestamps : true});
export default mongoose.model('User', UserSchema);