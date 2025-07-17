import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Play, Pause, Heart, MoreHorizontal, Clock, Download, Share } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getArtistSongById } from '../redux/users/ArtistSlice';
// import { getArtistSongById } from '../redux/slices/artistSlice'; // Adjust path as needed

const ArtistSongs = () => {
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [likedSongs, setLikedSongs] = useState(new Set());
    const [isFollowing, setIsFollowing] = useState(false);
    const { id } = useParams();
    
    const dispatch = useDispatch();
    const { loading, error, artistData } = useSelector((state) => state.artist);
    console.log("error : ", artistData);

    useEffect(() => {
        if (id) {
            dispatch(getArtistSongById(id));
        }
    }, [dispatch, id]);

    const togglePlay = (songId) => {
        setCurrentlyPlaying(currentlyPlaying === songId ? null : songId);
    };

    const toggleLike = (songId) => {
        const newLikedSongs = new Set(likedSongs);
        if (newLikedSongs.has(songId)) {
            newLikedSongs.delete(songId);
        } else {
            newLikedSongs.add(songId);
        }
        setLikedSongs(newLikedSongs);
    };

    const formatNumber = (num) => {
        if (!num) return "0";
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Loading state
    if (loading) {
        return (
            <div className="bg-black min-h-screen text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
                    <p className="mt-4 text-gray-400">Loading artist data...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="bg-black min-h-screen text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-xl mb-4">Error loading artist data</p>
                    <p className="text-gray-400">{error}</p>
                    <button 
                        onClick={() => dispatch(getArtistSongById(id))}
                        className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-400 rounded-full transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // No data state
    if (!artistData) {
        return (
            <div className="bg-black min-h-screen text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-400 text-xl">No artist data found</p>
                </div>
            </div>
        );
    }

    const { artist } = artistData;
    const {songs} = artist
    console.log("sogn",artist);

    return (
        <div className="bg-black min-h-screen text-white">
            {/* Header Section */}
            <div className="relative bg-gradient-to-b from-purple-900 to-gray-900 px-8 pt-16 pb-8">
                <div className="flex items-end space-x-6">
                    <div className="relative">
                        <img 
                            src={artist?.image || artist?.profilePicture || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"} 
                            alt={artist?.name || "Artist"}
                            className="w-56 h-56 rounded-full shadow-2xl object-cover"
                        />
                        {artist?.verified && (
                            <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-2">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <div className="pb-4">
                        <p className="text-sm font-medium text-gray-300">
                            {artist?.verified ? "Verified Artist" : "Artist"}
                        </p>
                        <h1 className="text-8xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            {artist?.name || "Unknown Artist"}
                        </h1>
                        <p className="text-gray-300 text-lg">
                            {formatNumber(artist?.monthlyListeners)} monthly listeners
                        </p>
                        {artist?.followers && (
                            <p className="text-gray-400 text-base">
                                {formatNumber(artist.followers)} followers
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-8 py-6 bg-gradient-to-b from-gray-900 to-black">
                <div className="flex items-center space-x-6">
                    <button className="bg-green-500 hover:bg-green-400 text-black p-4 rounded-full transition-all duration-200 hover:scale-105">
                        <Play className="w-6 h-6 ml-1" fill="currentColor" />
                    </button>
                    <button 
                        onClick={() => setIsFollowing(!isFollowing)}
                        className={`px-8 py-2 rounded-full border-2 transition-all duration-200 ${
                            isFollowing 
                                ? 'border-gray-400 text-gray-400 hover:border-white hover:text-white' 
                                : 'border-white text-white hover:scale-105'
                        }`}
                    >
                        {isFollowing ? 'Following' : 'Follow'}
                    </button>
                    <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                        <MoreHorizontal className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Songs Section */}
            <div className="px-8 pb-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">Popular</h2>
                    
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm text-gray-400 border-b border-gray-800">
                        <div className="col-span-1">#</div>
                        <div className="col-span-5">Title</div>
                        <div className="col-span-3">Album</div>
                        <div className="col-span-2">Date added</div>
                        <div className="col-span-1 flex justify-center">
                            <Clock className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* Songs List */}
                <div className="space-y-1">
                    {songs && songs.length > 0 ? (
                        songs.map((song, index) => (
                            <div 
                                key={song.id || song._id}
                                className="grid grid-cols-12 gap-4 px-4 py-3 rounded-lg hover:bg-gray-800 group transition-all duration-200"
                            >
                                {/* Track Number / Play Button */}
                                <div className="col-span-1 flex items-center">
                                    <div className="relative">
                                        <span className="group-hover:hidden text-gray-400 font-medium">
                                            {index + 1}
                                        </span>
                                        <button 
                                            onClick={() => togglePlay(song.id || song._id)}
                                            className="hidden group-hover:block hover:scale-110 transition-transform"
                                        >
                                            {currentlyPlaying === (song.id || song._id) ? (
                                                <Pause className="w-4 h-4 text-green-500" fill="currentColor" />
                                            ) : (
                                                <Play className="w-4 h-4 text-white" fill="currentColor" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="col-span-5 flex items-center">
                                    <div>
                                        <p className={`font-medium ${currentlyPlaying === (song.id || song._id) ? 'text-green-500' : 'text-white'}`}>
                                            {song.title || song.name || "Unknown Title"}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {formatNumber(song.plays || song.playCount || 0)} plays
                                        </p>
                                    </div>
                                </div>

                                {/* Album */}
                                <div className="col-span-3 flex items-center">
                                    <p className="text-gray-400 hover:text-white cursor-pointer hover:underline">
                                        {song.album || song.albumName || "Unknown Album"}
                                    </p>
                                </div>

                                {/* Date Added */}
                                <div className="col-span-2 flex items-center">
                                    <p className="text-gray-400">
                                        {song.dateAdded || song.createdAt ? 
                                            new Date(song.dateAdded || song.createdAt).toLocaleDateString() : 
                                            "Unknown"
                                        }
                                    </p>
                                </div>

                                {/* Duration & Actions */}
                                <div className="col-span-1 flex items-center justify-center space-x-2">
                                    <button 
                                        onClick={() => toggleLike(song.id || song._id)}
                                        className={`p-1 rounded-full transition-all ${
                                            likedSongs.has(song.id || song._id) ? 'text-green-500' : 'text-gray-400 hover:text-white opacity-0 group-hover:opacity-100'
                                        }`}
                                    >
                                        <Heart className="w-4 h-4" fill={likedSongs.has(song.id || song._id) ? 'currentColor' : 'none'} />
                                    </button>
                                    <span className="text-gray-400 text-sm">
                                        {song.duration || "0:00"}
                                    </span>
                                    <button className="p-1 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-400 text-lg">No songs found for this artist</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="px-8 py-6 border-t border-gray-800">
                <div className="flex space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors">
                        <Share className="w-4 h-4" />
                        <span>Share</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArtistSongs;