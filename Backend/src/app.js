import express from "express";
import authRoutes from "./routes/auth.routes.js";
import songRoutes from "./routes/song.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app=express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,}));

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/songs',songRoutes,)



export default app;