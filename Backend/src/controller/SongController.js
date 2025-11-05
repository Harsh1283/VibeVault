import express from "express";
import SongModel from "../modles/song.model.js";
import uploadFile from "../services/storage.service.js";
import { getMood } from "../services/mood.service.js";

export const uploadSong=async(req,res)=>{
    try{
        const {name,artist,image,audio}=req.body;
       const uploadUrl= await uploadFile(req.file.buffer)
        
        if (!req.file) {
         return res.status(400).json({ message: "No audio file uploaded" });
    }
        
        // Automatically detect mood from song name and artist
        const songText = `${name} by ${artist}`;
        const detectedMood = await getMood(songText);
        
        const newSong= await SongModel.create({
            name,
            artist,
            image,
            audio:uploadUrl.url,
            mood: detectedMood
        })
        res.status(201).json({message:"Song uploaded successfully",newSong});

    }

    catch(error){
        console.log('Error uploading song:', error);
        res.status(500).json({message:"Internal server error"});
    }
}
export async function getSongs(req,res) {
    const songs = await SongModel.find()

    if(!songs || songs.length === 0) {
        return res.status(404).json({message:"No songs found"});
    }
    res.status(200).json({
        message:"songs fetched successfully",
        songs:songs
    })
}

export async function songSearch(req,res){
    const text=req.query.text;

    const songs= await SongModel.find({
        name:{
            $regex: text,
            $options: "i" // case-insensitive search
        }
    })
    res.status(200).json({
        message: "Songs fetched successfully",
        songs:songs
    })
}
export async function getSongById(req,res){
    const songId =req.params.mama;


    const song =await SongModel.findOne({
        _id: songId
    })

    res.status(200).json({
        message: "Song fetched successfully",
        song
    })
}
export async function mood(req,res){
    try {
        const { text } = req.body;
        
        if (!text) {
            return res.status(400).json({ 
                message: "Please provide text to analyze mood" 
            });
        }
        
        // Step 1: Detect mood from user's text
        const detectedMood = await getMood(text);
        
        // Step 2: Find songs that match the detected mood
        const songs = await SongModel.find({
            mood: { $regex: detectedMood, $options: "i" }
        });
        
        if (!songs || songs.length === 0) {
            return res.status(404).json({ 
                message: `No songs found for your mood: ${detectedMood}`,
                detectedMood: detectedMood,
                userText: text
            });
        }
        
        res.status(200).json({
            message: "Songs found based on your mood!",
            userText: text,
            detectedMood: detectedMood,
            count: songs.length,
            songs: songs
        });
        
    } catch (error) {
        console.log('Error in mood function:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}