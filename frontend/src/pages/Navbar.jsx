import { Search, Home, Download, Clock, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-black border-b border-gray-800 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Spotify Logo */}
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center cursor-pointer flex-shrink-0">
            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 14.5c-.17 0-.33-.09-.43-.25-1.09-1.83-2.75-2.25-4.21-2.25-1.25 0-2.5.25-3.5.5-.17.04-.33-.04-.42-.21-.08-.17-.04-.33.13-.42 1.12-.29 2.37-.54 3.79-.54 1.71 0 3.63.46 4.96 2.54.08.17.04.33-.13.42-.08.08-.13.21-.19.21zm.54-2.25c-.21 0-.42-.08-.54-.29-1.25-2.08-3.33-2.5-5.29-2.5-1.46 0-2.92.29-4.08.58-.21.04-.42-.04-.5-.25-.08-.21-.04-.42.17-.5 1.29-.33 2.83-.62 4.41-.62 2.17 0 4.58.5 6.12 2.83.13.21.04.42-.17.5-.04.25-.08.25-.12.25zm.67-2.75c-.25 0-.5-.12-.62-.33-1.5-2.42-4-2.92-6.42-2.92-1.75 0-3.5.33-4.92.67-.25.08-.5-.04-.58-.29-.08-.25.04-.5.29-.58 1.54-.37 3.37-.75 5.21-.75 2.75 0 5.54.58 7.33 3.33.12.25.04.5-.21.58-.04.29-.08.29-.08.29z"/>
            </svg>
          </div>
          
          {/* Home Icon - Hidden on mobile */}
          <div className="hidden sm:flex w-6 h-6 bg-gray-600 rounded cursor-pointer hover:bg-gray-500 transition-colors items-center justify-center">
            <Home className="w-4 h-4 text-black" />
          </div>
          
          {/* Search Bar - Responsive width */}
          <div className="relative flex-1 max-w-xs sm:max-w-sm lg:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="What do you want to play?"
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full w-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:bg-gray-700 transition-colors"
            />
          </div>
          
          {/* Browse Icon - Hidden on mobile */}
          <div className="hidden lg:flex w-6 h-6 bg-gray-600 rounded cursor-pointer hover:bg-gray-500 transition-colors items-center justify-center">
            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </div>
        </div>

        {/* Right Section - Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Premium, Support, Download Links */}
          
         
          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <button className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              Sign up
            </button>
            <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform">
              Log in
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-gray-800">
          <div className="flex flex-col space-y-4">
            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-3 text-sm text-gray-300">
              <span className="hover:text-white cursor-pointer transition-colors">Premium</span>
              <span className="hover:text-white cursor-pointer transition-colors">Support</span>
              <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </span>
              <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Install App
              </span>
            </div>
            
            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-800">
              <button className="text-gray-300 hover:text-white text-sm font-medium transition-colors text-left">
                Sign up
              </button>
              <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform w-fit">
                Log in
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}