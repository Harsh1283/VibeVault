import express from "express";
import connectDB from "./src/db/db.coonect.js";
import app from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
