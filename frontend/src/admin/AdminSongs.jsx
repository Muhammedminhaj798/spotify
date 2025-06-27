import React, { useEffect, useState } from 'react';
import { Search, Plus, Edit, Trash2, Music, ArrowLeft, SidebarOpen, Upload } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { addSong, DeletedSong, getAllSongs } from '../redux/admin/adminSongSlice';
import { getAllArtist } from '../redux/admin/adminArtistSlice';

const AdminSongsComponent = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('dashboard');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingSong, setEditingSong] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        genre: '',
        duration: '',
        status: 'Active'
    });
    
    const [audioFile, setAudioFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const { songs, loading, error } = useSelector((state) => state.adminSongs);
    const { artists } = useSelector((state) => state.adminArtist);

    useEffect(() => {
        dispatch(getAllSongs());
        dispatch(getAllArtist());
    }, [dispatch]);

    const filteredSongs = songs?.filter(song =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e, fileType) => {
        const { files } = e.target;
        
        if (fileType === 'audio') {
            setAudioFile(files[0]);
        } else if (fileType === 'image') {
            setImageFile(files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.title || !formData.artist || !formData.genre || !formData.duration) {
            alert('Please fill in all required fields');
            return;
        }

        if (!audioFile || !imageFile) {
            alert('Please select both audio and image files');
            return;
        }

        setIsLoading(true);

        try {
            // Create FormData for file upload
            const songData = new FormData();
            songData.append('title', formData.title);
            songData.append('artist', formData.artist);
            songData.append('genre', formData.genre);
            songData.append('duration', formData.duration);
            songData.append('status', formData.status);
            songData.append('audioFile', audioFile);
            songData.append('imageFile', imageFile);

            // Debug: Log FormData contents
            console.log('FormData contents:');
            for (let [key, value] of songData.entries()) {
                console.log(key, value);
            }
            
            // Dispatch the action with FormData
            const result = await dispatch(addSong(songData));
            
            // Check if the action was successful
            if (addSong.fulfilled.match(result)) {
                alert('Song added successfully!');
                resetForm();
                dispatch(getAllSongs()); // Refresh the songs list
            } else {
                // Handle rejected case
                const errorMessage = result.payload || result.error?.message || 'Failed to add song';
                alert(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error adding song:', error);
            alert('Failed to add song. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ title: '', artist: '', genre: '', duration: '', status: 'Active' });
        setAudioFile(null);
        setImageFile(null);
        setShowForm(false);
        setEditingSong(null);
        
        // Reset file inputs
        const audioInput = document.getElementById('audioFile');
        const imageInput = document.getElementById('imageFile');
        if (audioInput) audioInput.value = '';
        if (imageInput) imageInput.value = '';
    };

    const editSong = (song) => {
        setFormData({
            title: song.title,
            artist: song.artist,
            genre: song.genre,
            duration: song.duration,
            status: song.status || 'Active'
        });
        setEditingSong(song);
        setShowForm(true);
    };

    const deleteSong = (id) => {
        if (window.confirm('Are you sure you want to delete this song?')) {
            dispatch(DeletedSong(id));
            dispatch(getAllSongs());
        }
    };

    const toggleStatus = (id) => {
        // You'll need to implement updateSongStatus action in your Redux slice
        console.log('Toggle status for song with id:', id);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="min-h-screen bg-black text-white flex">
            <Sidebar
                isOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
            />
            <div className="max-w-7xl mx-auto flex-1 flex flex-col p-6">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <button
                            onClick={() => window.history.back()}
                            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-400" />
                        </button>
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <SidebarOpen className="w-5 h-5 text-gray-400" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                                <Music className="w-8 h-8 text-green-500" />
                                Songs Management
                            </h1>
                            <p className="text-gray-400 mt-1">Manage your music library</p>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-3 text-gray-500" size={16} />
                            <input
                                type="text"
                                placeholder="Search songs or artists..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                        >
                            <Plus size={16} />
                            Add New Song
                        </button>
                    </div>
                </div>

                {/* Add/Edit Form */}
                {showForm && (
                    <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-6 mb-6 border-l-4 border-green-500">
                        <h2 className="text-xl font-semibold mb-4 text-white">
                            {editingSong ? 'Edit Song' : 'Add New Song'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Enter song title"
                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Artist *</label>
                                    <select
                                        name="artist"
                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        value={formData.artist}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Artist</option>
                                        {artists && artists.map((artist, index) => (
                                            <option key={index} value={artist.name || artist}>
                                                {artist.name || artist}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Genre *</label>
                                    <select
                                        name="genre"
                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        value={formData.genre}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Genre</option>
                                        <option value="Rock">Rock</option>
                                        <option value="Pop">Pop</option>
                                        <option value="Hip Hop">Hip Hop</option>
                                        <option value="Jazz">Jazz</option>
                                        <option value="Classical">Classical</option>
                                        <option value="Electronic">Electronic</option>
                                        <option value="Country">Country</option>
                                        <option value="R&B">R&B</option>
                                        <option value="Reggae">Reggae</option>
                                        <option value="Blues">Blues</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Duration *</label>
                                    <input
                                        type="text"
                                        name="duration"
                                        placeholder="e.g., 3:45"
                                        pattern="^[0-9]+:[0-5][0-9]$"
                                        title="Please enter duration in MM:SS format (e.g., 3:45)"
                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Audio File *</label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            id="audioFile"
                                            accept="audio/*"
                                            onChange={(e) => handleFileChange(e, 'audio')}
                                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-green-600 file:text-white hover:file:bg-green-700"
                                            required
                                        />
                                        <Upload className="absolute right-3 top-3 text-gray-500 pointer-events-none" size={16} />
                                    </div>
                                    {audioFile && <p className="text-xs text-green-400 mt-1">Selected: {audioFile.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Cover Image *</label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            id="imageFile"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, 'image')}
                                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-green-600 file:text-white hover:file:bg-green-700"
                                            required
                                        />
                                        <Upload className="absolute right-3 top-3 text-gray-500 pointer-events-none" size={16} />
                                    </div>
                                    {imageFile && <p className="text-xs text-green-400 mt-1">Selected: {imageFile.name}</p>}
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            Adding...
                                        </>
                                    ) : (
                                        editingSong ? 'Update Song' : 'Add Song'
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    disabled={isLoading}
                                    className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 disabled:bg-gray-800 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Error Display */}
                {error && (
                    <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-6">
                        <p className="text-red-300">Error: {error}</p>
                    </div>
                )}

                {/* Songs Table */}
                <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h3 className="text-lg font-medium text-white">
                            All Songs ({filteredSongs.length})
                        </h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-800">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Song Details
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Genre
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Duration
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-900 divide-y divide-gray-800">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                                                <span className="ml-2 text-gray-400">Loading songs...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredSongs.map((song) => (
                                        <tr key={song._id || song.id} className="hover:bg-gray-800 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        {song.coverImage ? (
                                                            <img
                                                                src={song.coverImage}
                                                                alt={song.title}
                                                                className="h-10 w-10 rounded-lg object-cover"
                                                            />
                                                        ) : (
                                                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                                                                <Music className="w-5 h-5 text-white" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-white">{song.title}</div>
                                                        <div className="text-sm text-gray-400">{song.artist}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-900 text-blue-300">
                                                    {song.genre || 'Unknown'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                {song.duration || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => toggleStatus(song._id || song.id)}
                                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full transition-colors ${(song.status || 'Active') === 'Active'
                                                        ? 'bg-green-900 text-green-300 hover:bg-green-800'
                                                        : 'bg-red-900 text-red-300 hover:bg-red-800'
                                                        }`}
                                                >
                                                    {song.status || 'Active'}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => editSong(song)}
                                                        className="text-indigo-400 hover:text-indigo-300 p-1 rounded transition-colors"
                                                        title="Edit song"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteSong(song._id || song.id)}
                                                        className="text-red-400 hover:text-red-300 p-1 rounded transition-colors"
                                                        title="Delete song"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {!loading && filteredSongs.length === 0 && (
                        <div className="text-center py-12">
                            <Music className="mx-auto h-12 w-12 text-gray-500" />
                            <h3 className="mt-2 text-sm font-medium text-white">No songs found</h3>
                            <p className="mt-1 text-sm text-gray-400">
                                {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding a new song.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminSongsComponent;