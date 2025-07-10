import React, { useState, useRef, useEffect } from 'react';
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume2,
    VolumeX,
    Repeat,
    Shuffle,
    Heart,
    Maximize2,
    MoreHorizontal,
    Plus,
    Check,
    Music,
    X,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongs } from '../redux/admin/adminSongSlice';
import { addSongPlaylist, removeSongPlaylist } from '../redux/users/playlistSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Add axios for API calls

const SpotifyAudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isMuted, setIsMuted] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [shuffledPlaylist, setShuffledPlaylist] = useState([]);
    const [showPlaylistDropdown, setShowPlaylistDropdown] = useState(false);
    const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [playlists, setPlaylists] = useState([]);
    const [songPlaylistStatus, setSongPlaylistStatus] = useState({});

    const dispatch = useDispatch();
    const audioRef = useRef(null);
    const progressBarRef = useRef(null);
    const volumeBarRef = useRef(null);
    const playlistDropdownRef = useRef(null);
    const navigate = useNavigate();
    const { songs = [] } = useSelector((state) => state.adminSongs || {});
    const { id } = useSelector((state) => state.playSong || {});
    const { playlists: userPlaylists = [] } = useSelector((state) => state.userPlaylist || {});
    const [isAuth] = useState(true);

    // Fetch all songs
    useEffect(() => {
        dispatch(getAllSongs());
    }, [dispatch]);

    // Fetch song playlist status from backend
    useEffect(() => {
        const fetchSongPlaylistStatus = async () => {
            if (!id || !userPlaylists.length) return;

            try {
                const response = await axios.get(`/api/songs/${id}/playlists`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Adjust based on your auth setup
                });
                const playlistsWithSong = response.data.playlists || [];
                const songStatus = {};
                userPlaylists.forEach((playlist) => {
                    songStatus[playlist._id] = playlistsWithSong.some((p) => p._id === playlist._id);
                });
                setSongPlaylistStatus(songStatus);
            } catch (error) {
                console.error('Error fetching song playlist status:', error);
            }
        };

        fetchSongPlaylistStatus();
    }, [id, userPlaylists]);

    // Update playlists and shuffle logic
    useEffect(() => {
        if (userPlaylists && userPlaylists.length > 0) {
            setPlaylists(userPlaylists);
        }
    }, [userPlaylists]);

    useEffect(() => {
        if (songs && songs.length > 0) {
            if (isShuffle) {
                const shuffled = [...songs].sort(() => Math.random() - 0.5);
                setShuffledPlaylist(shuffled);
            } else {
                setShuffledPlaylist(songs);
            }
        }
    }, [songs, isShuffle]);

    // Handle auto-play
    useEffect(() => {
        const handleAutoPlay = (event) => {
            const { songId } = event.detail;
            if (songId && songId === id) {
                setTimeout(() => {
                    const audio = audioRef.current;
                    if (audio && audio.src) {
                        audio.play().then(() => {
                            setIsPlaying(true);
                        }).catch((error) => {
                            console.error('Error auto-playing audio:', error);
                        });
                    }
                }, 200);
            }
        };

        window.addEventListener('autoPlay', handleAutoPlay);
        return () => {
            window.removeEventListener('autoPlay', handleAutoPlay);
        };
    }, [id]);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (playlistDropdownRef.current && !playlistDropdownRef.current.contains(event.target)) {
                setShowPlaylistDropdown(false);
                setShowCreatePlaylist(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Update current song index
    useEffect(() => {
        if (id && songs && songs.length > 0) {
            const songIndex = songs.findIndex((song) => song._id === id);
            if (songIndex !== -1) {
                setCurrentSongIndex(songIndex);
            }
        }
    }, [id, songs]);

    const getCurrentTrack = () => {
        if (!shuffledPlaylist || shuffledPlaylist.length === 0) {
            return {
                title: 'No song selected',
                artist: 'Unknown Artist',
                album: 'Unknown Album',
                artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
                src: '',
            };
        }

        if (id && songs && songs.length > 0) {
            const playedSong = songs.find((song) => song._id === id);
            if (playedSong) {
                return {
                    title: playedSong.title || playedSong.name || 'Unknown Title',
                    artist: playedSong.artist || playedSong.artistName || 'Unknown Artist',
                    album: playedSong.album || playedSong.albumName || 'Unknown Album',
                    artwork:
                        playedSong.artwork ||
                        playedSong.coverImage ||
                        playedSong.image ||
                        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
                    src: playedSong.audioUrl || playedSong.src || playedSong.url || '',
                };
            }
        }

        const song = shuffledPlaylist[currentSongIndex];
        if (!song) {
            return {
                title: 'No song selected',
                artist: 'Unknown Artist',
                album: 'Unknown Album',
                artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
                src: '',
            };
        }

        return {
            title: song.title || song.name || 'Unknown Title',
            artist: song.artist || song.artistName || 'Unknown Artist',
            album: song.album || song.albumName || 'Unknown Album',
            artwork:
                song.artwork ||
                song.coverImage ||
                song.image ||
                'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
            src: song.audioUrl || song.src || song.url || '',
        };
    };

    const currentTrack = getCurrentTrack();

    useEffect(() => {
        const audio = audioRef.current;
        if (audio && currentTrack.src) {
            audio.load();
            audio.volume = isMuted ? 0 : volume;

            const updateTime = () => setCurrentTime(audio.currentTime);
            const updateDuration = () => setDuration(audio.duration);
            const handleLoadStart = () => {
                setCurrentTime(0);
                setDuration(0);
            };

            audio.addEventListener('timeupdate', updateTime);
            audio.addEventListener('loadedmetadata', updateDuration);
            audio.addEventListener('loadstart', handleLoadStart);
            audio.addEventListener('ended', handleTrackEnd);

            return () => {
                audio.removeEventListener('timeupdate', updateTime);
                audio.removeEventListener('loadedmetadata', updateDuration);
                audio.removeEventListener('loadstart', handleLoadStart);
                audio.removeEventListener('ended', handleTrackEnd);
            };
        }
    }, [currentTrack.src, volume, isMuted]);

    const handleTrackEnd = () => {
        if (isRepeat) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch((error) => {
                console.error('Error repeating audio:', error);
            });
        } else {
            handleNextSong();
        }
    };

    const togglePlayPause = () => {
        if (!currentTrack.src) return;

        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().catch((error) => {
                console.error('Error playing audio:', error);
                setIsPlaying(false);
            });
            setIsPlaying(true);
        }
    };

    const handlePreviousSong = () => {
        if (!shuffledPlaylist || shuffledPlaylist.length === 0) return;

        let newIndex;
        if (currentSongIndex === 0) {
            newIndex = shuffledPlaylist.length - 1;
        } else {
            newIndex = currentSongIndex - 1;
        }

        setCurrentSongIndex(newIndex);
        setCurrentTime(0);
        setIsPlaying(false);
    };

    const handleNextSong = () => {
        if (!shuffledPlaylist || shuffledPlaylist.length === 0) return;

        let newIndex;
        if (currentSongIndex === shuffledPlaylist.length - 1) {
            newIndex = 0;
        } else {
            newIndex = currentSongIndex + 1;
        }

        setCurrentSongIndex(newIndex);
        setCurrentTime(0);
        setIsPlaying(false);
    };

    const handleProgressChange = (e) => {
        if (!audioRef.current || !duration) return;

        const rect = progressBarRef.current.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newTime = Math.max(0, Math.min(duration, percent * duration));
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleVolumeChange = (e) => {
        const rect = volumeBarRef.current.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newVolume = Math.max(0, Math.min(1, percent));
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const toggleShuffle = () => {
        setIsShuffle(!isShuffle);
        setCurrentSongIndex(0);
    };

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleLikeClick = () => {
        setShowPlaylistDropdown(!showPlaylistDropdown);
    };

    const handleAddToPlaylist = async (playlistId) => {
        const currentSongId = id;
        if (!currentSongId) {
            console.error('No song selected');
            return;
        }

        const isCurrentlyInPlaylist = songPlaylistStatus[playlistId] || false;

        try {
            if (isCurrentlyInPlaylist) {
                // Remove song from playlist
                await dispatch(removeSongPlaylist({ playlistId, songId: currentSongId })).unwrap();
            } else {
                // Add song to playlist
                await dispatch(addSongPlaylist({ playlistId, songId: currentSongId })).unwrap();
            }

            // Update local state
            setSongPlaylistStatus((prev) => ({
                ...prev,
                [playlistId]: !isCurrentlyInPlaylist,
            }));
        } catch (error) {
            console.error('Error updating playlist:', error);
            // Revert state on failure
            setSongPlaylistStatus((prev) => ({
                ...prev,
                [playlistId]: isCurrentlyInPlaylist,
            }));
        }
    };

    const handleCreatePlaylist = async () => {
        if (newPlaylistName.trim()) {
            try {
                const newPlaylist = {
                    name: newPlaylistName.trim(),
                    songs: [id],
                };

                // Dispatch action to create playlist in backend
                // Assuming you have a createPlaylist action
                // await dispatch(createPlaylist(newPlaylist)).unwrap();

                // Update local state
                setPlaylists((prev) => [...prev, { ...newPlaylist, _id: Date.now(), songCount: 1 }]);
                setSongPlaylistStatus((prev) => ({
                    ...prev,
                    [Date.now()]: true,
                }));
                setNewPlaylistName('');
                setShowCreatePlaylist(false);
            } catch (error) {
                console.error('Error creating playlist:', error);
            }
        }
    };

    const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
    const volumePercentage = isMuted ? 0 : volume * 100;

    if (!isAuth) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 px-4 py-3 z-50">
            <audio
                ref={audioRef}
                src={currentTrack.src}
                preload="metadata"
                onError={(e) => console.error('Audio error:', e)}
            />

            <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
                {/* Left - Track Info */}
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                        <img
                            src={currentTrack.artwork}
                            alt={currentTrack.title}
                            className="w-14 h-14 rounded-md object-cover"
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop';
                            }}
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h4 className="text-white text-sm font-medium truncate">{currentTrack.title}</h4>
                        <p className="text-gray-400 text-xs truncate hover:text-white cursor-pointer">
                            {currentTrack.artist}
                        </p>
                    </div>
                    <div className="relative" ref={playlistDropdownRef}>
                        <button
                            onClick={handleLikeClick}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <Heart className="w-4 h-4" />
                        </button>

                        {/* Playlist Dropdown */}
                        {showPlaylistDropdown && (
                            <div className="absolute bottom-full left-0 mb-2 w-80 bg-gray-800 rounded-lg shadow-2xl border border-gray-700 z-50">
                                <div className="p-3">
                                    <h3 className="text-white text-sm font-medium mb-3">Add to playlist</h3>

                                    {/* Create new playlist button */}
                                    <button
                                        onClick={() => setShowCreatePlaylist(true)}
                                        className="w-full flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md transition-colors"
                                    >
                                        <div className="w-8 h-8 bg-gray-600 rounded-sm flex items-center justify-center">
                                            <Plus className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-white text-sm">Create playlist</span>
                                    </button>

                                    {/* Create playlist input */}
                                    {showCreatePlaylist && (
                                        <div className="mt-2 p-2 bg-gray-700 rounded-md">
                                            <input
                                                type="text"
                                                value={newPlaylistName}
                                                onChange={(e) => setNewPlaylistName(e.target.value)}
                                                placeholder="Playlist name"
                                                className="w-full bg-gray-600 text-white text-sm px-3 py-2 rounded border-none outline-none"
                                                onKeyPress={(e) => e.key === 'Enter' && handleCreatePlaylist()}
                                                autoFocus
                                            />
                                            <div className="flex justify-end space-x-2 mt-2">
                                                <button
                                                    onClick={() => setShowCreatePlaylist(false)}
                                                    className="text-gray-400 hover:text-white text-xs px-2 py-1"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleCreatePlaylist}
                                                    className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded"
                                                >
                                                    Create
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Playlist list */}
                                    <div className="mt-2 max-h-60 overflow-y-auto">
                                        {playlists.map((playlist) => (
                                            <button
                                                key={playlist._id || playlist.id}
                                                onClick={() => handleAddToPlaylist(playlist._id || playlist.id)}
                                                className="w-full flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md transition-colors"
                                            >
                                                <div className="w-8 h-8 bg-gray-600 rounded-sm flex items-center justify-center">
                                                    <Music className="w-4 h-4 text-white" />
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <div className="text-white text-sm">{playlist.name}</div>
                                                    <div className="text-gray-400 text-xs">
                                                        {playlist.songCount || playlist.songs?.length || 0} songs
                                                    </div>
                                                </div>
                                                {songPlaylistStatus[playlist._id || playlist.id] && (
                                                    <Check className="w-4 h-4 text-green-500" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Center - Player Controls */}
                <div className="flex flex-col items-center space-y-2 flex-1 max-w-2xl">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleShuffle}
                            className={`transition-colors ${isShuffle ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Shuffle className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handlePreviousSong}
                            className="text-gray-400 hover:text-white transition-colors"
                            disabled={!shuffledPlaylist || shuffledPlaylist.length === 0}
                        >
                            <SkipBack className="w-5 h-5" />
                        </button>
                        <button
                            onClick={togglePlayPause}
                            className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform disabled:opacity-50"
                            disabled={!currentTrack.src}
                        >
                            {isPlaying ? (
                                <Pause className="w-5 h-5" fill="currentColor" />
                            ) : (
                                <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                            )}
                        </button>
                        <button
                            onClick={handleNextSong}
                            className="text-gray-400 hover:text-white transition-colors"
                            disabled={!shuffledPlaylist || shuffledPlaylist.length === 0}
                        >
                            <SkipForward className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setIsRepeat(!isRepeat)}
                            className={`transition-colors ${isRepeat ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Repeat className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex items-center space-x-3 w-full">
                        <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
                        <div
                            ref={progressBarRef}
                            onClick={handleProgressChange}
                            className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer group"
                        >
                            <div
                                className="h-full bg-white rounded-full relative group-hover:bg-green-500 transition-colors"
                                style={{ width: `${progressPercentage}%` }}
                            >
                                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        </div>
                        <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Right - Volume Controls */}
                <div className="flex items-center space-x-3 flex-1 justify-end">
                    <button
                        onClick={() => navigate('/SongFullScreen')}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <Maximize2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={toggleMute}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <div
                        ref={volumeBarRef}
                        onClick={handleVolumeChange}
                        className="w-24 h-1 bg-gray-600 rounded-full cursor-pointer group"
                    >
                        <div
                            className="h-full bg-white rounded-full relative group-hover:bg-green-500 transition-colors"
                            style={{ width: `${volumePercentage}%` }}
                        >
                            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpotifyAudioPlayer;