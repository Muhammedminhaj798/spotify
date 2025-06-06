import { useState } from "react";
import { ArrowLeft, EyeOff, Eye, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";


export function Signup() {
  const [email, setEmail] = useState("name@domain.com");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const navigate = useNavigate()
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      {/* Spotify Logo */}
      <div className="mb-12">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-white text-5xl font-bold mb-2">Sign up to</h1>
          <h1 className="text-white text-5xl font-bold">start listening</h1>
        </div>

        {/* Email Form */}
        <div className="mb-8">
          <label className="block text-white text-sm font-medium mb-2">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={`w-full px-4 py-3 bg-gray-900 text-white border-2 rounded-md focus:outline-none focus:ring-0 ${!isEmailValid && email !== ""
              ? "border-red-500"
              : "border-gray-600 focus:border-white"
              }`}
            placeholder="name@domain.com"
          />

          {!isEmailValid && email !== "" && (
            <div className="flex items-center mt-2">
              <div className="w-4 h-4 rounded-full border-2 border-red-500 flex items-center justify-center mr-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              <p className="text-red-500 text-sm">
                This email is invalid. Make sure it's written like example@email.com
              </p>
            </div>
          )}

          <button className="text-green-500 text-sm underline mt-2 hover:text-green-400">
            Use phone number instead.
          </button>
        </div>

        {/* Next Button */}
        <button onClick={() => navigate('/createPass')} className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-full text-lg mb-8 transition-colors">
          Next
        </button>

        {/* Divider */}
        <div className="flex items-center mb-8">
          <div className="flex-1 border-t border-gray-600"></div>
          <span className="px-4 text-gray-400 text-sm">or</span>
          <div className="flex-1 border-t border-gray-600"></div>
        </div>

        {/* Social Sign Up Buttons */}
        <div className="space-y-4">
          {/* Google */}
          <button className="w-full flex items-center justify-center px-6 py-3 border border-gray-600 rounded-full text-white hover:border-white transition-colors">
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from 'react';

export const CreatePassword = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  // Password validation
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumberOrSpecial = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMinLength = password.length >= 10;

  const isFormValid = hasLetter && hasNumberOrSpecial && hasMinLength;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center py-8 relative">
        <button onClick={() => navigate(-1)} className="absolute left-6 p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Spotify Logo */}
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 168 168">
          <path d="M83.996 0C37.651 0 0 37.651 0 83.996s37.651 83.996 83.996 83.996 83.996-37.651 83.996-83.996S130.341 0 83.996 0zm38.404 121.17c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809.64-5.609-1.12-6.249-3.93-.649-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35-1.04-3.453.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z" />
        </svg>
      </div>

      {/* Progress Bar */}
      <div className="px-6 mb-8">
        <div className="w-full bg-neutral-800 rounded-full h-1">
          <div className="bg-green-500 h-1 rounded-full w-1/3 transition-all duration-300"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 max-w-md mx-auto w-full">
        {/* Step Info */}
        <div className="mb-8">
          <p className="text-neutral-400 text-sm mb-2">Step 1 of 3</p>
          <h1 className="text-2xl font-bold">Create a password</h1>
        </div>

        {/* Password Input */}
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-3">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-neutral-900 border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 pr-12"
              placeholder=""
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="mb-12">
          <p className="text-sm font-semibold mb-4">Your password must contain at least</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${hasLetter ? 'bg-green-500 border-green-500' : 'border-neutral-600'
                }`}>
                {hasLetter && (
                  <svg className="w-2.5 h-2.5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className={`text-sm ${hasLetter ? 'text-green-500' : 'text-neutral-400'}`}>
                1 letter
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${hasNumberOrSpecial ? 'bg-green-500 border-green-500' : 'border-neutral-600'
                }`}>
                {hasNumberOrSpecial && (
                  <svg className="w-2.5 h-2.5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className={`text-sm ${hasNumberOrSpecial ? 'text-green-500' : 'text-neutral-400'}`}>
                1 number or special character (example: # ? ! &)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${hasMinLength ? 'bg-green-500 border-green-500' : 'border-neutral-600'
                }`}>
                {hasMinLength && (
                  <svg className="w-2.5 h-2.5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className={`text-sm ${hasMinLength ? 'text-green-500' : 'text-neutral-400'}`}>
                10 characters
              </span>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={() => navigate('/profileinfo')}
          disabled={!isFormValid}
          className={`w-full py-3 px-6 rounded-full font-bold text-black transition-all duration-200 ${isFormValid
            ? 'bg-green-500 hover:bg-green-400 transform hover:scale-105'
            : 'bg-neutral-600 cursor-not-allowed'
            }`}
        >
          Next
        </button>
      </div>

      {/* Footer */}
      <div className="px-6 py-8 text-center">
        <p className="text-xs text-neutral-500">
          This site is protected by reCAPTCHA and the Google{' '}
          <a href="#" className="underline hover:no-underline">Privacy Policy</a> and{' '}
          <a href="#" className="underline hover:no-underline">Terms of Service</a> apply.
        </p>
      </div>
    </div>
  );
};

// import React, { useState } from 'react';

export const ProfileInfo = () => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [gender, setGender] = useState('');
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const navigate = useNavigate()


  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const isFormValid = name.trim() && year && month && day && gender;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center py-8 relative">
        <button className="absolute left-6 p-2 hover:bg-white/10 rounded-full transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Spotify Logo */}
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 168 168">
          <path d="M83.996 0C37.651 0 0 37.651 0 83.996s37.651 83.996 83.996 83.996 83.996-37.651 83.996-83.996S130.341 0 83.996 0zm38.404 121.17c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809.64-5.609-1.12-6.249-3.93-.649-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35-1.04-3.453.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z" />
        </svg>
      </div>

      {/* Progress Bar */}
      <div className="px-6 mb-8">
        <div className="w-full bg-neutral-800 rounded-full h-1">
          <div className="bg-green-500 h-1 rounded-full w-2/3 transition-all duration-300"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 max-w-md mx-auto w-full">
        {/* Step Info */}
        <div className="mb-8">
          <p className="text-neutral-400 text-sm mb-2">Step 2 of 3</p>
          <h1 className="text-2xl font-bold">Tell us about yourself</h1>
        </div>

        {/* Name Input */}
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-2">Name</label>
          <p className="text-xs text-neutral-400 mb-3">This name will appear on your profile</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-neutral-900 border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            placeholder=""
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-2">Date of birth</label>
          <p className="text-xs text-neutral-400 mb-3">
            Why do we need your date of birth? <span className="underline cursor-pointer">Learn more.</span>
          </p>

          <div className="flex gap-3">
            {/* Year Input */}
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="yyyy"
              maxLength="4"
              className="w-24 p-3 bg-neutral-900 border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />

            {/* Month Dropdown */}
            <div className="relative flex-1">
              <button
                type="button"
                onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
                className="w-full p-3 bg-neutral-900 border border-neutral-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 flex items-center justify-between"
              >
                <span className={month ? 'text-white' : 'text-neutral-500'}>
                  {month || 'Month'}
                </span>
                <svg className={`w-4 h-4 transition-transform ${isMonthDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMonthDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-neutral-800 border border-neutral-700 rounded-md mt-1 max-h-48 overflow-y-auto z-10">
                  {months.map((monthName, index) => (
                    <button
                      key={monthName}
                      type="button"
                      onClick={() => {
                        setMonth(monthName);
                        setIsMonthDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-neutral-700 transition-colors text-white"
                    >
                      {monthName}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Day Input */}
            <input
              type="text"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder="dd"
              maxLength="2"
              className="w-16 p-3 bg-neutral-900 border border-neutral-700 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Gender Selection */}
        <div className="mb-12">
          <label className="block text-sm font-semibold mb-2">Gender</label>
          <p className="text-xs text-neutral-400 mb-4">
            We use your gender to help personalize our content recommendations and ads for you.
          </p>

          <div className="space-y-3">
            {/* First Row */}
            <div className="flex gap-8">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="man"
                  checked={gender === 'man'}
                  onChange={(e) => setGender(e.target.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-3 ${gender === 'man' ? 'border-green-500' : 'border-neutral-500'}`}>
                  {gender === 'man' && (
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  )}
                </div>
                <span className="text-sm">Man</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="woman"
                  checked={gender === 'woman'}
                  onChange={(e) => setGender(e.target.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-3 ${gender === 'woman' ? 'border-green-500' : 'border-neutral-500'}`}>
                  {gender === 'woman' && (
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  )}
                </div>
                <span className="text-sm">Woman</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="non-binary"
                  checked={gender === 'non-binary'}
                  onChange={(e) => setGender(e.target.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-3 ${gender === 'non-binary' ? 'border-green-500' : 'border-neutral-500'}`}>
                  {gender === 'non-binary' && (
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  )}
                </div>
                <span className="text-sm">Non-binary</span>
              </label>
            </div>

            {/* Second Row */}
            <div className="flex gap-8">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="something-else"
                  checked={gender === 'something-else'}
                  onChange={(e) => setGender(e.target.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-3 ${gender === 'something-else' ? 'border-green-500' : 'border-neutral-500'}`}>
                  {gender === 'something-else' && (
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  )}
                </div>
                <span className="text-sm">Something else</span>
              </label>

              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="prefer-not-to-say"
                  checked={gender === 'prefer-not-to-say'}
                  onChange={(e) => setGender(e.target.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-3 ${gender === 'prefer-not-to-say' ? 'border-green-500' : 'border-neutral-500'}`}>
                  {gender === 'prefer-not-to-say' && (
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  )}
                </div>
                <span className="text-sm">Prefer not to say</span>
              </label>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          disabled={!isFormValid}
          onClick={()=> navigate('/terms&conditions')}
          className={`w-full py-3 px-6 rounded-full font-bold text-black transition-all duration-200 ${isFormValid
              ? 'bg-green-500 hover:bg-green-400 transform hover:scale-105'
              : 'bg-neutral-600 cursor-not-allowed'
            }`}
        >
          Next
        </button>
      </div>

      {/* Footer */}
      <div className="px-6 py-8 text-center">
        <p className="text-xs text-neutral-500">
          This site is protected by reCAPTCHA and the Google{' '}
          <a href="#" className="underline hover:no-underline">Privacy Policy</a> and{' '}
          <a href="#" className="underline hover:no-underline">Terms of Service</a> apply.
        </p>
      </div>
    </div>
  );
};




export function Terms() {
  const [marketingOptOut, setMarketingOptOut] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      {/* Spotify Logo */}
      <div className="mb-8">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mb-8">
        <div className="w-full bg-gray-700 rounded-full h-1">
          <div className="bg-green-500 h-1 rounded-full w-full"></div>
        </div>
      </div>

      {/* Header */}
      <div className="w-full max-w-md mb-8">
        <div className="flex items-center mb-4">
          <button onClick={() => navigate(-1)} className="text-white mr-4 hover:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <div className="text-gray-400 text-sm">Step 3 of 3</div>
            <h1 className="text-white text-2xl font-bold">Terms & Conditions</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md">
        {/* Checkboxes */}
        <div className="space-y-4 mb-8">
          {/* Marketing Opt-out */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={marketingOptOut}
                onChange={(e) => setMarketingOptOut(e.target.checked)}
                className="mt-1 mr-3 w-4 h-4 bg-transparent border-2 border-gray-400 rounded focus:ring-green-500 focus:ring-2 checked:bg-green-500 checked:border-green-500"
              />
              <span className="text-white text-sm leading-relaxed">
                I would prefer not to receive marketing messages from Spotify
              </span>
            </label>
          </div>

          {/* Data Sharing */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={dataSharing}
                onChange={(e) => setDataSharing(e.target.checked)}
                className="mt-1 mr-3 w-4 h-4 bg-transparent border-2 border-gray-400 rounded focus:ring-green-500 focus:ring-2 checked:bg-green-500 checked:border-green-500"
              />
              <span className="text-white text-sm leading-relaxed">
                Share my registration data with Spotify's content providers for marketing purposes.
              </span>
            </label>
          </div>
        </div>

        {/* Terms Text */}
        <div className="mb-8 text-sm text-gray-300 leading-relaxed">
          <p className="mb-4">
            By clicking on sign-up, you agree to Spotify's{" "}
            <Link to={'https://www.spotify.com/in-en/legal/end-user-agreement/'}><span className="text-green-500 underline hover:text-green-400">
              Terms and Conditions of Use
            </span></Link>
            .
          </p>
          <p>
            To learn more about how Spotify collects, uses, shares and protects your personal data, please see{" "}
            <Link to={'https://www.spotify.com/in-en/legal/privacy-policy/'}><span className="text-green-500 underline hover:text-green-400">
              Spotify's Privacy Policy
            </span></Link>
            .
          </p>
        </div>

        {/* Sign Up Button */}
        <button onClick={()=> navigate('/')} className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-full text-lg mb-8 transition-colors">
          Sign up
        </button>

        {/* Footer Text */}
        <div className="text-center text-xs text-gray-400 leading-relaxed">
          <p>
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="#" className="text-gray-400 underline hover:text-gray-300">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="text-gray-400 underline hover:text-gray-300">
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </div>
      </div>
    </div>
  );
}