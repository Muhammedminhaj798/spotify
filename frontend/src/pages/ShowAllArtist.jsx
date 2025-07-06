import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Play } from 'lucide-react';
import { getAllArtist } from '../redux/admin/adminArtistSlice';

const ShowAllArtist = () => {
    const { artists } = useSelector((state) => state.adminArtist);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllArtist())
    }, [])
    console.log(artists);

    const ArtistCard = ({ artist }) => (
        <div className="flex-shrink-0 group cursor-pointer">
            <div className="relative">
                <img
                    src={artist.image ? artist.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                    alt={artist.name}
                    className="w-40 h-40 rounded-full object-cover group-hover:shadow-2xl transition-all duration-300"
                />
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 rounded-full transition-all duration-300 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 fill-white" />
                </div>
            </div>
            <div className="mt-4 text-center">
                <h3 className="text-white font-semibold text-lg">{artist.name}</h3>
            </div>
        </div>
    );

    return (
        <div className="bg-black min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-white text-3xl font-bold mb-8">All Artists</h1>
                <div className="flex flex-wrap gap-6 pb-4 scrollbar-hide">
                    {artists && artists.length > 0 ? (
                        artists.map((artist, index) => (
                            <ArtistCard key={artist.id || index} artist={artist} />
                        ))
                    ) : (
                        <div className="text-gray-400 text-center w-full">
                            <p>No artists found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowAllArtist;