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
    console.log(email);

    const handleNavigate = async (e) => {
        try {
            const res = await dispatch(sentOTP(email));
            console.log(res);
            
            if (res.type === "auth/sendOTP/rejected") {
                throw new Error(res.payload);
            }
            navigate("/otpSection",{
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
        <>
            <div className="min-h-screen bg-gradient-to-b from-neutral-800 to-black flex items-center justify-center px-4">
                <div className='bg-neutral-900 p-8 rounded-xl w-full max-w-md text-white justify-center'>
                    <div className='flex justify-center mb-6'>
                        <img src={spotifylogo} className='w-[50px] h-[50px] object-contain ' alt="" />
                    </div>
                    <div className='flex justify-center'>
                        <label className='font-bold text-4xl'>Log in to spotify</label>
                    </div>
                    <div className='flex flex-col gap-4 justify-center pt-4'>
                        {/* <button className='flex items-center justify-evenly  border-1 border-white/30 rounded-3xl px-4 py-3 hover:border-white'>
                            <img src={googlelog} className='h-5 w-5 object-contain' alt="" />
                            <p className='font-semibold '>Continue with google</p>
                        </button> */}

                        <button onClick={()=> navigate('/loginWithPass')} className='border-1 border-white/30 hover:border-white rounded-3xl font-semibold px-4 py-3'>Continue with Email & Password</button>

                        {/* <hr /> */}

                        <p className='font-bold'>Email or username</p>
                        <input type="text" onChange={userNameInput} className='border h-10 w-[380px] rounded pl-3.5' placeholder='Email or username' />
                        <button className='border rounded-4xl bg-green-600 text-black font-bold  h-[50px]' onClick={handleNavigate}>Continue</button>
                        <p onClick={()=> navigate('/signup')} className='text-gray-300'>Don't have an account?</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
