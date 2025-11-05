import express from "express";
import authRoutes from "./routes/auth.routes.js";
import songRoutes from "./routes/song.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app=express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://vibevault.vercel.app",
  "https://vibe-vault-topaz.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/songs',songRoutes,)



export default app;