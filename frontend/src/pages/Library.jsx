import React, { useEffect, useState, useRef } from 'react';
import { Search, Plus, ArrowUpDown, Heart, Music, User, EllipsisVertical, Trash2, Edit, X, Globe, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePlaylist, getPlaylist } from '../redux/users/playlistSlice';
import { getAllArtist } from '../redux/admin/adminArtistSlice';

const Library = () => {
  const [activeTab, setActiveTab] = useState('Playlists');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { playlists } = useSelector((state) => state.userPlaylist);
  const { artists } = useSelector((state) => state.adminArtist);

  const loginDropdownRef = useRef(null);
  const createDropdownRef = useRef(null);

  const isAuth = localStorage.getItem('isAuth');

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else if (window.innerWidth < 1024) {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch data
  useEffect(() => {
    const fetchPlaylists = async () => {
      await dispatch(getPlaylist()).unwrap();
    };
    fetchPlaylists();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllArtist());
  }, [dispatch]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginDropdownRef.current && !loginDropdownRef.current.contains(event.target)) {
        setShowLoginDropdown(false);
      }
      if (createDropdownRef.current && !createDropdownRef.current.contains(event.target)) {
        setShowCreateDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown !== null) {
        const dropdownElement = document.getElementById(`dropdown-${activeDropdown}`);
        const buttonElement = document.getElementById(`button-${activeDropdown}`);

        if (dropdownElement && buttonElement) {
          if (!dropdownElement.contains(event.target) && !buttonElement.contains(event.target)) {
            setActiveDropdown(null);
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const handleCreatePlaylist = () => {
    setShowLoginDropdown(true);
  };

  const handlePlusClick = () => {
    setShowCreateDropdown(!showCreateDropdown);
  };

  const handleCreateNewPlaylist = () => {
    setShowCreateDropdown(false);
    setShowLoginDropdown(true);
  };

  const handleLogin = () => {
    navigate('/login');
    console.log('Login clicked');
    setShowLoginDropdown(false);
  };

  const popularArtists = artists && artists.length > 0
    ? artists.slice(0, 4).filter(artist => artist && artist.name)
    : [];

  const currentData = activeTab === 'Playlists' ? playlists : popularArtists;

  const filteredData = (currentData || []).filter(item =>
    (item?.name || '').toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  const handleEllipsisClick = (e, itemId) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Clicked ellipsis for item:', itemId);

    if (activeDropdown === itemId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(itemId);
    }
  };

  const handleDeleteClick = (item) => {
    setSelectedPlaylist(item);
    setShowDeleteModal(true);
    setActiveDropdown(null);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting playlist:', selectedPlaylist.name);
    // dispatch(deletePlaylist(selectedPlaylist.id));
    dispatch(deletePlaylist(selectedPlaylist._id))
    setShowDeleteModal(false);
    setSelectedPlaylist(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedPlaylist(null);
  };

  const handleEditClick = (item) => {
    console.log('Edit playlist:', item.name);
    setActiveDropdown(null);
  };

  if (isAuth) {
    return (
      <>
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-full text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <div className={`
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isCollapsed ? 'w-16' : 'w-80'}
          fixed md:static left-0 top-0 min-h-screen bg-gray-900 border-r border-gray-800 
          transform transition-all duration-300 ease-in-out text-white z-50
          ${isCollapsed ? '' : 'hide-scrollbar overflow-y-auto pb-20'}
        `}>
          {/* Collapse Toggle Button - Desktop Only */}
          <button
            className="hidden md:block absolute -right-3 top-8 w-6 h-6 bg-gray-800 rounded-full border border-gray-700 flex items-center justify-center text-white hover:bg-gray-700 transition-colors z-10"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ArrowUpDown className="w-3 h-3" />
          </button>

          {/* Header */}
          <div className={`flex items-center justify-between p-4 pb-2 ${isCollapsed ? 'px-2' : ''}`}>
            {!isCollapsed && <h1 className="text-xl md:text-2xl font-bold">Your Library</h1>}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigate("/addPlaylist")}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                title="Add Playlist"
              >
                <Plus className="w-5 h-5" />
              </button>
              {!isCollapsed && (
                <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                  <ArrowUpDown className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {!isCollapsed && (
            <>
              {/* Toggle Buttons */}
              <div className="flex space-x-2 px-4 pb-4">
                {['Playlists', 'Artists'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 md:px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === tab
                      ? 'bg-gray-800 text-white'
                      : 'bg-transparent text-gray-400 hover:text-white'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="px-4 pb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search in Your Library"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Recents Header */}
              <div className="flex items-center justify-between px-4 pb-2">
                <span className="text-sm text-gray-400">Recents</span>
                <button className="p-1 hover:bg-gray-800 rounded transition-colors">
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </>
          )}

          {/* Content List */}
          <div className={`space-y-2 ${isCollapsed ? 'px-2' : 'px-4'}`}>
            {filteredData.map((item, index) => (
              <div
                key={index}
                className={`group flex items-center p-2 hover:bg-gray-800 rounded-md transition-colors cursor-pointer ${isCollapsed ? 'justify-center' : 'space-x-3'
                  }`}
                onClick={() => {
                  navigate(`/viewPlaylist/${item._id}`);
                  setIsMobileMenuOpen(false);
                }}
              >
                {/* Icon/Image */}
                <div className={`${isCollapsed ? 'w-8 h-8' : 'w-12 h-12'} rounded-md flex items-center justify-center ${item?.bgColor || 'bg-gray-700'} flex-shrink-0`}>
                  {item.songs ? (
                    <div className="w-full aspect-square bg-gray-700 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                      <Music className={isCollapsed ? 'w-4 h-4' : 'w-6 h-6'} />
                    </div>
                  ) : (
                    <img
                      src={item.songs?.[0]?.coverImage || '/api/placeholder/48/48'}
                      alt={item.name}
                      className="w-full aspect-square object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
                    />
                  )}
                </div>

                {!isCollapsed && (
                  <>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{item.name}</h3>
                      <p className="text-sm text-gray-400 truncate">
                        {item?.type}
                        {item.songs?.[0]?.title && ` • ${item.songs?.[0]?.title} songs`}
                        {item.creator?.name && `Playlist • ${item.creator?.name}`}
                      </p>
                    </div>

                    {/* Ellipsis Menu Container */}
                    <div className="relative">
                      <button
                        id={`button-${item._id}`}
                        onClick={(e) => handleEllipsisClick(e, item._id)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-all duration-200 flex-shrink-0"
                      >
                        <EllipsisVertical className="w-4 h-4 text-gray-400 hover:text-white" />
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdown === item._id && (
                        <div
                          id={`dropdown-${item.id}`}
                          className="absolute right-0 top-8 w-48 bg-gray-800 rounded-md shadow-lg border border-gray-700 z-50"
                        >
                          <div className="py-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditClick(item);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors"
                            >
                              <Edit className="w-4 h-4 mr-3" />
                              Edit details
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(item);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
                            >
                              <Trash2 className="w-4 h-4 mr-3" />
                              Delete playlist
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {!isCollapsed && filteredData.length === 0 && searchQuery && (
            <div className="text-center text-gray-400 mt-8">
              <p>No results found for "{searchQuery}"</p>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
                onClick={handleDeleteCancel}
              />
              <div className="relative bg-gray-900 rounded-lg w-full max-w-md mx-4 shadow-2xl border border-gray-700">
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                  <h2 className="text-white text-lg font-semibold">Delete playlist</h2>
                  <button
                    onClick={handleDeleteCancel}
                    className="text-gray-400 hover:text-white transition-colors p-1"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-6">
                  <p className="text-gray-300 mb-4">
                    Are you sure you want to delete <span className="font-semibold text-white">"{selectedPlaylist?.name}"</span>?
                  </p>
                  <p className="text-sm text-gray-400">
                    This action cannot be undone.
                  </p>
                </div>
                <div className="flex justify-end space-x-3 p-6 border-t border-gray-700">
                  <button
                    onClick={handleDeleteCancel}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-full text-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        fixed md:static left-0 top-0 min-h-screen w-80 bg-gray-900 border-r border-gray-800 
        transform transition-transform duration-300 ease-in-out text-white z-50
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 relative">
          <h1 className="text-lg font-semibold">Your Library</h1>
          <div className="relative" ref={createDropdownRef}>
            <button
              onClick={handlePlusClick}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <Plus size={20} />
            </button>

            {/* Create Dropdown */}
            {showCreateDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-10">
                <div className="py-2">
                  <button
                    onClick={handleCreateNewPlaylist}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors flex items-center gap-3 text-white"
                  >
                    <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                      <Plus size={14} className="text-gray-300" />
                    </div>
                    <span className="text-sm">Create a new playlist</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 space-y-8">
          {/* Create Playlist Section */}
          <div className="space-y-4 relative">
            <h2 className="text-white font-semibold text-lg">
              Create your first playlist
            </h2>
            <p className="text-gray-300 text-sm">
              It's easy, we'll help you
            </p>
            <div ref={loginDropdownRef}>
              <button
                onClick={handleCreatePlaylist}
                className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Create playlist
              </button>

              {/* Login Dropdown */}
              {showLoginDropdown && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-10">
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">Please Login</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      You need to be logged in to create a playlist. Please log in to continue.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={handleLogin}
                        className="flex-1 bg-green-500 text-white px-3 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition-colors"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => setShowLoginDropdown(false)}
                        className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-full text-sm font-semibold hover:bg-gray-500 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Browse Podcasts Section */}
          <div className="space-y-4">
            <h2 className="text-white font-semibold text-lg">
              Let's find some podcasts to follow
            </h2>
            <p className="text-gray-300 text-sm">
              We'll keep you updated on new episodes
            </p>
            <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Browse podcasts
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 space-y-4 border-t border-gray-700">
          {/* Footer Links */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-4 text-xs text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Legal</a>
              <a href="#" className="hover:text-white transition-colors">Safety & Privacy Center</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
              <a href="#" className="hover:text-white transition-colors">About Ads</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>

          {/* Language Selector */}
          <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors border border-gray-600 rounded-full px-4 py-2">
            <Globe size={16} />
            English
          </button>
        </div>
      </div>
    </>
  );
};

export default Library;