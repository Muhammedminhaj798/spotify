import React from 'react';
import { useNavigate } from 'react-router-dom';
import Library from './Library';

const Home = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem("isAuth")
    }
    return (
        <div>
            <Library/>
            welcome to home
            <button onClick={()=> navigate("/signup")}>signup</button>
            <button onClick={()=> navigate('/login')}>Login</button>
            <button onClick={()=> handleLogout()}>Logout</button>
        </div>
    );
}

export default Home;
