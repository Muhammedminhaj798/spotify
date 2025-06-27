import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Library from './Library';

const Home = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem("isAuth")
    }
    return (
        <div>
            <div className="relative flex h-screen">
                <Library />
                <div className={` flex-1 h-screen overflow-y-auto`}>
                    <main className="">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Home;
