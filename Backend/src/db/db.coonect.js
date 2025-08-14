import mongoose from "mongoose";
const connectDB = async () => {
    mongoose.connect('mongodb+srv://harshshrivas233:yMhClkNFdyOGhOKE@cluster0.70oglhn.mongodb.net/')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });
}
export default connectDB;