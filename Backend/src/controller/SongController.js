import express from "express";
import SongModel from "../modles/song.model.js";
import uploadFile from "../services/storage.service.js";

export const uploadSong=async(req,res)=>{
    try{
        const {name,artist,image,audio}=req.body;
       const uploadUrl= await uploadFile(req.file.buffer)
        
        if (!req.file) {
         return res.status(400).json({ message: "No audio file uploaded" });
    }
        
        const newSong= await SongModel.create({

            name,
            artist,
            image,
            audio:uploadUrl.url
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