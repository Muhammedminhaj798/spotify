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
        <div className="flex-shrink-0 group cursor-pointer w-full sm:w-auto">
            <div className="relative mx-auto sm:mx-0 w-fit">
                <img
                    src={artist.image ? artist.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                    alt={artist.name}
                    className="w-32 h-32 xs:w-36 xs:h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full object-cover group-hover:shadow-2xl transition-all duration-300 mx-auto"
                />
                <div className="absolute inset-0 group-hover:bg-opacity-40 rounded-full transition-all duration-300 flex items-center justify-center">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 fill-white" />
                </div>
            </div>
            <div className="mt-3 sm:mt-4 text-center">
                <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg break-words px-2 sm:px-0">
                    {artist.name}
                </h3>
            </div>
        </div>
    );

    return (
        <div className="bg-black min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center sm:text-left">
                    All Artists
                </h1>
                
                {/* Mobile: 2 columns, Tablet: 3-4 columns, Desktop: 5-6 columns */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
                    {artists && artists.length > 0 ? (
                        artists.map((artist, index) => (
                            <ArtistCard key={artist.id || index} artist={artist} />
                        ))
                    ) : (
                        <div className="col-span-full text-gray-400 text-center py-12">
                            <p className="text-lg">No artists found</p>
                        </div>
                    )}
                </div>
                
                {/* Alternative flex layout for horizontal scrolling on mobile (uncomment if preferred) */}
                {/* 
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 lg:gap-8">
                    {artists && artists.length > 0 ? (
                        artists.map((artist, index) => (
                            <ArtistCard key={artist.id || index} artist={artist} />
                        ))
                    ) : (
                        <div className="text-gray-400 text-center w-full py-12">
                            <p className="text-lg">No artists found</p>
                        </div>
                    )}
                </div>
                */}
            </div>
        </div>
    );
};

export default ShowAllArtist;