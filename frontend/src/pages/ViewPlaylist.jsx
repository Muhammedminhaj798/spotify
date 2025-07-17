import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Play, Pause, Download, MoreHorizontal, List, Clock, ArrowLeft } from 'lucide-react';
import { fetchPlaylistById } from '../redux/users/playlistSlice';
import { playSongRequest } from '../redux/users/playSong';

const ViewPlaylist = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { playlistById, loading, error } = useSelector((state) => state.userPlaylist);
    const { currentSong, isPlaying } = useSelector((state) => state.playSong);

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
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
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
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
                <div className="text-center">
                    <p className="text-red-400 mb-4 text-center">Error loading playlist: {error}</p>
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
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
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
            <div className="px-4 sm:px-6 lg:px-8 py-4">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                </button>
            </div>

            {/* Header Section */}
            <div className="bg-gradient-to-b from-red-600 to-red-800 px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
                    {/* Playlist Cover */}
                    <div className="relative flex-shrink-0">
                        <div className="w-48 h-48 sm:w-52 sm:h-52 lg:w-60 lg:h-60 rounded-lg overflow-hidden shadow-2xl">
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
                    <div className="flex-1 text-center sm:text-left">
                        <p className="text-sm font-medium mb-2">
                            {playlistById.isPublic ? 'Public Playlist' : 'Private Playlist'}
                        </p>
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 lg:mb-6 tracking-tight break-words">
                            {playlistById.name || 'Untitled Playlist'}
                        </h1>
                        <p className="text-gray-200 mb-4 text-sm break-words">
                            {playlistById.description || ''}
                        </p>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 sm:gap-2 text-sm">
                            <span className="font-semibold">
                                {playlistById.creator?.name || playlistById.createdBy || 'Unknown'}
                            </span>
                            {playlistById.saves && (
                                <>
                                    <span className="hidden sm:inline">•</span>
                                    <span className="sm:inline block">{playlistById.saves} saves</span>
                                </>
                            )}
                            <span className="hidden sm:inline">•</span>
                            <span className="sm:inline block">
                                {playlistById.songs ? playlistById.songs.length : 0} songs
                                {playlistById.duration && `, ${playlistById.duration}`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls Section */}
            <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
                <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                    <button
                        onClick={handlePlayPlaylist}
                        className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors disabled:opacity-50"
                        disabled={!playlistById.songs || playlistById.songs.length === 0}
                    >
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 text-black fill-black ml-1" />
                    </button>
                    <button className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300 hover:text-white transition-colors">
                        <Download className="w-full h-full" />
                    </button>
                    <button className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300 hover:text-white transition-colors">
                        <MoreHorizontal className="w-full h-full" />
                    </button>
                    <div className="ml-auto">
                        <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                            <span className="text-sm hidden sm:inline">List</span>
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Songs List */}
            <div className="px-4 sm:px-6 lg:px-8 pb-8">
                {playlistById.songs && playlistById.songs.length > 0 ? (
                    <>
                        {/* Desktop Table Header - Hidden on mobile */}
                        <div className="hidden lg:grid grid-cols-12 gap-4 px-4 py-2 border-b border-gray-700 text-gray-400 text-sm mb-4">
                            <div className="col-span-1">#</div>
                            <div className="col-span-5">Title</div>
                            <div className="col-span-3">Album</div>
                            <div className="col-span-1 flex justify-center">
                                <Clock className="w-4 h-4" />
                            </div>
                        </div>

                        {/* Songs List */}
                        <div className="space-y-1 sm:space-y-2">
                            {playlistById.songs.map((track, index) => (
                                <div
                                    key={track.id}
                                    className="group flex items-center gap-3 sm:gap-4 p-2 sm:p-3 lg:p-2 rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    {/* Track Number / Play Button */}
                                    <div className="w-6 flex items-center justify-center flex-shrink-0">
                                        {isCurrentTrackPlaying(track._id) ? (
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
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover flex-shrink-0"
                                    />

                                    {/* Track Info */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`font-medium truncate transition-colors text-sm sm:text-base ${isCurrentTrackPlaying(track._id)
                                            ? 'text-green-400'
                                            : 'text-white group-hover:text-green-400'
                                            }`}>
                                            {track.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-gray-400 truncate">
                                            {track.artist}
                                        </p>
                                        {/* Show album on mobile under artist */}
                                        <p className="text-xs text-gray-500 truncate lg:hidden">
                                            {track.album || track.albumName || 'Unknown Album'}
                                        </p>
                                    </div>

                                    {/* Album - Hidden on mobile, shown on desktop */}
                                    <div className="hidden lg:block flex-1 min-w-0">
                                        <p className="text-gray-300 text-sm truncate">
                                            {track.album || track.albumName || 'Unknown Album'}
                                        </p>
                                    </div>

                                    {/* Duration */}
                                    <span className="text-gray-400 text-xs sm:text-sm w-8 sm:w-12 text-right flex-shrink-0">
                                        {track.duration}
                                    </span>

                                    {/* More Options - Hidden on mobile, shown on tablet+ */}
                                    <button className="hidden sm:block opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all flex-shrink-0">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12 px-4">
                        <p className="text-gray-400 text-lg mb-4">No songs in this playlist</p>
                        <p className="text-gray-500 text-sm">Add some songs to get started!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewPlaylist;