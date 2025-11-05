import express from "express";
// import { uploadSong,getSongs,songSearch,getSongById,mood}  from "../controller/SongController.js";
import{uploadSong,getAllSongs,searchSongs,getSongById,getSongsByMoodFromText} from "../controller/SongControllers.js"
// import { verifyToken } from "../middleware/auth.middleware.js";

import {upload}  from "../middleware/multer.middleware.js"
const router = express.Router();

// const storage = multer.memoryStorage();
// const uploadMiddleware=multer({storage:storage})

// router.use(verifyToken); // Apply authentication middleware to all routes in this file



router.route("/upload").post(
    upload.fields([
        {
            name:"image",
            maxCount:1
        },
        {
            name:"audio",
            maxCount:1
        }
    ]),
    uploadSong

)
router.route("/get").get(getAllSongs);
router.route("/search").get(searchSongs);
router.get('/get-songs/:mama', getSongById);

// Mood-based song recommendation
router.post('/mood', getSongsByMoodFromText);                          // User sends text, gets song recommendations




export default router;