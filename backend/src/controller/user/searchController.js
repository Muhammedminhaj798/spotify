import Song from "../../model/songSchema.js";

export const getSearchController = async(req,res) => {
    const {search} = req.body;
    console.log(search);
    if(search){
        const songs = await Song.find({
      title: { $regex: search, $options: "i" },
      isDeleted: false,
    })
    return res.status(200).json({
        message:"search is success",
        status:"successfull",
        data:songs
    })

    }

    res.status(400).json({
    message: "No search term provided",
    status: "failed",
    data: null
  });

}