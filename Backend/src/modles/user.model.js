import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    UserName:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true,
    }
})
let UserModel= mongoose.model("User",userSchema);
export default UserModel;