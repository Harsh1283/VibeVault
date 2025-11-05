import {Song} from "../modles/song.model.js";
import {asyncHandler} from "../utils/asyncHandle.js"
import  { ApiError } from "../utils/ApiError.js"
import { uploadCloudinary } from "../utils/Cloudinary.js";
import {ApiResponse} from "../utils/apiResponse.js"
import { getMood } from "../services/mood.service.js";

const uploadSong=asyncHandler(async(req,res)=>{
    const {name,artist,mood}=req.body

    if([name,artist,mood].some((field)=>{field?.trim()==""})
    ){
        throw new ApiError(400,"all fields are required")
    }
    let imageLocalPath
    if(req.files && Array.isArray(req.files.image) && req.files.image.length > 0){
        imageLocalPath=req.files.image[0].path
    }
    const audioLocalPath=req.files?.audio[0]?.path

    if(!audioLocalPath){
        throw new ApiError(400,"audio is not present")
    }
    const audio=await uploadCloudinary(audioLocalPath)
    const image=await uploadCloudinary(imageLocalPath)

    if(!audio){
        throw new ApiError(400,"audio file is required")
    }

    const newSong=await Song.create({
        name,
        artist,
        image:image?.url || "",
        audio:audio.url,
        mood
    })

    if(!newSong){
        throw new ApiError(500,"Something went wrong while adding Song")
    }
     return res
     .status(201)
     .json(new ApiResponse(201,newSong,"Song added successfully"))


})

// fetch songs 
const getAllSongs = asyncHandler(async (req, res) => {
  // fetch all songs from DB
  const songs = await Song.find();

  // if DB empty or no songs found
  if (!songs || songs.length === 0) {
    throw new ApiError(404, "No songs found in the database");
  }

  // send success response
  return res
    .status(200)
    .json(new ApiResponse(200, songs, "Songs fetched successfully"));
});

// search song using name artist and mood based 
const searchSongs = asyncHandler(async (req, res) => {
  const { query } = req.query;

  // check if search query provided
  if (!query || query.trim() === "") {
    throw new ApiError(400, "Search query is required");
  }

  // search songs (case-insensitive)
  const songs = await Song.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { artist: { $regex: query, $options: "i" } },
      { mood: { $regex: query, $options: "i" } },
    ],
  });

  if (!songs || songs.length === 0) {
    throw new ApiError(404, "No songs found matching your search");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, songs, "Songs fetched successfully"));
});

// by id
const getSongById = asyncHandler(async (req, res) => {
  const { mama } = req.params; // 👈 dynamic param name from route

  //  Validate param
  if (!mama) {
    throw new ApiError(400, "Song ID is required in params");
  }

  //  Validate ObjectId format
  if (!mongoose.isValidObjectId(mama)) {
    throw new ApiError(400, "Invalid Song ID format");
  }

  //  Fetch song
  const song = await Song.findById(mama);

  if (!song) {
    throw new ApiError(404, "Song not found");
  }

  //  Send successful response
  return res
    .status(200)
    .json(new ApiResponse(200, song, "Song fetched successfully"));
});

//get song by mood
const getSongsByMoodFromText = asyncHandler(async (req, res) => {
  const { text } = req.body;

  //  Validate input
  if (!text || text.trim() === "") {
    throw new ApiError(400, "Text input is required to detect mood");
  }

  let mood;
  try {
    //  Get mood from AI service
        mood = await getMood(text);
    console.log("Detected Mood:", mood);
  } catch (error) {
    console.error("Mood service failed:", error);
    throw new ApiError(500, "Error analyzing mood from provided text");
  }

  // Fetch songs by detected mood
  const songs = await Song.find({ mood: { $regex: new RegExp(`^${mood}$`, "i") } });

  if (!songs || songs.length === 0) {
    throw new ApiError(404, `No songs found for mood: ${mood}`);
  }

  //  Send success response
  return res
    .status(200)
    .json(new ApiResponse(200, { mood, songs }, "Songs fetched successfully based on mood"));
});


export {
    uploadSong,
    getAllSongs,
    searchSongs,
    getSongById,
    getSongsByMoodFromText
}