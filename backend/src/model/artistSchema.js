import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Artist name is required"],
      trim: true,
      minlength: [2, "Artist name must be at least 2 characters"],
      maxlength: [100, "Artist name cannot exceed 100 characters"],
    },
    image: {
      type: String,
      trim: true,
      default: null,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      default: null,
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
        default: [],
      },
    ],
    isDisabled: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { strictPopulate: false }
);

// Update `updatedAt` timestamp before saving
artistSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Artist = mongoose.model("Artist", artistSchema);
export default Artist;
