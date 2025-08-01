import asyncHandler from "express-async-handler";
import Song from "../../model/songSchema.js";
import CustomError from "../../utils/customError.js";
import Artist from "../../model/artistSchema.js";

const addSongs = async (req, res, next) => {
  try {
    if (req.fileError) {
      return res.status(400).json({ message: req.fileError.message });
    }

    const { title, duration, artist, genre } = req.body;

    // Validate required fields
    if (!title || !artist || !genre || !duration) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if files are uploaded
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res
        .status(400)
        .json({ message: "Audio and image files are required" });
    }

    // Extract Cloudinary URLs
    const audioFileUrl = req.files.audioFile[0]?.path;
    const imageFileUrl = req.files.imageFile[0]?.path;
    const audioDuration = audioFileUrl?.duration;
    console.log(audioDuration);

    if (!audioFileUrl || !imageFileUrl) {
      return res.status(400).json({
        message: "Failed to retrieve Cloudinary URLs",
        files: req.files,
      });
    }

    // Create new song
    const newSong = new Song({
      url: audioFileUrl,
      title: title,
      artist,
      duration: duration,
      genre: genre,
      coverImage: imageFileUrl,
    });

    // Save to database
    await newSong.save();

    await Artist.updateMany(
      { _id: { $in: artist } },
      { $push: { songs: newSong._id } }
    );

    res.status(201).json(newSong);

    console.log("asdfghjkqwertyuio");
  } catch (error) {
    console.error("Error in addSongs:", JSON.stringify(error, null, 2));
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || error,
    });
  }
};

export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find({ isDeleted: false }).populate("artist");

    if (!songs) {
      return next(new CustomError("Songs not found ", 404));
    }

    res.status(200).json({
      message: "songs find success",
      status: "success",
      songs,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleDeleted = asyncHandler(async (req, res, next) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!updatedSong) {
      return next(new CustomError("song not found", 404));
    }
    res.status(200).json({
      message: "song deleted successfully",
      status: "success",
      updatedSong,
    });
  } catch (error) {
    console.error("Error in toggleDeleted:", JSON.stringify(error, null, 2));
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || error,
    });
  }
});

export default addSongs;
