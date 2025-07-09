import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Play, Download, MoreHorizontal, List, Clock, ArrowLeft } from 'lucide-react';
import { fetchPlaylistById } from '../redux/users/playlistSlice';
import { playSongRequest } from '../redux/users/playSong';


const ViewPlaylist = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { playlistById, loading, error } = useSelector((state) => state.userPlaylist);
    const { currentSong, isPlaying } = useSelector((state) => state.playSong) // Add this to get current playing song

    const [hoveredSong, setHoveredSong] = useState(null);
    const [currentPlayingSong, setCurrentPlayingSong] = useState(null);

    useEffect(() => {
        if (id) {
            dispatch(fetchPlaylistById(id));
        }
    }, [id, dispatch]);
    const isCurrentTrackPlaying = (trackId) => {
        return currentSong && currentSong._id === trackId && isPlaying;
    };
    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading playlist...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-400 mb-4">Error loading playlist: {error}</p>
                    <button
                        onClick={() => window.history.back()}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // No playlist data
    if (!playlistById) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-400">No playlist found</p>
                </div>
            </div>
        );
    }

    const handlePlaySong = (song) => {
        setCurrentPlayingSong(currentPlayingSong === song.id ? null : song.id);
        // Add your play logic here
    };

    const handlePlayPause = (trackId) => {
        dispatch(playSongRequest(trackId));
    };

    const handlePlayPlaylist = () => {
        if (playlistById.songs && playlistById.songs.length > 0) {
            handlePlaySong(playlistById.songs[0]);
        }
    };

    // Create playlist cover from song covers or use default
    const getPlaylistCover = () => {
        if (playlistById.coverImage) {
            return playlistById.coverImage;
        }

        if (playlistById.songs && playlistById.songs.length > 0) {
            const songCovers = playlistById.songs
                .filter(song => song.coverImage)
                .slice(0, 4)
                .map(song => song.coverImage);

            if (songCovers.length === 1) {
                return songCovers[0];
            }
            return songCovers;
        }

        return ["/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150", "/api/placeholder/150/150"];
    };

    const playlistCover = getPlaylistCover();
    const isGridCover = Array.isArray(playlistCover);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Back Button */}
            <div className="px-8 py-4">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                </button>
            </div>

            {/* Header Section */}
            <div className="bg-gradient-to-b from-red-600 to-red-800 px-8 py-12">
                <div className="flex items-end gap-6">
                    {/* Playlist Cover */}
                    <div className="relative">
                        <div className="w-60 h-60 rounded-lg overflow-hidden shadow-2xl">
                            {isGridCover ? (
                                <div className="grid grid-cols-2 gap-1 h-full">
                                    {playlistCover.map((image, index) => (
                                        <div key={index} className="bg-gray-800 aspect-square">
                                            <img
                                                src={image}
                                                alt={`Cover ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <img
                                    src={playlistCover}
                                    alt="Playlist cover"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                    </div>

                    {/* Playlist Info */}
                    <div className="flex-1">
                        <p className="text-sm font-medium mb-2">
                            {playlistById.isPublic ? 'Public Playlist' : 'Private Playlist'}
                        </p>
                        <h1 className="text-6xl font-bold mb-6 tracking-tight">
                            {playlistById.name || 'Untitled Playlist'}
                        </h1>
                        <p className="text-gray-200 mb-4 text-sm">
                            {playlistById.description || ''}
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="font-semibold">
                                {playlistById.creator || playlistById.createdBy || 'Unknown'}
                            </span>
                            {playlistById.saves && (
                                <>
                                    <span>•</span>
                                    <span>{playlistById.saves} saves</span>
                                </>
                            )}
                            <span>•</span>
                            <span>
                                {playlistById.songs ? playlistById.songs.length : 0} songs
                                {playlistById.duration && `, ${playlistById.duration}`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls Section */}
            <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm px-8 py-6">
                <div className="flex items-center gap-8">
                    <button
                        onClick={handlePlayPlaylist}
                        className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors disabled:opacity-50"
                        disabled={!playlistById.songs || playlistById.songs.length === 0}
                    >
                        <Play className="w-6 h-6 text-black fill-black ml-1" />
                    </button>
                    <button className="w-8 h-8 text-gray-300 hover:text-white transition-colors">
                        <Download className="w-full h-full" />
                    </button>
                    <button className="w-8 h-8 text-gray-300 hover:text-white transition-colors">
                        <MoreHorizontal className="w-full h-full" />
                    </button>
                    <div className="ml-auto">
                        <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                            <span className="text-sm">List</span>
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Songs List */}
            <div className="px-8 pb-8">
                {playlistById.songs && playlistById.songs.length > 0 ? (
                    <>
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-gray-700 text-gray-400 text-sm mb-4">
                            <div className="col-span-1">#</div>
                            <div className="col-span-5">Title</div>
                            <div className="col-span-3">Album</div>
                            <div className="col-span-1 flex justify-center">
                                <Clock className="w-4 h-4" />
                            </div>
                        </div>

                        {/* Songs */}
                        {/* <div className="space-y-1">
                            {playlistById.songs.map((song, index) => (
                                <div 
                                    key={song.id || index}
                                    className={`grid grid-cols-12 gap-4 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors group cursor-pointer ${
                                        hoveredSong === song.id ? 'bg-gray-800' : ''
                                    } ${currentPlayingSong === song.id ? 'bg-gray-800' : ''}`}
                                    onMouseEnter={() => setHoveredSong(song.id)}
                                    onMouseLeave={() => setHoveredSong(null)}
                                    onClick={() => handlePlaySong(song)}
                                >
                                    {/* Track Number / Play Button */}
                        {/* <div className="col-span-1 flex items-center text-gray-400">
                                        {hoveredSong === song.id || currentPlayingSong === song.id ? (
                                            <Play className={`w-4 h-4 ${currentPlayingSong === song.id ? 'text-green-500' : 'text-white'}`} />
                                        ) : (
                                            <span className="text-sm">{index + 1}</span>
                                        )}
                                    </div> */}

                        {/* Title and Artist */}
                        {/* <div className="col-span-5 flex items-center gap-3">
                                        <img 
                                            src={song.coverImage || song.albumArt || "/api/placeholder/40/40"} 
                                            alt={song.title || song.name}
                                            className="w-10 h-10 rounded object-cover"
                                        />
                                        <div>
                                            <div className={`font-medium text-sm ${currentPlayingSong === song.id ? 'text-green-500' : 'text-white'}`}>
                                                {song.title || song.name || 'Unknown Title'}
                                            </div>
                                            <div className="text-gray-400 text-xs">
                                                {song.artists || song.artist || 'Unknown Artist'}
                                            </div>
                                        </div>
                                    </div> */}

                        {/* Album */}
                        {/* <div className="col-span-3 flex items-center">
                                        <span className="text-gray-400 text-sm truncate">
                                            {song.album || song.albumName || 'Unknown Album'}
                                        </span>
                                    </div> */}

                        {/* Duration */}
                        {/* <div className="col-span-1 flex items-center justify-center">
                                        <span className="text-gray-400 text-sm">
                                            {song.duration || '0:00'}
                                        </span>
                                    </div>
                                </div>
                            ))} */}
                        {/* </div> */}


                        <div className="space-y-2">
                            {playlistById.songs.map((track, index) => (
                                <div
                                    key={track.id}
                                    className="group flex items-center gap-4 p-2 rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    {/* Track Number / Play Button */}
                                    <div className="w-6 flex items-center justify-center">
                                        {isCurrentTrackPlaying(track._id) ? (
                                            // Show pause button when song is playing
                                            <button
                                                className="text-green-400 hover:text-green-300"
                                                onClick={() => handlePlayPause(track._id)}
                                            >
                                                <Pause className="w-4 h-4 fill-current" />
                                            </button>
                                        ) : (
                                            <>
                                                <span className="text-gray-400 group-hover:hidden text-sm">
                                                    {index + 1}
                                                </span>
                                                <button
                                                    className="hidden group-hover:block text-white hover:text-green-400"
                                                    onClick={() => handlePlayPause(track._id)}
                                                >
                                                    <Play className="w-4 h-4 fill-current" />
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    {/* Album Art */}
                                    <img
                                        src={track.coverImage}
                                        alt={track.title}
                                        className="w-10 h-10 rounded object-cover"
                                    />

                                    {/* Track Info */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`font-medium truncate transition-colors ${isCurrentTrackPlaying(track._id)
                                            ? 'text-green-400'
                                            : 'text-white group-hover:text-green-400'
                                            }`}>
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
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg mb-4">No songs in this playlist</p>
                        <p className="text-gray-500 text-sm">Add some songs to get started!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewPlaylist;