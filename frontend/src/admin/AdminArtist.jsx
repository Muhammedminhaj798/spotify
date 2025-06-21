import { User, Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, UserX, UserCheck, Calendar, Mail, Phone } from 'lucide-react';
import React, { useEffect, useState, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllArtist, toggleDisableArtist } from '../redux/admin/adminArtistSlice';

const AdminArtist = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('artists');

    const dispatch = useDispatch();
    const { artists, loading, error } = useSelector((state) => state.adminArtist);

    console.log("artists", artists);

    const [newArtist, setNewArtist] = useState({
        name: '',
        email: '',
        phone: '',
        specialty: ''
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

    // This function should dispatch to Redux instead of updating local state
    const handleCreateArtist = () => {
        if (newArtist.name && newArtist.email) {
            // TODO: You should create a Redux action for creating artists
            // For now, this is a placeholder - you'll need to implement createArtist action
            console.log('Create artist:', newArtist);

            // Reset form and close modal
            setNewArtist({ name: '', email: '', phone: '', specialty: '' });
            setShowCreateModal(false);

            // You might want to dispatch a create action here:
            // dispatch(createArtist(newArtist));
        }
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
                                                        src={artist.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&crop=face"}
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
                                                    {artist.joinDate ? new Date(artist.joinDate).toLocaleDateString() : 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-white">{artist.artworks || 0} artworks</div>
                                                <div className="text-sm text-gray-400">{artist.totalViews || 0} views</div>
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

                    {/* Create Artist Modal */}
                    {showCreateModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700">
                                <h2 className="text-xl font-semibold text-white mb-4">Add New Artist</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                        <input
                                            type="text"
                                            value={newArtist.name}
                                            onChange={(e) => setNewArtist({ ...newArtist, name: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter artist name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={newArtist.email}
                                            onChange={(e) => setNewArtist({ ...newArtist, email: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter email address"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            value={newArtist.phone}
                                            onChange={(e) => setNewArtist({ ...newArtist, phone: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Specialty</label>
                                        <input
                                            type="text"
                                            value={newArtist.specialty}
                                            onChange={(e) => setNewArtist({ ...newArtist, specialty: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="e.g., Digital Art, Photography"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        onClick={() => setShowCreateModal(false)}
                                        className="px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleCreateArtist}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Create Artist
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