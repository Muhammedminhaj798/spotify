import React, { useState } from 'react';
import { X, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPlaylist } from '../redux/users/playlistSlice';

export default function AddPlaylist() {
  const [name, setPlaylistName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.userPlaylist); // Access Redux state

  const handleSave = async () => {
    if (name.trim()) {
      try {
        // Dispatch the addPlaylist async action and wait for it to complete
        const result = await dispatch(addPlaylist({ name, description })).unwrap();
        // Navigate back only on success
        navigate('/');
      } catch (err) {
        // Error is handled via Redux state, no need to do anything here
        console.error('Failed to save playlist:', err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm" />
      
      {/* Modal */}
      <div className="relative bg-zinc-900 rounded-lg w-full max-w-lg mx-4 sm:mx-0 max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-700">
          <h2 className="text-white text-xl font-bold">Edit details</h2>
          <button
            onClick={() => navigate(-1)}
            className="text-zinc-400 hover:text-white transition-colors p-1"
            disabled={loading} // Disable close button while loading
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-600 text-white rounded">
              Error: {error}
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Image Upload Area */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-zinc-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-zinc-700 transition-colors group mx-auto sm:mx-0">
                <div className="text-center">
                  <Music size={48} className="text-zinc-500 mx-auto mb-2 group-hover:text-zinc-400 transition-colors" />
                  <span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors hidden sm:block">
                    Choose photo
                  </span>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex-1 space-y-4">
              {/* Playlist Name */}
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setPlaylistName(e.target.value)}
                  className="w-full bg-zinc-800 text-white text-lg font-semibold px-3 py-2 rounded border border-zinc-700 focus:border-white focus:outline-none transition-colors"
                  placeholder="Playlist name"
                  disabled={loading} // Disable input while loading
                />
              </div>

              {/* Description */}
              <div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add an optional description"
                  className="w-full bg-zinc-800 text-white px-3 py-2 rounded border border-zinc-700 focus:border-white focus:outline-none transition-colors resize-none h-24 placeholder-zinc-500"
                  disabled={loading} // Disable textarea while loading
                />
              huts            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-700">
          {/* Terms */}
          <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
            By proceeding, you agree to give Spotify access to the image you choose to upload. 
            Please make sure you have the right to upload the image.
          </p>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={loading || !name.trim()} // Disable while loading or if playlistName is empty
              className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}