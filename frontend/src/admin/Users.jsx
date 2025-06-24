import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, toggleBlockUser, clearError } from '../redux/admin/adminUserSlice';
import Sidebar from '../components/Sidebar';
import { CgUnblock } from 'react-icons/cg';
import { MdBlock } from 'react-icons/md';

const Users = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('/admin_users');
    const [blockingUsers, setBlockingUsers] = useState(new Set()); // Track which users are being blocked
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.adminUser);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    // Display error message when error exists
    useEffect(() => {
        if (error) {
            alert(`Error: ${error.message || 'Failed to perform action'}`);
            // Clear error after showing it
            dispatch(clearError());
        }
    }, [error, dispatch]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleBlockUser = async (id, currentStatus) => {
        console.log('Toggling block status for user:', id, 'Current blocked status:', currentStatus);
        
        // Add user to blocking set to show loading state
        setBlockingUsers(prev => new Set(prev).add(id));

        try {
            await dispatch(toggleBlockUser({ id, currentStatus })).unwrap();
            console.log('Block/Unblock successful');
        } catch (error) {
            console.error("Block/Unblock error:", error);
        } finally {
            // Remove user from blocking set
            setBlockingUsers(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }
    };
    console.log(users);

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
                                                <span className="text-white text-sm">Users</span>
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
                                        placeholder="Search users..."
                                        className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                                    />
                                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>

                                {/* Add User Button */}
                                {/* <button className="bg-green-500 hover:bg-green-600 text-black font-medium px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105">
                                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add User
                                </button> */}

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
                        {/* Page Header */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                User Management
                            </h2>
                            <p className="text-gray-400">Manage all platform users and their permissions</p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-sm">Total Users</p>
                                        <p className="text-3xl font-bold text-green-500">{users?.length || 0}</p>
                                        <p className="text-green-500 text-sm">+12% this month</p>
                                    </div>
                                    <div className="w-12 h-12 bg-green-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-sm">Active Users</p>
                                        <p className="text-3xl font-bold text-blue-500">{users?.filter(user => !user.isBlocked).length || 0}</p>
                                        <p className="text-blue-500 text-sm">Non-blocked users</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-400 text-sm">Premium Users</p>
                                        <p className="text-3xl font-bold text-yellow-500">{users?.filter(user => user.isPremium).length || 0}</p>
                                        <p className="text-yellow-500 text-sm">Premium subscribers</p>
                                    </div>
                                    <div className="w-12 h-12 bg-yellow-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Users Table */}
                        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-white">All Users</h3>
                                <div className="flex items-center space-x-4">
                                    <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white">
                                        <option>All Users</option>
                                        <option>Premium Users</option>
                                        <option>Free Users</option>
                                        <option>Blocked Users</option>
                                        <option>Active Users</option>
                                    </select>
                                    <button className="text-gray-400 hover:text-white transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {loading ? (
                                <div className="p-8 text-center">
                                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                                    <p className="mt-2 text-gray-400">Loading users...</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-800">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Plan</th>
                                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-800">
                                            {users && users.length > 0 ? (
                                                users.map((user, index) => (
                                                    <tr key={user._id || user.id || index} className="hover:bg-gray-800 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                                                                    <span className="text-black text-sm font-bold">
                                                                        {user.name ? user.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
                                                                    </span>
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-white">{user.name || user.username || 'Unknown User'}</div>
                                                                    <div className="text-sm text-gray-400">#{user._id || user.id || index + 1}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                            {user.email || 'No email provided'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${!user.isBlocked
                                                                ? 'bg-green-500 bg-opacity-20 text-green-400'
                                                                : 'bg-red-500 bg-opacity-20 text-red-400'
                                                                }`}>
                                                                {!user.isBlocked ? (
                                                                    <span className='text-white'>Active</span>
                                                                ) : (
                                                                    <span className='text-white'>Blocked</span>
                                                                )}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.isPremium
                                                                ? 'bg-yellow-500 bg-opacity-20 text-yellow-400'
                                                                : 'bg-gray-500 bg-opacity-20 text-gray-400'
                                                                }`}>
                                                                {user.isPremium ? (
                                                                    <span className='text-white'>Premium</span>
                                                                ) : (
                                                                    <span className='text-white'>Free</span>
                                                                )}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <div className="flex space-x-2">
                                                                {/* <button className="text-blue-400 hover:text-blue-300 transition-colors">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                    </svg>
                                                                </button> */}
                                                                <button 
                                                                    onClick={() => handleBlockUser(user._id, user.isBlocked)}
                                                                    disabled={blockingUsers.has(user._id)}
                                                                    className={`transition-colors ${blockingUsers.has(user._id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                    title={user.isBlocked ? 'Unblock User' : 'Block User'}
                                                                >
                                                                    {user.isBlocked ? (
                                                                        <CgUnblock className="text-green-600 w-4 h-4" />
                                                                    ) : (
                                                                        <MdBlock className="text-red-600 w-4 h-4" />
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                                                        No users found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Users;