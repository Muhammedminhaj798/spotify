import React from 'react';
import SpotifyAudioPlayer from '../components/SpotifyAudioPlayer';
import { useSelector } from 'react-redux';
import { Minimize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function SongFullScreen() {
    const { songs = [] } = useSelector((state) => state.adminSongs || {});
    const { id } = useSelector((state) => state.playSong || {});
    const navigate = useNavigate()




    const getCurrentTrack = () => {
        if (id && songs && songs.length > 0) {
            const playedSong = songs.find((song) => song._id === id);

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
        if (!songs) {
            return {
                title: "No song selected",
                artist: "Unknown Artist",
                album: "Unknown Album",
                artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
                src: ""
            };
        }

        return {
            title: songs.title || songs.name || "Unknown Title",
            artist: songs.artist || songs.artistName || "Unknown Artist",
            album: songs.album || songs.albumName || "Unknown Album",
            artwork: songs.artwork || songs.coverImage || songs.image || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
            src: songs.audioUrl || songs.src || songs.url || ""
        };
    };


    const currentTrack = getCurrentTrack();

    return (
        <div className="h-screen bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 flex items-center justify-center p-8">
            {/* Album Cover Card */}
            <div className="relative w-96 h-96 bg-white rounded-2xl shadow-2xl overflow-hidden">

                <img
                    src={currentTrack.artwork}
                    alt={currentTrack.title}
                    className="w-full rounded-md object-cover"
                    onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop";
                    }}
                />
            </div>
            <div className="absolute top-20 left-8 text-white">
                <h2 className="text-xl font-semibold">{currentTrack.title}</h2>
            </div>
            {/* Control buttons in top-right */}
            <div className="absolute top-20 right-8 flex gap-4 text-white/60">
                <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <span className="text-sm">
                        <Minimize2 />
                    </span>
                </button>
            </div>
            <SpotifyAudioPlayer />
        </div>
    );
}

export default SongFullScreen