import React, { useEffect } from 'react';
import { MoreHorizontal, Play, Plus, Check } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllArtist } from '../redux/admin/adminArtistSlice';

const Profile = () => {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("user"))
    const { artists } = useSelector((state) => state.adminArtist)
    // Sample artist data


    useEffect(() => {
        dispatch(getAllArtist())
    }, [])

    const popularArtists = artists && artists.length > 0
        ? artists.slice(0, 5).filter(artist => artist && artist.name)
        : [];
    //   const artists = [
    //     {
    //       id: 1,
    //       name: "Artist 1",
    //       image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face"
    //     },
    //     {
    //       id: 2,
    //       name: "Artist 2", 
    //       image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    //     },
    //     {
    //       id: 3,
    //       name: "Artist 3",
    //       image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    //     },
    //     {
    //       id: 4,
    //       name: "Artist 4",
    //       image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
    //     },
    //     {
    //       id: 5,
    //       name: "Artist 5",
    //       image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
    //     }
    //   ];

    // Sample tracks data
    const topTracks = [
        {
            id: 1,
            title: "Darajapoo - Reprised Version",
            artist: "Abhi Sulaimani, Fazil AS",
            image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=60&h=60&fit=crop",
            duration: "2:47",
            isPlaying: false,
            isLiked: false
        },
        {
            id: 2,
            title: "Kaanan Ullilulla",
            artist: "Nafi Nandi",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop",
            duration: "1:19",
            isPlaying: false,
            isLiked: true
        },
        {
            id: 3,
            title: "Voice of Voiceless",
            artist: "Vedan",
            image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=60&h=60&fit=crop",
            duration: "3:06",
            isPlaying: false,
            isLiked: true
        },
        {
            id: 4,
            title: "MAUNA LOA",
            artist: "Vedan, AZWIN",
            image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=60&h=60&fit=crop",
            duration: "2:27",
            isPlaying: false,
            isLiked: true
        }
    ];

    // Sample playlists data
    const playlists = [
        {
            id: 1,
            title: "Playlist 1",
            image: null,
            isDefault: true
        },
        {
            id: 2,
            title: "Playlist 2",
            image: null,
            isDefault: true
        },
        {
            id: 3,
            title: "Samhi Meri Waar",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
            isDefault: false
        },
        {
            id: 4,
            title: "Chal",
            image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
            isDefault: false
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white">
            {/* Header Section */}
            <div className="relative px-4 sm:px-6 lg:px-8 pt-8 pb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
                    {/* Profile Picture */}
                    <div className="relative group">
                        <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-56 lg:h-56 bg-gray-700 rounded-full flex items-center justify-center shadow-2xl">
                            <svg
                                className="w-16 h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-300 mb-2">Profile</p>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-4 sm:mb-6">
                            {user.admin.username}
                        </h1>
                        <div className="flex flex-wrap items-center gap-1 text-sm text-gray-300">
                            <span className="hover:text-white cursor-pointer">4 Public Playlists</span>
                            {/* <span className="mx-2">•</span> */}
                            {/* <span className="hover:text-white cursor-pointer">6 Following</span> */}
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-6 flex items-center gap-4">
                    <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                        <MoreHorizontal className="w-6 h-6 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Top Artists Section */}
            <div className="px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold mb-1">Top artists this month</h2>
                        <p className="text-sm text-gray-400">Only visible to you</p>
                    </div>
                    <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Show all
                    </button>
                </div>

                {/* Artists Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {popularArtists.map((artist) => (
                        <div
                            key={artist.id}
                            className="group cursor-pointer p-3 rounded-lg hover:bg-gray-800 transition-all duration-200"
                        >
                            <div className="relative mb-3">
                                <img
                                    src={artist.image}
                                    alt={artist.name}
                                    className="w-full aspect-square object-cover rounded-full shadow-lg group-hover:shadow-xl transition-shadow"
                                />
                            </div>
                            <h3 className="text-sm font-medium text-white truncate group-hover:text-green-400 transition-colors">
                                {artist.name}
                            </h3>
                            <p className="text-xs text-gray-400 mt-1">Artist</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Tracks Section */}
            <div className="px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold mb-1">Top tracks this month</h2>
                        <p className="text-sm text-gray-400">Only visible to you</p>
                    </div>
                    <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Show all
                    </button>
                </div>

                {/* Tracks List */}
                <div className="space-y-2">
                    {topTracks.map((track, index) => (
                        <div
                            key={track.id}
                            className="group flex items-center gap-4 p-2 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            {/* Track Number / Play Button */}
                            <div className="w-6 flex items-center justify-center">
                                <span className="text-gray-400 group-hover:hidden text-sm">
                                    {index + 1}
                                </span>
                                <button className="hidden group-hover:block text-white hover:text-green-400">
                                    <Play className="w-4 h-4 fill-current" />
                                </button>
                            </div>

                            {/* Album Art */}
                            <img
                                src={track.image}
                                alt={track.title}
                                className="w-10 h-10 rounded object-cover"
                            />

                            {/* Track Info */}
                            <div className="flex-1 min-w-0">
                                <h4 className="text-white font-medium truncate group-hover:text-green-400 transition-colors">
                                    {track.title}
                                </h4>
                                <p className="text-sm text-gray-400 truncate">
                                    {track.artist}
                                </p>
                            </div>

                            {/* Mobile Track Title (Hidden on desktop) */}
                            <div className="hidden sm:block flex-1 min-w-0">
                                <p className="text-gray-300 text-sm truncate">
                                    {track.title}
                                </p>
                            </div>

                            {/* Like Button */}
                            <button className="text-gray-400 hover:text-white transition-colors">
                                {track.isLiked ? (
                                    <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                    <Plus className="w-4 h-4" />
                                )}
                            </button>

                            {/* Duration */}
                            <span className="text-gray-400 text-sm w-12 text-right">
                                {track.duration}
                            </span>

                            {/* More Options */}
                            <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Public Playlists Section */}
            <div className="px-4 sm:px-6 lg:px-8 py-6">
                <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold">Public Playlists</h2>
                </div>

                {/* Playlists Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {playlists.map((playlist) => (
                        <div
                            key={playlist.id}
                            className="group cursor-pointer p-3 rounded-lg hover:bg-gray-800 transition-all duration-200"
                        >
                            <div className="relative mb-3">
                                {playlist.isDefault ? (
                                    <div className="w-full aspect-square bg-gray-700 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                                        <svg
                                            className="w-12 h-12 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                                            />
                                        </svg>
                                    </div>
                                ) : (
                                    <img
                                        src={playlist.image}
                                        alt={playlist.title}
                                        className="w-full aspect-square object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow"
                                    />
                                )}

                                {/* Play Button Overlay */}
                                <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 hover:bg-green-400 hover:scale-105">
                                    <Play className="w-5 h-5 fill-black text-black ml-0.5" />
                                </button>
                            </div>

                            <h3 className="text-sm font-medium text-white truncate group-hover:text-green-400 transition-colors">
                                {playlist.title}
                            </h3>
                            <p className="text-xs text-gray-400 mt-1">By Minhaj</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;