import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifyOTP } from '../redux/authSlice/authSlice';
import { useNavigate } from 'react-router-dom';

export default function OtpComp({ email = "example@gmail.com" }) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Function to mask email
  const maskEmail = (email) => {
    if (!email || !email.includes('@')) return email;
    
    const [username, domain] = email.split('@');
    const [domainName, extension] = domain.split('.');
    
    // Mask username (first + stars + last)
    let maskedUsername = username;
    if (username.length > 2) {
      maskedUsername = username[0] + '*'.repeat(Math.max(username.length - 2, 1)) + username[username.length - 1];
    } else if (username.length === 2) {
      maskedUsername = username[0] + '*' + username[1];
    }
    
    // Mask domain name (first + stars + last)
    let maskedDomain = domainName;
    if (domainName.length > 2) {
      maskedDomain = domainName[0] + '*'.repeat(Math.max(domainName.length - 2, 1)) + domainName[domainName.length - 1];
    } else if (domainName.length === 2) {
      maskedDomain = domainName[0] + '*' + domainName[1];
    }
    
    return `${maskedUsername}@${maskedDomain}.${extension}`;
  };

  const handleNavigate = async ()=>{
    try{
        const res = await dispatch(verifyOTP(code)).unwrap()
        if(res.type === 'auth/sendOTP/rejected'){
            throw new Error(res.payload)
        }
        navigate('/')
    }catch(error){
        console.log(error);
        
    }
  }
  const handleInputChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    // Reset the code
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const handleLogin = () => {
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      console.log('Logging in with code:', fullCode);
      // Handle login logic hereh
      handleNavigate();
    }
  };

  const isCodeComplete = code.every(digit => digit !== '');

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      {/* Spotify Logo */}
      <div className="mb-16">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center max-w-md mx-auto px-6">
        <h1 className="text-2xl font-bold mb-8">
          Enter the 6-digit code sent to<br />
          you at {maskEmail(email)}.
        </h1>

        {/* Code Input Fields */}
        <div className="flex justify-center gap-3 mb-8">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 bg-transparent border border-gray-600 rounded text-center text-white text-lg focus:border-white focus:outline-none"
              maxLength="1"
            />
          ))}
        </div>

        {/* Resend Code Button */}
        <button
          onClick={handleResendCode}
          className="text-gray-400 text-sm mb-8 hover:text-white transition-colors border border-gray-600 px-4 py-2 rounded-full"
        >
          Resend code
        </button>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={!isCodeComplete}
          className={`w-full py-3 rounded-full font-semibold text-black transition-all ${
            isCodeComplete 
              ? 'bg-green-500 hover:bg-green-400' 
              : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
          Log in
        </button>

        {/* Password Login Link */}
        <div className="mt-8">
          <button className="text-white hover:underline">
            Log in with a password
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 right-4 text-gray-500 text-xs">
        © 2025 Spotify AB
      </div>
    </div>
  );
}