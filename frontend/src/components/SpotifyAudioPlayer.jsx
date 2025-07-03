// import React, { useState, useRef, useEffect } from 'react';
// import {
//     Play,
//     Pause,
//     SkipBack,
//     SkipForward,
//     Volume2,
//     VolumeX,
//     Repeat,
//     Shuffle,
//     Heart,
//     Maximize2,
//     MoreHorizontal
// } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllSongs } from '../redux/admin/adminSongSlice';
// import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';

// const SpotifyAudioPlayer = () => {
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [duration, setDuration] = useState(0);
//     const [volume, setVolume] = useState(0.7);
//     const [isMuted, setIsMuted] = useState(false);
//     const [isRepeat, setIsRepeat] = useState(false);
//     const [isShuffle, setIsShuffle] = useState(false);
//     const [isLiked, setIsLiked] = useState(false);
//     const [currentSongIndex, setCurrentSongIndex] = useState(0);
//     const [shuffledPlaylist, setShuffledPlaylist] = useState([]);
//     const isAuth = localStorage.getItem('isAuth')
//     const audioRef = useRef(null);
//     const progressBarRef = useRef(null);
//     const volumeBarRef = useRef(null);

//     const dispatch = useDispatch();
//     const { songs } = useSelector((state) => state.adminSongs);
//     const { id } = useSelector((state) => state.playSong)
//     console.log("id is :", id);

//     useEffect(() => {
//         dispatch(getAllSongs());

//     }, [dispatch]);

//     // Create shuffled playlist when shuffle is enabled or songs change
//     useEffect(() => {
//         if (songs && songs.length > 0) {
//             if (isShuffle) {
//                 const shuffled = [...songs].sort(() => Math.random() - 0.5);
//                 setShuffledPlaylist(shuffled);
//             } else {
//                 setShuffledPlaylist(songs);
//             }
//         }
//     }, [songs, isShuffle]);

//     // Get current track from playlist
//     const getCurrentTrack = () => {
//         if (!shuffledPlaylist || shuffledPlaylist.length === 0) {
//             return {
//                 title: "No song selected",
//                 artist: "Unknown Artist",
//                 album: "Unknown Album",
//                 artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
//                 src: ""
//             };
//         }
//         if (id) {
//             const playedSong = shuffledPlaylist.find((song) => {
//                 return song.id === id
//             })
//             return {
//                 title: playedSong.title || playedSong.name || "Unknown Title",
//                 artist: playedSong.artist || playedSong.artistName || "Unknown Artist",
//                 album: playedSong.album || playedSong.albumName || "Unknown Album",
//                 artwork: playedSong.artwork || playedSong.coverImage || playedSong.image || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
//                 src: playedSong.audioUrl || playedSong.src || playedSong.url || ""
//             };
//         }
//     }
//     const song = shuffledPlaylist[currentSongIndex];
//     return {
//         title: song.title || song.name || "Unknown Title",
//         artist: song.artist || song.artistName || "Unknown Artist",
//         album: song.album || song.albumName || "Unknown Album",
//         artwork: song.artwork || song.coverImage || song.image || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
//         src: song.audioUrl || song.src || song.url || ""
//     };
// };

// const currentTrack = getCurrentTrack();

// useEffect(() => {
//     const audio = audioRef.current;
//     if (audio && currentTrack.src) {
//         audio.volume = volume;

//         const updateTime = () => setCurrentTime(audio.currentTime);
//         const updateDuration = () => setDuration(audio.duration);
//         const handleLoadStart = () => {
//             setCurrentTime(0);
//             setDuration(0);
//         };

//         audio.addEventListener('timeupdate', updateTime);
//         audio.addEventListener('loadedmetadata', updateDuration);
//         audio.addEventListener('loadstart', handleLoadStart);
//         audio.addEventListener('ended', handleTrackEnd);

//         return () => {
//             audio.removeEventListener('timeupdate', updateTime);
//             audio.removeEventListener('loadedmetadata', updateDuration);
//             audio.removeEventListener('loadstart', handleLoadStart);
//             audio.removeEventListener('ended', handleTrackEnd);
//         };
//     }
// }, [volume, currentTrack.src]);

// const handleTrackEnd = () => {
//     if (isRepeat) {
//         audioRef.current.currentTime = 0;
//         audioRef.current.play();
//     } else {
//         handleNextSong();
//     }
// };

// const togglePlayPause = () => {
//     if (!currentTrack.src) return;

//     if (isPlaying) {
//         audioRef.current.pause();
//     } else {
//         audioRef.current.play().catch(error => {
//             console.error('Error playing audio:', error);
//         });
//     }
//     setIsPlaying(!isPlaying);
// };

// const handlePreviousSong = () => {
//     if (!shuffledPlaylist || shuffledPlaylist.length === 0) return;

//     let newIndex;
//     if (currentSongIndex === 0) {
//         newIndex = shuffledPlaylist.length - 1;
//     } else {
//         newIndex = currentSongIndex - 1;
//     }

//     setCurrentSongIndex(newIndex);
//     setCurrentTime(0);

//     if (isPlaying) {
//         setTimeout(() => {
//             audioRef.current.play().catch(error => {
//                 console.error('Error playing previous song:', error);
//             });
//         }, 100);
//     }
// };

// const handleNextSong = () => {
//     if (!shuffledPlaylist || shuffledPlaylist.length === 0) return;

//     let newIndex;
//     if (currentSongIndex === shuffledPlaylist.length - 1) {
//         newIndex = 0;
//     } else {
//         newIndex = currentSongIndex + 1;
//     }

//     setCurrentSongIndex(newIndex);
//     setCurrentTime(0);

//     if (isPlaying) {
//         setTimeout(() => {
//             audioRef.current.play().catch(error => {
//                 console.error('Error playing next song:', error);
//             });
//         }, 100);
//     }
// };

// const handleProgressChange = (e) => {
//     if (!audioRef.current || !duration) return;

//     const rect = progressBarRef.current.getBoundingClientRect();
//     const percent = (e.clientX - rect.left) / rect.width;
//     const newTime = Math.max(0, Math.min(duration, percent * duration));
//     audioRef.current.currentTime = newTime;
//     setCurrentTime(newTime);
// };

// const handleVolumeChange = (e) => {
//     const rect = volumeBarRef.current.getBoundingClientRect();
//     const percent = (e.clientX - rect.left) / rect.width;
//     const newVolume = Math.max(0, Math.min(1, percent));
//     setVolume(newVolume);
//     setIsMuted(newVolume === 0);
// };

// const toggleMute = () => {
//     if (isMuted) {
//         setVolume(0.7);
//         setIsMuted(false);
//     } else {
//         setVolume(0);
//         setIsMuted(true);
//     }
// };

// const toggleShuffle = () => {
//     setIsShuffle(!isShuffle);
//     // Reset to first song when toggling shuffle
//     setCurrentSongIndex(0);
// };

// const formatTime = (time) => {
//     if (isNaN(time)) return "0:00";
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, '0')}`;
// };

// const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
// const volumePercentage = volume * 100;

// // Function to play specific song (can be called from other components)
// const playSpecificSong = (songIndex) => {
//     if (songs && songs.length > songIndex) {
//         setCurrentSongIndex(songIndex);
//         setIsPlaying(true);
//         setTimeout(() => {
//             audioRef.current.play().catch(error => {
//                 console.error('Error playing specific song:', error);
//             });
//         }, 100);
//     }
// };

// // Make playSpecificSong available globally (optional)
// React.useEffect(() => {
//     window.playSpecificSong = playSpecificSong;
//     return () => {
//         delete window.playSpecificSong;
//     };
// }, [songs]);

// if (isAuth) {
//     return (
//         <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 px-4 py-3 z-50">
//             <audio
//                 ref={audioRef}
//                 src={currentTrack.src}
//                 preload="metadata"
//                 onError={(e) => console.error('Audio error:', e)}
//             />

//             <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
//                 {/* Left - Track Info */}
//                 <div className="flex items-center space-x-4 flex-1 min-w-0">
//                     <div className="flex-shrink-0">
//                         <img
//                             src={currentTrack.artwork}
//                             alt={currentTrack.title}
//                             className="w-14 h-14 rounded-md object-cover"
//                             onError={(e) => {
//                                 e.target.src = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop";
//                             }}
//                         />
//                     </div>
//                     <div className="min-w-0 flex-1">
//                         <h4 className="text-white text-sm font-medium truncate">
//                             {currentTrack.title}
//                         </h4>
//                         <p className="text-gray-400 text-xs truncate hover:text-white cursor-pointer">
//                             {currentTrack.artist}
//                         </p>
//                     </div>
//                     <button
//                         onClick={() => setIsLiked(!isLiked)}
//                         className="text-gray-400 hover:text-white transition-colors"
//                     >
//                         <Heart
//                             className={`w-4 h-4 ${isLiked ? 'fill-green-500 text-green-500' : ''}`}
//                         />
//                     </button>
//                 </div>

//                 {/* Center - Player Controls */}
//                 <div className="flex flex-col items-center space-y-2 flex-1 max-w-2xl">
//                     {/* Control Buttons */}
//                     <div className="flex items-center space-x-4">
//                         <button
//                             onClick={toggleShuffle}
//                             className={`transition-colors ${isShuffle ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
//                         >
//                             <Shuffle className="w-4 h-4" />
//                         </button>

//                         <button
//                             onClick={handlePreviousSong}
//                             className="text-gray-400 hover:text-white transition-colors"
//                             disabled={!shuffledPlaylist || shuffledPlaylist.length === 0}
//                         >
//                             <SkipBack className="w-5 h-5" />
//                         </button>

//                         <button
//                             onClick={togglePlayPause}
//                             className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform disabled:opacity-50"
//                             disabled={!currentTrack.src}
//                         >
//                             {isPlaying ? (
//                                 <Pause className="w-5 h-5" fill="currentColor" />
//                             ) : (
//                                 <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
//                             )}
//                         </button>

//                         <button
//                             onClick={handleNextSong}
//                             className="text-gray-400 hover:text-white transition-colors"
//                             disabled={!shuffledPlaylist || shuffledPlaylist.length === 0}
//                         >
//                             <SkipForward className="w-5 h-5" />
//                         </button>

//                         <button
//                             onClick={() => setIsRepeat(!isRepeat)}
//                             className={`transition-colors ${isRepeat ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
//                         >
//                             <Repeat className="w-4 h-4" />
//                         </button>
//                     </div>

//                     {/* Progress Bar */}
//                     <div className="flex items-center space-x-3 w-full">
//                         <span className="text-xs text-gray-400 w-10 text-right">
//                             {formatTime(currentTime)}
//                         </span>
//                         <div
//                             ref={progressBarRef}
//                             onClick={handleProgressChange}
//                             className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer group"
//                         >
//                             <div
//                                 className="h-full bg-white rounded-full relative group-hover:bg-green-500 transition-colors"
//                                 style={{ width: `${progressPercentage}%` }}
//                             >
//                                 <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                             </div>
//                         </div>
//                         <span className="text-xs text-gray-400 w-10">
//                             {formatTime(duration)}
//                         </span>
//                     </div>
//                 </div>

//                 {/* Right - Volume Controls */}
//                 <div className="flex items-center space-x-3 flex-1 justify-end">
//                     <button className="text-gray-400 hover:text-white transition-colors">
//                         <MoreHorizontal className="w-4 h-4" />
//                     </button>

//                     <button className="text-gray-400 hover:text-white transition-colors">
//                         <Maximize2 className="w-4 h-4" />
//                     </button>

//                     <button
//                         onClick={toggleMute}
//                         className="text-gray-400 hover:text-white transition-colors"
//                     >
//                         {isMuted || volume === 0 ? (
//                             <VolumeX className="w-4 h-4" />
//                         ) : (
//                             <Volume2 className="w-4 h-4" />
//                         )}
//                     </button>

//                     <div
//                         ref={volumeBarRef}
//                         onClick={handleVolumeChange}
//                         className="w-24 h-1 bg-gray-600 rounded-full cursor-pointer group"
//                     >
//                         <div
//                             className="h-full bg-white rounded-full relative group-hover:bg-green-500 transition-colors"
//                             style={{ width: `${volumePercentage}%` }}
//                         >
//                             <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Debug info (remove in production) */}
//             {/* {process.env.NODE_ENV === 'development' && (
//                     <div className="text-xs text-gray-500 mt-2">
//                         Songs loaded: {songs?.length || 0} | Current: {currentSongIndex + 1} | Shuffle: {isShuffle ? 'ON' : 'OFF'}
//                     </div>
//                 )
//                 } */}
//         </div>
//     );
// }
// };

// export default SpotifyAudioPlayer;


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
    MoreHorizontal
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongs } from '../redux/admin/adminSongSlice';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const SpotifyAudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isMuted, setIsMuted] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [shuffledPlaylist, setShuffledPlaylist] = useState([]);
    const isAuth = localStorage.getItem('isAuth')
    const audioRef = useRef(null);
    const progressBarRef = useRef(null);
    const volumeBarRef = useRef(null);

    const dispatch = useDispatch();
    const { songs } = useSelector((state) => state.adminSongs);
    const { id } = useSelector((state) => state.playSong)
    console.log("id is :", id);

    useEffect(() => {
        dispatch(getAllSongs());
    }, [dispatch]);

    // Create shuffled playlist when shuffle is enabled or songs change
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

    // Get current track from playlist
    const getCurrentTrack = () => {
        if (!shuffledPlaylist || shuffledPlaylist.length === 0) {
            return {
                title: "No song selected",
                artist: "Unknown Artist",
                album: "Unknown Album",
                artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
                src: ""
            };
        }
        
        if (id) {
            console.log("sonfssfv : ", songs);
            const playedSong = songs.find((song) => {
                return song._id === id
            })
            console.log("played songs",playedSong);
            
            if (playedSong) {
                return {
                    title: playedSong.title || playedSong.name || "Unknown Title",
                    artist: playedSong.artist || playedSong.artistName || "Unknown Artist",
                    album: playedSong.album || playedSong.albumName || "Unknown Album",
                    artwork: playedSong.artwork || playedSong.coverImage || playedSong.image || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
                    src: playedSong.audioUrl || playedSong.src || playedSong.url || ""
                };
            }
        }
        
        // Default case: use current song from playlist
        const song = shuffledPlaylist[currentSongIndex];
        if (!song) {
            return {
                title: "No song selected",
                artist: "Unknown Artist",
                album: "Unknown Album",
                artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
                src: ""
            };
        }
        
        return {
            title: song.title || song.name || "Unknown Title",
            artist: song.artist || song.artistName || "Unknown Artist",
            album: song.album || song.albumName || "Unknown Album",
            artwork: song.artwork || song.coverImage || song.image || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
            src: song.audioUrl || song.src || song.url || ""
        };
    };

    const currentTrack = getCurrentTrack();

    useEffect(() => {
        const audio = audioRef.current;
        if (audio && currentTrack.src) {
            audio.volume = volume;

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
    }, [volume, currentTrack.src]);

    const handleTrackEnd = () => {
        if (isRepeat) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else {
            handleNextSong();
        }
    };

    const togglePlayPause = () => {
        if (!currentTrack.src) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        }
        setIsPlaying(!isPlaying);
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

        if (isPlaying) {
            setTimeout(() => {
                audioRef.current.play().catch(error => {
                    console.error('Error playing previous song:', error);
                });
            }, 100);
        }
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

        if (isPlaying) {
            setTimeout(() => {
                audioRef.current.play().catch(error => {
                    console.error('Error playing next song:', error);
                });
            }, 100);
        }
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
        if (isMuted) {
            setVolume(0.7);
            setIsMuted(false);
        } else {
            setVolume(0);
            setIsMuted(true);
        }
    };

    const toggleShuffle = () => {
        setIsShuffle(!isShuffle);
        // Reset to first song when toggling shuffle
        setCurrentSongIndex(0);
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
    const volumePercentage = volume * 100;

    // Function to play specific song (can be called from other components)
    const playSpecificSong = (songIndex) => {
        if (songs && songs.length > songIndex) {
            setCurrentSongIndex(songIndex);
            setIsPlaying(true);
            setTimeout(() => {
                audioRef.current.play().catch(error => {
                    console.error('Error playing specific song:', error);
                });
            }, 100);
        }
    };

    // Make playSpecificSong available globally (optional)
    React.useEffect(() => {
        window.playSpecificSong = playSpecificSong;
        return () => {
            delete window.playSpecificSong;
        };
    }, [songs]);

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
                                e.target.src = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop";
                            }}
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h4 className="text-white text-sm font-medium truncate">
                            {currentTrack.title}
                        </h4>
                        <p className="text-gray-400 text-xs truncate hover:text-white cursor-pointer">
                            {currentTrack.artist}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsLiked(!isLiked)}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <Heart
                            className={`w-4 h-4 ${isLiked ? 'fill-green-500 text-green-500' : ''}`}
                        />
                    </button>
                </div>

                {/* Center - Player Controls */}
                <div className="flex flex-col items-center space-y-2 flex-1 max-w-2xl">
                    {/* Control Buttons */}
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

                    {/* Progress Bar */}
                    <div className="flex items-center space-x-3 w-full">
                        <span className="text-xs text-gray-400 w-10 text-right">
                            {formatTime(currentTime)}
                        </span>
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
                        <span className="text-xs text-gray-400 w-10">
                            {formatTime(duration)}
                        </span>
                    </div>
                </div>

                {/* Right - Volume Controls */}
                <div className="flex items-center space-x-3 flex-1 justify-end">
                    <button className="text-gray-400 hover:text-white transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>

                    <button className="text-gray-400 hover:text-white transition-colors">
                        <Maximize2 className="w-4 h-4" />
                    </button>

                    <button
                        onClick={toggleMute}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        {isMuted || volume === 0 ? (
                            <VolumeX className="w-4 h-4" />
                        ) : (
                            <Volume2 className="w-4 h-4" />
                        )}
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

            {/* Debug info (remove in production) */}
            {/* {process.env.NODE_ENV === 'development' && (
                <div className="text-xs text-gray-500 mt-2">
                    Songs loaded: {songs?.length || 0} | Current: {currentSongIndex + 1} | Shuffle: {isShuffle ? 'ON' : 'OFF'}
                </div>
            )} */}
        </div>
    );
};

export default SpotifyAudioPlayer;  