import React, { useState, useEffect } from "react";
import { Save, Upload, User, Edit3 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getAllArtist, updatedArtist } from "../redux/admin/adminArtistSlice";

const AdminArtistEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [artistData, setArtistData] = useState({
    name: "",
    image: null,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("artists");
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const { artists, loading, error } = useSelector((state) => state.adminArtist);

  useEffect(() => {
    const loadArtistData = async () => {
      try {
        if (artists.length === 0) {
          await dispatch(getAllArtist()).unwrap();
        }
      } catch (error) {
        console.error("Error loading artists:", error);
        alert("Error loading artist data");
        navigate("/admin_artist");
      }
    };

    if (id) {
      loadArtistData();
    }
  }, [id, dispatch, navigate]);

  useEffect(() => {
    if (artists.length > 0 && id && !dataLoaded) {
      const artist = artists.find((artist) => artist._id === id || artist.id === id);
      if (artist) {
        setArtistData({
          name: artist.name || "",
          image: null,
        });
        if (artist.image) {
          setImagePreview(artist.image);
        }
        setDataLoaded(true);
      } else {
        alert("Artist not found");
        navigate("/admin_artist");
      }
    }
  }, [artists, id, dataLoaded, navigate]);

  const handleNameChange = (e) => {
    const { value } = e.target;
    setArtistData((prev) => ({
      ...prev,
      name: value,
    }));
    if (errors.name) {
      setErrors((prev) => ({
        ...prev,
        name: "",
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setErrors((prev) => ({
        ...prev,
        image: "No file selected",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "Image size must be less than 5MB",
      }));
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: "Please select a valid image file (JPEG, PNG, or GIF)",
      }));
      return;
    }

    setArtistData((prev) => ({
      ...prev,
      image: file,
    }));

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.onerror = () => {
      setErrors((prev) => ({
        ...prev,
        image: "Error reading the image file",
      }));
    };
    reader.readAsDataURL(file);

    setErrors((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!artistData.name.trim()) {
      newErrors.name = "Artist name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      let data;
      if (artistData.image && artistData.image instanceof File) {
        const formData = new FormData();
        formData.append("name", artistData.name.trim());
        formData.append("imageFile", artistData.image); // Match backend field name
        data = formData;
      } else {
        data = { name: artistData.name.trim() };
      }

      const result = await dispatch(updatedArtist({ data, id })).unwrap();
      alert("Artist updated successfully!");
      await dispatch(getAllArtist());
      navigate("/admin_artist");
    } catch (error) {
      console.error("Error updating artist:", error);
      alert(`Error updating artist: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin_artist");
  };

  if (loading && !dataLoaded) {
    return (
      <div className="min-h-screen text-white bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading artist data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-black flex">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <div className="w-full max-w-6xl mt-12 mx-auto">
        <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-800">
          <div className="bg-gradient-to-r from-gray-800 to-black px-6 py-4 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Edit3 className="w-6 h-6 text-gray-300" />
              Edit Artist
            </h1>
          </div>
          <div className="p-6">
            <div className="text-center mb-8">
              <div className="relative inline-block">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Artist preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-700 shadow-xl"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center border-4 border-gray-700 shadow-xl">
                    <User className="w-12 h-12 text-gray-500" />
                  </div>
                )}
              </div>
              <div className="mt-4">
                <label className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors border border-gray-600">
                  <Upload className="w-4 h-4" />
                  {imagePreview ? "Change Image" : "Upload Image"}
                  <input
                    type="file"
                    id="imageFile"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              {errors.image && <p className="text-red-400 text-sm mt-2">{errors.image}</p>}
            </div>
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-300 mb-3">
                Artist Name
              </label>
              <input
                type="text"
                value={artistData.name}
                onChange={handleNameChange}
                className={`w-full px-4 py-3 text-lg bg-gray-800 text-white border-2 rounded-lg focus:ring-2 focus:ring-gray-600 focus:border-gray-600 transition-all placeholder-gray-500 ${
                  errors.name ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="Enter artist name"
              />
              {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Artist
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminArtistEdit;