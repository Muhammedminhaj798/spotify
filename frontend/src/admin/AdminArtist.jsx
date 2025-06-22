import { User, Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, UserX, UserCheck, Calendar, Mail, Phone, Upload } from 'lucide-react';
import React, { useEffect, useState, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { addArtist, getAllArtist, toggleDisableArtist } from '../redux/admin/adminArtistSlice';

const AdminArtist = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('artists');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const { artists, loading, error } = useSelector((state) => state.adminArtist);

    console.log("artists", artists);

    // Updated newArtist state with image file handling
    const [newArtist, setNewArtist] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        dispatch(getAllArtist());
    }, [dispatch]);

    // Fixed filtering logic to handle potential undefined values
    const filteredArtists = artists?.filter(artist => {
        const matchesSearch = artist.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            artist.email?.toLowerCase().includes(searchTerm.toLowerCase());

        // Fixed status filtering to use the correct property name
        const artistStatus = artist.isDisabled ? 'disabled' : 'active';
        const matchesFilter = filterStatus === 'all' || artistStatus === filterStatus;

        return matchesSearch && matchesFilter;
    }) || [];

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Handle image file selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Updated create artist function with file handling
    const handleCreateArtist = async () => {
        if (!newArtist.name || !newArtist.description) {
            alert('Please fill in all required fields');
            return;
        }

        if (!imageFile) {
            alert('Please select an image file');
            return;
        }

        setIsLoading(true);

        try {
            // Create FormData for file upload
            const artistData = new FormData();
            artistData.append('name', newArtist.name);
            artistData.append('description', newArtist.description);
            artistData.append('imageFile', imageFile);

            // Debug: Log FormData contents
            console.log('FormData contents:');
            for (let [key, value] of artistData.entries()) {
                console.log(key, value);
            }

            // TODO: You should create a Redux action for creating artists with file upload
            // For now, this is a placeholder - you'll need to implement createArtist action
            console.log('Create artist with file:', artistData);
            await dispatch(addArtist(artistData))
            // Simulate API call
            // await new Promise(resolve => setTimeout(resolve, 1000));

            alert('Artist created successfully!');
            resetForm();

            // You might want to dispatch a create action here:
            // const result = await dispatch(createArtist(artistData));
            // if (createArtist.fulfilled.match(result)) {
            //     alert('Artist created successfully!');
            //     resetForm();
            //     dispatch(getAllArtist());
            // }
        } catch (error) {
            console.error('Error creating artist:', error);
            alert('Failed to create artist. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Reset form function
    const resetForm = () => {
        setNewArtist({
            name: '',
            description: ''
        });
        setImageFile(null);
        setImagePreview('');
        setShowCreateModal(false);
        
        // Reset file input
        const imageInput = document.getElementById('imageFile');
        if (imageInput) imageInput.value = '';
    };

    // FIXED: Use the correct action name and wrap in useCallback
    const toggleArtistStatus = useCallback(async (id, currentStatus) => {
        console.log('Toggling artist status:', id, currentStatus);
        try {
            // Use the correct Redux action name
            await dispatch(toggleDisableArtist({ id, currentStatus })).unwrap();
            console.log('Block/Unblock successful');
            // Refresh the artists list after successful toggle
            dispatch(getAllArtist());
        } catch (error) {
            console.error("Block/Unblock error:", error);
        }
    }, [dispatch]);

    // Fixed stats calculation to use correct property names
    const stats = [
        {
            label: "Total Artists",
            value: artists?.length || 0,
            color: "text-blue-400"
        },
        {
            label: "Active Artists",
            value: artists?.filter(a => !a.isDisabled).length || 0,
            color: "text-green-400"
        },
        {
            label: "Disabled Artists",
            value: artists?.filter(a => a.isDisabled).length || 0,
            color: "text-red-400"
        },
        {
            label: "Total Artworks",
            value: artists?.reduce((sum, a) => sum + (a.artworks || 0), 0) || 0,
            color: "text-purple-400"
        },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex">
                <Sidebar
                    isOpen={sidebarOpen}
                    toggleSidebar={toggleSidebar}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-white">Loading artists...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white flex">
                <Sidebar
                    isOpen={sidebarOpen}
                    toggleSidebar={toggleSidebar}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-red-400">Error loading artists: {error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white flex">
            <Sidebar
                isOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
            />
            {/* Fixed: Added proper layout wrapper */}
            <div className="flex-1 p-6 overflow-auto">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Artist Management</h1>
                            <p className="text-gray-400 mt-1">Manage and monitor all artists on the platform</p>
                        </div>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add New Artist</span>
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                                <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                                <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Filters and Search */}
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search artists..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Filter className="w-4 h-4 text-gray-400" />
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="disabled">Disabled</option>
                                    </select>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400">
                                Showing {filteredArtists.length} of {artists?.length || 0} artists
                            </p>
                        </div>
                    </div>

                    {/* Artists Table */}
                    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Artist</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Join Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Stats</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-800 divide-y divide-gray-700">
                                    {filteredArtists.map((artist) => (
                                        <tr key={artist._id} className="hover:bg-gray-700 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <img
                                                        className="h-10 w-10 rounded-full"
                                                        src={artist.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&crop=face"}
                                                        alt={artist.name}
                                                    />
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-white">{artist.name}</div>
                                                        <div className="text-sm text-gray-400">{artist.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-white flex items-center">
                                                    <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                                                    {artist.createdAt ? new Date(artist.createdAt).toLocaleDateString() : 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-white">{artist.artworks || 0} artworks</div>
                                                {/* <div className="text-sm text-gray-400">{artist.totalViews || 0} views</div> */}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${!artist.isDisabled
                                                    ? 'bg-green-900 text-green-300 border border-green-700'
                                                    : 'bg-red-900 text-red-300 border border-red-700'
                                                    }`}>
                                                    {artist.isDisabled ? 'disabled' : 'active'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex items-center space-x-2">
                                                    <button className="text-gray-400 hover:text-gray-300 transition-colors">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => toggleArtistStatus(artist._id, artist.isDisabled)}
                                                        className={!artist.isDisabled ? 'text-green-400 hover:text-red-300' : 'text-red-400 hover:text-green-300'}
                                                        title={!artist.isDisabled ? 'Disable Artist' : 'Enable Artist'}
                                                        disabled={loading} // Prevent multiple clicks while loading
                                                    >
                                                        {!artist.isDisabled ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Empty state */}
                        {filteredArtists.length === 0 && (
                            <div className="text-center py-12">
                                <User className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-300">No artists found</h3>
                                <p className="mt-1 text-sm text-gray-400">
                                    {searchTerm || filterStatus !== 'all'
                                        ? 'Try adjusting your search or filter criteria.'
                                        : 'Get started by adding your first artist.'
                                    }
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Create Artist Modal - Updated with Image Picker */}
                    {showCreateModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto">
                                <h2 className="text-xl font-semibold text-white mb-4">Add New Artist</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Artist Name *</label>
                                        <input
                                            type="text"
                                            value={newArtist.name}
                                            onChange={(e) => setNewArtist({ ...newArtist, name: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter artist name"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Artist Image *</label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id="imageFile"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                                required
                                            />
                                            <Upload className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                                        </div>
                                        {imageFile && <p className="text-xs text-blue-400 mt-1">Selected: {imageFile.name}</p>}
                                        
                                        {/* Image Preview */}
                                        {imagePreview && (
                                            <div className="mt-3">
                                                <p className="text-sm text-gray-300 mb-2">Preview:</p>
                                                <div className="flex justify-center">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="h-32 w-32 rounded-full object-cover border-2 border-gray-600"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Description *</label>
                                        <textarea
                                            value={newArtist.description}
                                            onChange={(e) => setNewArtist({ ...newArtist, description: e.target.value })}
                                            rows={4}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Tell us about the artist..."
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        onClick={resetForm}
                                        disabled={isLoading}
                                        className="px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleCreateArtist}
                                        disabled={!newArtist.name || !newArtist.description || !imageFile || isLoading}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Creating...
                                            </>
                                        ) : (
                                            'Create Artist'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminArtist;