import Artist from "../../model/artistSchema.js";

export const addArtist = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }
    if (!req.files || !req.files.imageFile) {
      return res
        .status(400)
        .json({ message: "Audio and image files are required" });
    }

    const imageFileUrl = req.files.imageFile[0]?.path;
    console.log("image");
    if (!imageFileUrl) {
      return res.status(400).json({
        message: "Failed to retrieve Cloudinary URLs",
        files: req.files,
      });
    }

    const newArtist = new Artist({
      name: name,
      description: description,
      image: imageFileUrl,
    });

    await newArtist.save();

    res.status(201).json({
      message: "Artist added successfully",
      status: "success",
      artist: newArtist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllArtist = async (req, res, next) => {
  try {
    const artist = await Artist.find();
    res.status(200).json(artist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const disableArstist = async (req, res, next) => {
  try {
    const id = req.params.id;
    const artist = await Artist.findByIdAndUpdate(
      id,
      { isDisabled: true },
      { new: true }
    );
    res.status(200).json(artist);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const toggleDisableArtist = async (req, res, next) => {
  try {
    const { isDisabled } = req.body;
    const updatedArtist = await Artist.findByIdAndUpdate(
      req.params.id,
      { isDisabled },
      { new: true }
    );
    res.status(200).json({
      message: "Artist status updated successfully",
      status: "success",
      updatedArtist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatedArtist = async (req, res, next) => {
  try {
    const { name } = req.body;
    const artistId = req.params.id;

    // Validate input
    if (!name) {
      return res.status(400).json({
        message: "Artist name is required",
        status: "error",
      });
    }

    const updateData = { name };

    // Handle image if provided
    if (req.files && req.files.imageFile) {
      updateData.image = req.files.imageFile.path; // Use single file
    }

    const updatedArtist = await Artist.findByIdAndUpdate(
      artistId,
      updateData,
      { new: true }
    );

    if (!updatedArtist) {
      return res.status(404).json({
        message: "Artist not found",
        status: "error",
      });
    }

    res.status(200).json({
      message: "Artist details updated successfully",
      status: "success",
      data: updatedArtist,
    });
  } catch (error) {
    console.error("Error updating artist:", error);
    res.status(500).json({
      message: "Internal server error",
      status: "error",
      error: error.message,
    });
  }
};