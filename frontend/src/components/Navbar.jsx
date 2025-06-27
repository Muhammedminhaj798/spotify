import React, { useRef, useState, useEffect } from 'react';
import { Search, Home, Download, Clock, Menu, X, ChevronLeft, ChevronRight, Bell, Settings, User, ChevronDown, UserPlus, LogIn, LogOut } from 'lucide-react';
// import { Search, Home, Download, Bell, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice/authSlice';
import { useDispatch } from 'react-redux';


export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const isLoggedIn = localStorage.getItem('isAuth')
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    // Add your logout logic here

    await dispatch(logout()).unwrap()
    navigate('/')

    console.log('Logging out...');
    setIsProfileDropdownOpen(false);
  };

  const handleProfileClick = () => {
    // Add your profile navigation logic here
    console.log('Navigating to profile...');
    setIsProfileDropdownOpen(false);
  };



  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = () => {
    console.log('Login clicked');
    setIsProfileDropdownOpen(false);
    // Add your login logic here
    navigate('/login')
  };

  const handleSignup = () => {
    console.log('Signup clicked');
    setIsProfileDropdownOpen(false);
    // Add your signup logic here
    navigate('/signup')
  };


  const SpotifyLogo = () => (
    <div className="flex items-center">
      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.420 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    </div>
  );
  if (isLoggedIn) {
    return (
      <nav className="bg-black text-white px-4 py-3 flex items-center justify-between relative">
        {/* Left Section - Logo and Home */}
        <div className="flex items-center space-x-4">
          {/* Spotify Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-black rounded-full relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 border-2 border-white rounded-full border-l-transparent animate-spin"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Home Button */}
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Home size={24} className="text-white" />
          </button>
        </div>

        {/* Center Section - Search Bar */}
        <div className="flex-1 max-w-lg mx-8">
          <div className={`relative flex items-center bg-gray-800 rounded-full transition-all duration-200 ${isSearchFocused ? 'bg-gray-700 ring-2 ring-white ring-opacity-20' : 'hover:bg-gray-700'
            }`}>
            <Search size={20} className="text-gray-400 ml-4" />
            <input
              type="text"
              placeholder="What do you want to play?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full bg-transparent text-white placeholder-gray-400 px-4 py-3 focus:outline-none text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mr-4 text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Right Section - User Controls */}
        <div className="flex items-center space-x-2">
          {/* Install App Button */}
          <button className="hidden md:flex items-center space-x-2 text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-gray-800">
            <Download size={16} />
            <span className="text-sm font-medium">Install App</span>
          </button>

          {/* Notifications */}
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors relative">
            <Bell size={20} className="text-gray-300 hover:text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full"></div>
          </button>

          {/* Settings */}
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Settings size={20} className="text-gray-300 hover:text-white" />
          </button>

          {/* User Profile with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 rounded-full pl-1 pr-3 py-1 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="hidden sm:block text-sm font-medium">Profile</span>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''
                  }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg border border-gray-700 z-50">
                <div className="py-2">
                  <button
                    onClick={handleProfileClick}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
                  >
                    <User size={16} className="text-gray-400" />
                    <span>Profile</span>
                  </button>

                  <hr className="border-gray-700 my-1" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
                  >
                    <LogOut size={16} className="text-gray-400" />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button (hidden on larger screens) */}
        <button className="md:hidden p-2 hover:bg-gray-800 rounded-full transition-colors ml-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    )
  }

  // <div className="flex items-center">
  //   <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
  //     <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.420 1.56-.299.421-1.02.599-1.559.3z" />
  //   </svg>
  // </div>

  return (
    <nav className="bg-black text-white sticky top-0 z-50">
      {/* Main navbar */}
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <SpotifyLogo />

            {/* Navigation arrows - Desktop only */}
            <div className="hidden lg:flex items-center space-x-2">
              <button className="p-2 bg-black/40 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50" disabled>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-2 bg-black/40 hover:bg-white/10 rounded-full transition-colors disabled:opacity-50" disabled>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Home button - Desktop */}
            <button className="hidden lg:flex items-center justify-center w-12 h-12 bg-gray-900 hover:bg-gray-800 rounded-full transition-colors">
              <Home className="w-6 h-6 fill-white" />
            </button>
          </div>

          {/* Center section - Search */}
          <div className="flex-1 max-w-md mx-4 lg:mx-8">
            <div className={`relative transition-all duration-200 ${isSearchFocused ? 'transform scale-105' : ''}`}>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="What do you want to play?"
                className="w-full bg-gray-800 text-white placeholder-gray-400 pl-12 pr-4 py-3 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-white focus:bg-gray-700 transition-all text-sm lg:text-base"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* Right section - Desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Explore Premium */}
            <button className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:scale-105 transition-all">
              Explore Premium
            </button>

            {/* Install App */}
            <button className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:scale-105 transition-all">
              <Download className="w-4 h-4" />
              <span>Install App</span>
            </button>

            {/* Notification Bell */}
            <button className="p-3 hover:bg-gray-800 rounded-full transition-colors">
              <div className="w-4 h-4 relative">
                <div className="w-full h-full border-2 border-current rounded-t-full"></div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-current rounded-full"></div>
              </div>
            </button>

            {/* Profile with Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                className="flex items-center space-x-2 bg-black hover:bg-gray-900 rounded-full p-1 transition-colors group"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  <User className="w-4 h-4" />
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && !isLoggedIn && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="py-2">
                    <button
                      onClick={handleLogin}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors"
                    >
                      <LogIn className="w-4 h-4" />
                      <span className="font-medium">Log in</span>
                    </button>
                    <button
                      onClick={handleSignup}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span className="font-medium">Sign up</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 hover:bg-gray-800 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-4 bg-gray-900 border-t border-gray-800">
          <div className="space-y-4">
            {/* Home */}
            <button className="flex items-center space-x-3 w-full p-3 hover:bg-gray-800 rounded-lg transition-colors">
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </button>

            {/* Premium */}
            <button className="flex items-center space-x-3 w-full p-3 hover:bg-gray-800 rounded-lg transition-colors">
              <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-pink-400 rounded"></div>
              <span className="font-medium">Explore Premium</span>
            </button>

            {/* Install App */}
            <button className="flex items-center space-x-3 w-full p-3 hover:bg-gray-800 rounded-lg transition-colors">
              <Download className="w-5 h-5" />
              <span className="font-medium">Install App</span>
            </button>

            {/* Support */}
            <button className="flex items-center space-x-3 w-full p-3 hover:bg-gray-800 rounded-lg transition-colors">
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-current rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-current rounded-full"></div>
                </div>
              </div>
              <span className="font-medium">Support</span>
            </button>

            {/* Auth Section for Mobile */}
            {!isLoggedIn && (
              <div className="pt-4 border-t border-gray-700 space-y-2">
                <button
                  onClick={handleLogin}
                  className="flex items-center space-x-3 w-full p-3 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="font-medium">Log in</span>
                </button>
                <button
                  onClick={handleSignup}
                  className="flex items-center space-x-3 w-full p-3 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <UserPlus className="w-5 h-5" />
                  <span className="font-medium">Sign up</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom navigation for mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
        <div className="grid grid-cols-5 h-16">
          <button className="flex flex-col items-center justify-center space-y-1 text-white">
            <Home className="w-5 h-5 fill-current" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
            <span className="text-xs">Search</span>
          </button>
          <button className="flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-white transition-colors">
            <div className="w-5 h-5 flex flex-col justify-center space-y-0.5">
              <div className="w-full h-0.5 bg-current"></div>
              <div className="w-full h-0.5 bg-current"></div>
              <div className="w-full h-0.5 bg-current"></div>
            </div>
            <span className="text-xs">Your Library</span>
          </button>
          <button className="flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-white transition-colors">
            <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-pink-400 rounded"></div>
            <span className="text-xs">Premium</span>
          </button>
          <button
            className="flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-white transition-colors"
            onClick={() => !isAuth && setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
              <User className="w-3 h-3" />
            </div>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>

      {/* Demo Controls */}
      {/* <div className="fixed top-20 right-4 bg-gray-800 p-4 rounded-lg shadow-lg">
        <div className="text-sm font-medium mb-2">Demo Controls:</div>
        <button
          onClick={() => setIsAuth(!isAuth)}
          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
        >
          {isAuth ? 'Logout (Show Dropdown)' : 'Login (Hide Dropdown)'}
        </button>
      </div> */}
    </nav>
  )
}



