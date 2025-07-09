// import Playlist from "../models/Playlist.js"; // Adjust path to your Playlist model
// import User from "../models/User.js"; // Adjust path to your User model
// import asyncHandler from "express-async-handler"; // Optional: for cleaner async error handling

import Playlist from "../../model/playlistSchema.js";
import Song from "../../model/songSchema.js";

const addPlaylist = async (req, res) => {
  const { name, isPublic, description } = req.body;
  console.log("playlist :", name, description);

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
    const playlists = await Playlist.find({ creator: id })
      .populate("songs")
      .populate("creator");
    if (!playlists) {
      return res.status(404).json({ message: "No playlists found" });
    }
    res.status(200).json(playlists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const playlistById = async (req, res) => {
  try {
    const id = req.params.id;
    const playlist = await Playlist.findById(id).populate("songs");
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    res.status(200).json({
      message: "Playlist found",
      status: "success",
      data: playlist,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addSongPlaylist = async (req, res) => {
  try {
    console.log("req:",req.params);
    const  playlistId  = req.params.id;
    const { songId } = req.body;
    console.log("playlist:", playlistId);
    console.log("playlist:", songId);
    // Validate inputs
    if (!playlistId || !songId) {
      return res.status(400).json({
        status: "error",
        message: "Playlist ID and Song ID are required",
      });
    }

    // Find the playlist
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({
        status: "error",
        message: "Playlist not found",
      });
    }

    // Find the song
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({
        status: "error",
        message: "Song not found",
      });
    }

    // Check for duplicate song
    if (playlist.songs.includes(songId)) {
      return res.status(400).json({
        status: "error",
        message: "Song already exists in the playlist",
      });
    }

    // Add song to playlist and save
    playlist.songs.push(songId);
    await playlist.save();

    // Send success response
    res.status(200).json({
      status: "success",
      message: "Song added to playlist",
      data: playlist,
    });
  } catch (err) {
    // Log error for debugging
    console.error("Error adding song to playlist:", err);

    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const deletePlaylist = async (req, res) => {
  const { id } = req.params;
  await Playlist.findByIdAndDelete(id);
  res.status(200).json("playlist deleted successfully");
};

export const getAllPlaylist = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate("songs");

    if (!playlists) {
      return res.status(404).json({ message: "No playlists found" });
    }

    const formattedPlaylist = playlists.map((playlist) => ({
      ...Playlist.toObject(),
      songs: playlist.songs.map((song) => ({
        ...song.toObject(),
        duration: formattedPlaylist(song.duration),
      })),
    }));
    res.status(200).json({
      playlists: formattedPlaylist,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default addPlaylist;
