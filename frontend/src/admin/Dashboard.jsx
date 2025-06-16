import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/admin/adminUserSlice';
import Sidebar from '../components/Sidebar';


const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.adminUser)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Enhanced Header */}
        <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 sticky top-0 z-30 backdrop-blur-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                {/* Enhanced Mobile menu button */}
                <button
                  onClick={toggleSidebar}
                  className={`
                    lg:hidden p-3 rounded-xl text-gray-400 hover:text-white 
                    hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 
                    transition-all duration-300 transform hover:scale-110
                    ${sidebarOpen ? 'bg-green-500/20 text-green-400' : ''}
                  `}
                >
                  <svg
                    className={`w-6 h-6 transition-transform duration-300 ${sidebarOpen ? 'rotate-90' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                {/* Logo for mobile/when sidebar is closed */}
                <div className="flex items-center space-x-3 lg:hidden">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                  </div>
                  <h1 className="text-xl font-bold">Spotify Admin</h1>
                </div>

                {/* Breadcrumb for larger screens */}
                <div className="hidden lg:block">
                  <nav className="flex" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2">
                      <li>
                        <span className="text-gray-400 text-sm">Admin</span>
                      </li>
                      <li>
                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </li>
                      <li>
                        <span className="text-white text-sm capitalize">{activeItem.replace('-', ' ')}</span>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="hidden md:block relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-gray-400 hover:text-white transition-all duration-300 rounded-xl hover:bg-gray-700/50 transform hover:scale-110">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>

                {/* User Profile */}
                <div className="hidden sm:flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-black text-sm font-bold">A</span>
                  </div>
                  <span className="text-sm font-medium">Admin User</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Good evening, Admin
              </h2>
              <p className="text-gray-400">Here's your music platform overview</p>
            </div>

            {/* Stats Cards with enhanced styling */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Users</p>
                    <p className="text-3xl font-bold text-green-500">{users.length}</p>
                    <p className="text-green-500 text-sm">+12% this month</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Songs Played</p>
                    <p className="text-3xl font-bold text-blue-500">45.2M</p>
                    <p className="text-blue-500 text-sm">+8% this week</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Premium Users</p>
                    <p className="text-3xl font-bold text-yellow-500">892K</p>
                    <p className="text-yellow-500 text-sm">+15% conversion</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Revenue</p>
                    <p className="text-3xl font-bold text-purple-500">$1.2M</p>
                    <p className="text-purple-500 text-sm">+22% growth</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-900 rounded-lg border border-gray-800">
              <div className="px-6 py-4 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group">
                    <div className="w-12 h-12 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-opacity-30 transition-colors">
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-white">Add Song</span>
                  </button>

                  <button className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group">
                    <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-opacity-30 transition-colors">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-white">Create Playlist</span>
                  </button>

                  <button className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group">
                    <div className="w-12 h-12 bg-yellow-500 bg-opacity-20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-opacity-30 transition-colors">
                      <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-white">View Analytics</span>
                  </button>

                  <button className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group">
                    <div className="w-12 h-12 bg-purple-500 bg-opacity-20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-opacity-30 transition-colors">
                      <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-white">Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;