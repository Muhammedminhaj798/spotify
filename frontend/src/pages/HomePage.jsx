import React, { useEffect, useRef } from 'react';
import { Play, MoreHorizontal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllArtist } from '../redux/admin/adminArtistSlice';
import { getAllSongs } from '../redux/admin/adminSongSlice';
import { playSongRequest } from '../redux/users/playSong';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const { artists } = useSelector((state) => state.adminArtist)
    const { songs } = useSelector((state) => state.adminSongs)
    const { id: currentSongId } = useSelector((state) => state.playSong)
    const audioPlayerRef = useRef(null);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllArtist())
        dispatch(getAllSongs())
    }, [])
    const user = localStorage.getItem("user")
    

    const popularArtists = artists && artists.length > 0
        ? artists.slice(0, 10).filter(artist => artist && artist.name)
        : [];

    const popularAlbums = [
        {
            title: "Aashiqui 2",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
            color: "from-teal-500 to-blue-600"
        },
        {
            title: "Yeh Jawaani Hai Deewani",
            image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
            color: "from-yellow-400 to-orange-500"
        },
        {
            title: "Sanam Teri Kasam",
            image: "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=300&h=300&fit=crop",
            color: "from-red-500 to-pink-600"
        },
        {
            title: "Finding You",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
            color: "from-blue-400 to-cyan-500"
        },
        {
            title: "Young G.O.A.T",
            image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
            color: "from-orange-400 to-red-500"
        },
        {
            title: "Raanjhan",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
            color: "from-purple-500 to-pink-600"
        }
    ];

    const trendingSongs = songs && songs.length > 0
        ? songs.slice(0, 10).filter(song => song && song.title)
        : [];

    // Handle song click with automatic play
    const handleSongClick = (song) => {
        // Dispatch the song selection to Redux
        dispatch(playSongRequest(song._id));
        
        // Trigger automatic play by sending a custom event to the audio player
        setTimeout(() => {
            const event = new CustomEvent('autoPlay', { detail: { songId: song._id } });
            window.dispatchEvent(event);
        }, 100); // Small delay to ensure Redux state is updated
    };

    const ArtistCard = ({ artist }) => (
        <div className="flex-shrink-0 group cursor-pointer">
            <div className="relative">
                <img
                    src={artist.image ? artist.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                    alt={artist.name}
                    className="w-40 h-40 rounded-full object-cover group-hover:shadow-2xl transition-all duration-300"
                />
                <div className="absolute inset-0  group-hover:bg-opacity-20 rounded-full transition-all duration-300 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" fill="white" />
                </div>
            </div>
            <div className="mt-4 text-center">
                <h3 className="text-white font-semibold text-lg">{artist.name}</h3>
                <p className="text-gray-400 text-sm">{artist.type}</p>
            </div>
        </div>
    );

    const AlbumCard = ({ album }) => (
        <div className="flex-shrink-0 group cursor-pointer">
            <div className="relative">
                <div className={`w-52 h-52 rounded-lg bg-gradient-to-br ${album.color} overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
                    <img
                        src={album.image}
                        alt={album.title}
                        className="w-full h-full object-cover opacity-80"
                    />
                </div>
                <div className="absolute inset-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-300 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" fill="white" />
                </div>
            </div>
        </div>
    );

    const SongCard = ({ song }) => (
        <div className="flex-shrink-0 group cursor-pointer">
            <div className="relative">
                <div className={`w-52 h-52 rounded-lg bg-gradient-to-br ${song.color} overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
                    <img
                        src={song.coverImage}
                        alt={song.title}
                        className="w-full h-full object-cover opacity-80"
                    />
                </div>
                <div 
                    className="absolute inset-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-300 flex items-center justify-center" 
                    onClick={() => handleSongClick(song)}
                >
                    <Play className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" fill="white" />
                </div>
            </div>
            <div className="mt-3">
                <h3 className="text-white font-semibold text-base truncate">{song.title}</h3>
                <p className="text-gray-400 text-sm truncate">{song.artist}</p>
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white p-6 ">
            {/* Popular Artists Section */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold">Popular artists</h2>
                    <button onClick={()=> navigate('/AllArtist')} className="text-gray-400 hover:text-white text-sm font-medium">
                        Show all
                    </button>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                    {popularArtists.map((artist, index) => (
                        <ArtistCard key={index} artist={artist} />
                    ))}
                </div>
            </div>

            {/* Popular Albums and Singles Section */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold">Popular albums and singles</h2>
                    <button className="text-gray-400 hover:text-white text-sm font-medium">
                        Show all
                    </button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {popularAlbums.map((album, index) => (
                        <AlbumCard key={index} album={album} />
                    ))}
                </div>
            </div>

            {/* Trending Songs Section */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold">Trending songs</h2>
                    <button className="text-gray-400 hover:text-white text-sm font-medium">
                        Show all
                    </button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {trendingSongs.map((song, index) => (
                        <SongCard key={index} song={song} />
                    ))}
                </div>
            </div>

            {/* Popular Artists Section (Repeated) */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold">Popular artists</h2>
                    <button className="text-gray-400 hover:text-white text-sm font-medium">
                        Show all
                    </button>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                    {popularArtists.map((artist, index) => (
                        <ArtistCard key={`repeat-${index}`} artist={artist} />
                    ))}
                </div>
            </div>

            <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    );
};

export default HomePage;