import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const connectioninstance =await mongoose.connect(`${process.env.MONGODB_URI}/test`)
        console.log(`/n MONOGODB connected !! DB HOST :${connectioninstance.connection.host}`);
    } 
    catch(error){
        console.log("MonogDB connection error",error);
            process.exit(1)
    }
}
export default connectDB;