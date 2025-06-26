// import Playlist from "../models/Playlist.js"; // Adjust path to your Playlist model
// import User from "../models/User.js"; // Adjust path to your User model
// import asyncHandler from "express-async-handler"; // Optional: for cleaner async error handling

import Playlist from "../../model/playlistSchema.js";

const addPlaylist = async (req, res) => {
  const { name, isPublic, description} = req.body;
  console.log(req.user);

  if (!name) {
    res.status(400);
    throw new Error("Playlist name is required");
  }

  const userId = req.user.id;

  const playlist = new Playlist({
    name,
    creator: userId,
    isPublic: isPublic !== undefined ? isPublic : true, // Default to public if not specified
    songs: [], // Initialize with empty songs array
    description: description || "",
  });

  const createdPlaylist = await playlist.save();

  // await User.findByIdAndUpdate(userId, { $push: { playlists: createdPlaylist._id } });

  res.status(201).json({
    success: true,
    data: createdPlaylist,
    message: "Playlist created successfully",
  });
};

export const getPlaylists = async (req, res) => {
  try {
    const id = req.user.id;
    const playlists = await Playlist.find({ creator: id }).populate("songs");
    if (!playlists) {
      return res.status(404).json({ message: "No playlists found" });
    }
    res.status(200).json(playlists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePlaylist = async(req,res) => {
  const {id} = req.params
  await Playlist.findByIdAndDelete(id)
  res.status(200).json("playlist deleted successfully")
}

export const getAllPlaylist = async(req,res) => {
  try{
    const playlists = await Playlist.find().populate("songs")

    if(!playlists){
      return res.status(404).json({message: "No playlists found"})
    }


    const formattedPlaylist = playlists.map((playlist) => ({
      ...Playlist.toObject(),
      songs:playlist.songs.map((song) => ({
        ...song.toObject(),
        duration:formattedPlaylist(song.duration)
      }))
    }))
    res.status(200).json({
      playlists:formattedPlaylist
    })
  } catch(err){
    res.status(500).json({message:err.message})
    }
}

export default addPlaylist;
