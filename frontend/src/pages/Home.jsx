import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    return (
        <div>
            welcome to home
            <button onClick={()=> navigate("/signup")}>signup</button>
            <button onClick={()=> navigate('/login')}>Login</button>
        </div>
    );
}

export default Home;
