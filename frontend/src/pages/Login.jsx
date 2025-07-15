import React, { useState } from 'react';
import googlelog from "../assets/google.svg"
import spotifylogo from "../assets/spotify.svg"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sentOTP } from '../redux/authSlice/authSlice';

const Login = () => {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleNavigate = async (e) => {
        try {
            const res = await dispatch(sentOTP(email));
            console.log(res);
            
            if (res.type === "auth/sendOTP/rejected") {
                throw new Error(res.payload);
            }
            navigate("/otpSection", {
                state: { email }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const userNameInput = (e) => {
        setEmail(e.target.value)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-800 to-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className='bg-neutral-900 p-6 sm:p-8 rounded-xl w-full max-w-sm sm:max-w-md text-white'>
                {/* Logo */}
                <div className='flex justify-center mb-6'>
                    <img 
                        src={spotifylogo} 
                        className='w-10 h-10 sm:w-12 sm:h-12 object-contain' 
                        alt="Spotify Logo" 
                    />
                </div>
                
                {/* Title */}
                <div className='flex justify-center mb-6'>
                    <h1 className='font-bold text-2xl sm:text-3xl lg:text-4xl text-center'>
                        Log in to Spotify
                    </h1>
                </div>
                
                {/* Form */}
                <div className='flex flex-col gap-4'>
                    {/* Email/Password Login Button */}
                    <button 
                        onClick={() => navigate('/loginWithPass')} 
                        className='border border-white/30 hover:border-white rounded-3xl font-semibold px-4 py-3 text-sm sm:text-base transition-colors duration-200'
                    >
                        Continue with Email & Password
                    </button>

                    {/* Email Input Section */}
                    <div className='space-y-2'>
                        <label className='font-bold text-sm sm:text-base'>
                            Email or username
                        </label>
                        <input 
                            type="text" 
                            onChange={userNameInput} 
                            className='border h-10 sm:h-12 w-full rounded px-3 text-white text-sm sm:text-base' 
                            placeholder='Email or username' 
                        />
                    </div>
                    
                    {/* Continue Button */}
                    <button 
                        className='bg-green-600 hover:bg-green-700 text-black font-bold h-12 sm:h-14 rounded-full text-sm sm:text-base transition-colors duration-200' 
                        onClick={handleNavigate}
                    >
                        Continue
                    </button>
                    
                    {/* Sign Up Link */}
                    <p 
                        onClick={() => navigate('/signup')} 
                        className='text-gray-300 hover:text-white cursor-pointer text-sm sm:text-base text-center underline transition-colors duration-200'
                    >
                        Don't have an account? Sign up
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;