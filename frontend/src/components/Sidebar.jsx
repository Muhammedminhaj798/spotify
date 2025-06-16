import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar, activeItem, setActiveItem }) => {
    const navigate = useNavigate()
  const menuItems = [
    {
      section: "Overview",
      items: [
        { id: 'dashboard', name: 'Dashboard', icon: '📊' },
      ]
    },
    {
      section: "Management",
      items: [
        { id: '/admin_users', name: 'Users', icon: '👥' },
        { id: '', name: 'Playlists', icon: '🎵' },
        { id: '', name: 'Artists', icon: '🎤' },
        { id: '', name: 'Tracks', icon: '🎧' }
      ]
    },
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    // Close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-gray-900 border-r border-gray-800 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-0
        overflow-y-auto
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">Spotify Admin</h2>
          </div>
          
          {/* Close button for mobile */}
          <button 
            onClick={toggleSidebar}
            className="lg:hidden text-gray-400 hover:text-white transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              {/* Section Title */}
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">
                {section.section}
              </h3>
              
              {/* Section Items */}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id || "/admin_dashboard")}
                    className={`
                      w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg
                      transition-all duration-200 group relative overflow-hidden
                      ${activeItem === item.id
                        ? 'bg-green-500 bg-opacity-20 text-green-400 border-l-4 border-green-500'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }
                    `}
                  >
                    <span className="mr-3 text-lg flex-shrink-0">
                      {item.icon}
                    </span>
                    <span className="truncate">{item.name}</span>
                    
                    {/* Active indicator */}
                    {activeItem === item.id && (
                      <div className="absolute right-3 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-gray-900">
          <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-black text-sm font-bold">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-gray-400 truncate">admin@spotify.com</p>
            </div>
            <button className="p-1 text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;