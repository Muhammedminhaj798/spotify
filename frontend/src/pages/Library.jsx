import React, { useState } from 'react';
import { Search, Plus, ArrowUpDown, Heart, Music, User } from 'lucide-react';

const Library = () => {
  const [activeTab, setActiveTab] = useState('Playlists');
  const [searchQuery, setSearchQuery] = useState('');

  const playlists = [
    {
      id: 1,
      name: 'Liked Songs',
      type: 'Playlist',
      songs: 24,
      icon: <Heart className="w-6 h-6 text-white" fill="white" />,
      bgColor: 'bg-gradient-to-br from-purple-500 to-blue-600'
    },
    {
      id: 2,
      name: 'Feeeelee💕',
      type: 'Playlist',
      creator: 'Amiralvillan',
      icon: <Music className="w-6 h-6 text-gray-400" />,
      bgColor: 'bg-gray-700'
    },
    {
      id: 3,
      name: '.....',
      type: 'Playlist',
      creator: 'Minhaj',
      icon: <Music className="w-6 h-6 text-gray-400" />,
      bgColor: 'bg-gray-700'
    },
    {
      id: 4,
      name: 'Romantic Malayalam',
      type: 'Playlist',
      creator: 'Spotify',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop&crop=center',
      bgColor: 'bg-gray-700'
    },
    {
      id: 5,
      name: 'awsdfghj',
      type: 'Playlist',
      creator: 'Minhaj',
      icon: <Music className="w-6 h-6 text-gray-400" />,
      bgColor: 'bg-gray-700'
    }
  ];

  const artists = [
    {
      id: 1,
      name: 'Kalabhavan Mani',
      type: 'Artist',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=center',
      bgColor: 'bg-gray-700'
    },
    {
      id: 2,
      name: 'Vineeth Sreenivasan',
      type: 'Artist',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=center',
      bgColor: 'bg-gray-700'
    },
    {
      id: 3,
      name: 'Kailash Kher',
      type: 'Artist',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&crop=center',
      bgColor: 'bg-gray-700'
    }
  ];

  const currentData = activeTab === 'Playlists' ? playlists : artists;

  const filteredData = currentData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" fixed left-0 min-h-screen w-80 bg-gray-900 border-r border-gray-800 
        transform transition-transform duration-300 ease-in-out text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-2">
        <h1 className="text-2xl font-bold">Your Library</h1>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Plus className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <ArrowUpDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex space-x-2 px-4 pb-4">
        {['Playlists', 'Artists'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab
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

      {/* Content List */}
      <div className="px-4 space-y-2">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-md transition-colors cursor-pointer"
          >
            {/* Icon/Image */}
            <div className={`w-12 h-12 rounded-md flex items-center justify-center ${item.bgColor} flex-shrink-0`}>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                item.icon
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium truncate">{item.name}</h3>
              <p className="text-sm text-gray-400 truncate">
                {item.type}
                {item.songs && ` • ${item.songs} songs`}
                {item.creator && ` • ${item.creator}`}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && searchQuery && (
        <div className="text-center text-gray-400 mt-8">
          <p>No results found for "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};

export default Library;