import express from "express";
import connectDB from "./src/db/db.coonect.js";
import app from "./src/app.js";

connectDB();
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
