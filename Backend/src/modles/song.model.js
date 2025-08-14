import mongoose from "mongoose";
const songSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    artist:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    audio:{
        type:String,
        required:true,
    }

})
let SongModel= mongoose.model("Song",songSchema);
export default SongModel;