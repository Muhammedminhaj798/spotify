import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Library from './Library';
import SpotifyAudioPlayer from '../components/SpotifyAudioPlayer';

const Home = () => {
    
    return (
        <div className="h-screen flex flex-col">
            <div className="relative flex flex-1 overflow-hidden mt-16">
                <Library/>
                <div className={`flex-1 h-full overflow-y-auto hide-scrollbar`}>
                    <main className="pb-20"> 
                        <Outlet />
                    </main>
                </div>
            </div>
            <SpotifyAudioPlayer />
        </div>
    );
}

export default Home;