import Artist from "../../model/artistSchema.js";

export const getArtistSongById = async (req, res) => {
  try {
    const { id } = req.params; // Extract id from params correctly

    const artist = await Artist.findById(id)
      .populate("Songs")
      .populate("Artist ");

    if (!artist) {
      return res.status(404).json({
        message: "Artist not found",
        status: "error",
      });
    }

    res.status(200).json({
      message: "Artist found successfully",
      status: "success",
      data: {
        artist: artist,
        songs: artist.songs || [],
      },
    });
  } catch (error) {
    console.error("Error fetching artist:", error);
    res.status(500).json({
      message: "Internal Server Error",
      status: "error",
      error: error.message,
    });
  }
};
