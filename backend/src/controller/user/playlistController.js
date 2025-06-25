// import Playlist from "../models/Playlist.js"; // Adjust path to your Playlist model
// import User from "../models/User.js"; // Adjust path to your User model
// import asyncHandler from "express-async-handler"; // Optional: for cleaner async error handling

import Playlist from "../../model/playlistSchema.js";

const addPlaylist = async (req, res) => {
  const { name, isPublic } = req.body;

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
  });

  const createdPlaylist = await playlist.save();

  // await User.findByIdAndUpdate(userId, { $push: { playlists: createdPlaylist._id } });

  res.status(201).json({
    success: true,
    data: createdPlaylist,
    message: "Playlist created successfully",
  });
};

export default addPlaylist;
