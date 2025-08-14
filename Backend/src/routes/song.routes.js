import express from "express";
import { uploadSong,getSongs,songSearch,getSongById}  from "../controller/SongController.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage();
const uploadMiddleware=multer({storage:storage})

// router.use(verifyToken); // Apply authentication middleware to all routes in this file



router.post('/upload',uploadMiddleware.single("audio"), uploadSong);
router.get('/get', getSongs);
router.get('/search', songSearch);
router.get('/get-songs/:mama', getSongById);


export default router;