import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // artist:  [{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Artist"
  // }],
  artist: { type: String, required: true },
  coverImage: { type: String },
  duration: { type: String, required: true },
  url: { type: String, required: true },
  playCount: { type: Number, default: 0 },
  genre: { type: String },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Song = mongoose.model("Song", songSchema);
export default Song;
