// import React, { useState } from 'react';
// import { 
//   Home, 
//   Music, 
//   Users, 
//   BarChart3, 
//   Settings, 
//   Search,
//   Bell,
//   User,
//   Play,
//   Pause,
//   SkipForward,
//   Volume2,
//   TrendingUp,
//   Download,
//   Eye,
//   MoreHorizontal,
//   Plus,
//   Filter
// } from 'lucide-react';

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [isPlaying, setIsPlaying] = useState(false);

//   // Sample data
//   const stats = [
//     { title: 'Total Users', value: '2.4M', change: '+12%', trend: 'up' },
//     { title: 'Active Songs', value: '48.2K', change: '+8%', trend: 'up' },
//     { title: 'Total Streams', value: '125M', change: '+23%', trend: 'up' },
//     { title: 'Revenue', value: '$89.2K', change: '+15%', trend: 'up' }
//   ];

//   const recentSongs = [
//     { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', plays: '2.1M', duration: '3:20' },
//     { id: 2, title: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line', plays: '1.8M', duration: '2:54' },
//     { id: 3, title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', plays: '1.6M', duration: '3:23' },
//     { id: 4, title: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'SOUR', plays: '1.4M', duration: '2:58' },
//     { id: 5, title: 'Stay', artist: 'The Kid LAROI', album: 'F*CK LOVE 3', plays: '1.2M', duration: '2:31' }
//   ];

//   const topArtists = [
//     { name: 'The Weeknd', followers: '8.2M', monthlyListeners: '45M' },
//     { name: 'Ariana Grande', followers: '7.8M', monthlyListeners: '42M' },
//     { name: 'Drake', followers: '6.9M', monthlyListeners: '38M' },
//     { name: 'Taylor Swift', followers: '6.5M', monthlyListeners: '35M' }
//   ];

//   const sidebarItems = [
//     { id: 'overview', label: 'Overview', icon: Home },
//     { id: 'music', label: 'Music Library', icon: Music },
//     { id: 'users', label: 'Users', icon: Users },
//     { id: 'analytics', label: 'Analytics', icon: BarChart3 },
//     { id: 'settings', label: 'Settings', icon: Settings }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-950 text-white flex">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
//         {/* Logo */}
//         <div className="p-6 border-b border-gray-800">
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
//               <Music className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-xl font-bold">SpotifyAdmin</span>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-6">
//           <ul className="space-y-2">
//             {sidebarItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <li key={item.id}>
//                   <button
//                     onClick={() => setActiveTab(item.id)}
//                     className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
//                       activeTab === item.id
//                         ? 'bg-green-600 text-white'
//                         : 'text-gray-300 hover:bg-gray-800 hover:text-white'
//                     }`}
//                   >
//                     <Icon className="w-5 h-5" />
//                     <span>{item.label}</span>
//                   </button>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* User Profile */}
//         <div className="p-6 border-t border-gray-800">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
//               <User className="w-5 h-5" />
//             </div>
//             <div>
//               <p className="font-medium">Admin User</p>
//               <p className="text-sm text-gray-400">admin@spotify.com</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="bg-gray-900 border-b border-gray-800 px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <h1 className="text-2xl font-bold">Dashboard</h1>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search songs, artists, users..."
//                   className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
//                 <Bell className="w-5 h-5" />
//               </button>
//               <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
//                 <Plus className="w-4 h-4" />
//                 <span>Add Content</span>
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Dashboard Content */}
//         <main className="flex-1 p-8 overflow-auto">
//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-gray-400 text-sm font-medium">{stat.title}</h3>
//                   <TrendingUp className="w-4 h-4 text-green-500" />
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-2xl font-bold">{stat.value}</span>
//                   <span className="text-green-400 text-sm font-medium">{stat.change}</span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Recent Songs */}
//             <div className="lg:col-span-2">
//               <div className="bg-gray-900 rounded-lg border border-gray-800">
//                 <div className="p-6 border-b border-gray-800">
//                   <div className="flex items-center justify-between">
//                     <h2 className="text-xl font-bold">Recent Songs</h2>
//                     <div className="flex items-center space-x-2">
//                       <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
//                         <Filter className="w-4 h-4" />
//                       </button>
//                       <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
//                         <MoreHorizontal className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="border-b border-gray-800 text-gray-400 text-sm">
//                         <th className="text-left p-4 font-medium">Song</th>
//                         <th className="text-left p-4 font-medium">Artist</th>
//                         <th className="text-left p-4 font-medium">Album</th>
//                         <th className="text-left p-4 font-medium">Plays</th>
//                         <th className="text-left p-4 font-medium">Duration</th>
//                         <th className="text-left p-4 font-medium">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {recentSongs.map((song) => (
//                         <tr key={song.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
//                           <td className="p-4">
//                             <div className="flex items-center space-x-3">
//                               <button
//                                 onClick={() => setIsPlaying(!isPlaying)}
//                                 className="w-8 h-8 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors"
//                               >
//                                 {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//                               </button>
//                               <span className="font-medium">{song.title}</span>
//                             </div>
//                           </td>
//                           <td className="p-4 text-gray-300">{song.artist}</td>
//                           <td className="p-4 text-gray-300">{song.album}</td>
//                           <td className="p-4 text-gray-300">{song.plays}</td>
//                           <td className="p-4 text-gray-300">{song.duration}</td>
//                           <td className="p-4">
//                             <div className="flex items-center space-x-2">
//                               <button className="p-1 hover:bg-gray-700 rounded transition-colors">
//                                 <Eye className="w-4 h-4" />
//                               </button>
//                               <button className="p-1 hover:bg-gray-700 rounded transition-colors">
//                                 <Download className="w-4 h-4" />
//                               </button>
//                               <button className="p-1 hover:bg-gray-700 rounded transition-colors">
//                                 <MoreHorizontal className="w-4 h-4" />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>

//             {/* Top Artists */}
//             <div>
//               <div className="bg-gray-900 rounded-lg border border-gray-800">
//                 <div className="p-6 border-b border-gray-800">
//                   <h2 className="text-xl font-bold">Top Artists</h2>
//                 </div>
//                 <div className="p-6">
//                   <div className="space-y-4">
//                     {topArtists.map((artist, index) => (
//                       <div key={index} className="flex items-center justify-between">
//                         <div className="flex items-center space-x-3">
//                           <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//                             <span className="text-sm font-bold">{artist.name.charAt(0)}</span>
//                           </div>
//                           <div>
//                             <p className="font-medium">{artist.name}</p>
//                             <p className="text-sm text-gray-400">{artist.followers} followers</p>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <p className="text-sm font-medium">{artist.monthlyListeners}</p>
//                           <p className="text-xs text-gray-400">monthly listeners</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="bg-gray-900 rounded-lg border border-gray-800 mt-6">
//                 <div className="p-6 border-b border-gray-800">
//                   <h2 className="text-xl font-bold">Quick Actions</h2>
//                 </div>
//                 <div className="p-6">
//                   <div className="space-y-3">
//                     <button className="w-full bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg font-medium transition-colors">
//                       Upload New Song
//                     </button>
//                     <button className="w-full bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg font-medium transition-colors">
//                       Create Playlist
//                     </button>
//                     <button className="w-full bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg font-medium transition-colors">
//                       Manage Users
//                     </button>
//                     <button className="w-full bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg font-medium transition-colors">
//                       View Reports
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>

//         {/* Mini Player */}
//         <div className="bg-gray-900 border-t border-gray-800 px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded"></div>
//               <div>
//                 <p className="font-medium">Currently Playing</p>
//                 <p className="text-sm text-gray-400">Sample Track - Artist Name</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
//                 <SkipForward className="w-5 h-5 rotate-180" />
//               </button>
//               <button
//                 onClick={() => setIsPlaying(!isPlaying)}
//                 className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors"
//               >
//                 {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
//               </button>
//               <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
//                 <SkipForward className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Volume2 className="w-4 h-4" />
//               <div className="w-24 h-1 bg-gray-700 rounded-full">
//                 <div className="w-3/4 h-full bg-green-500 rounded-full"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React from 'react';

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="text-gray-500 hover:text-gray-700">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 21H3a2 2 0 01-2-2V5a2 2 0 012-2h6l2 2h6a2 2 0 012 2v7" />
//                 </svg>
//               </button>
//               <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//                 <span className="text-white text-sm font-medium">U</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         {/* Welcome Section */}
//         <div className="px-4 py-6 sm:px-0">
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
//             <p className="mt-2 text-gray-600">Here's what's happening with your account today.</p>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
//                     <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-500">Total Users</p>
//                   <p className="text-2xl font-semibold text-gray-900">1,234</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
//                     <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-500">Revenue</p>
//                   <p className="text-2xl font-semibold text-gray-900">$45,678</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
//                     <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-500">Orders</p>
//                   <p className="text-2xl font-semibold text-gray-900">890</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow p-6">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
//                     <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm font-medium text-gray-500">Growth</p>
//                   <p className="text-2xl font-semibold text-gray-900">+12.5%</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Recent Activity */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="bg-white rounded-lg shadow">
//               <div className="px-6 py-4 border-b border-gray-200">
//                 <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
//               </div>
//               <div className="p-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                     <p className="text-sm text-gray-600">New user registered</p>
//                     <span className="text-xs text-gray-400">2 min ago</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     <p className="text-sm text-gray-600">Order #1234 completed</p>
//                     <span className="text-xs text-gray-400">5 min ago</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                     <p className="text-sm text-gray-600">Payment received</p>
//                     <span className="text-xs text-gray-400">10 min ago</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//                     <p className="text-sm text-gray-600">Server maintenance scheduled</p>
//                     <span className="text-xs text-gray-400">1 hour ago</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow">
//               <div className="px-6 py-4 border-b border-gray-200">
//                 <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
//               </div>
//               <div className="p-6">
//                 <div className="grid grid-cols-2 gap-4">
//                   <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//                     <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                     </svg>
//                     <span className="text-sm font-medium text-gray-700">Add User</span>
//                   </button>
//                   <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//                     <svg className="w-8 h-8 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                     <span className="text-sm font-medium text-gray-700">New Report</span>
//                   </button>
//                   <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//                     <svg className="w-8 h-8 text-yellow-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     <span className="text-sm font-medium text-gray-700">Settings</span>
//                   </button>
//                   <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//                     <svg className="w-8 h-8 text-purple-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
//                     </svg>
//                     <span className="text-sm font-medium text-gray-700">Share</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;


import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              {/* Spotify Logo */}
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold">Spotify Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                </svg>
              </button>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-black text-sm font-bold">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Good evening, Admin</h2>
            <p className="text-gray-400">Here's your music platform overview</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-3xl font-bold text-green-500">2.5M</p>
                  <p className="text-green-500 text-sm">+12% this month</p>
                </div>
                <div className="w-12 h-12 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Songs Played</p>
                  <p className="text-3xl font-bold text-blue-500">45.2M</p>
                  <p className="text-blue-500 text-sm">+8% this week</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Premium Users</p>
                  <p className="text-3xl font-bold text-yellow-500">892K</p>
                  <p className="text-yellow-500 text-sm">+15% conversion</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Revenue</p>
                  <p className="text-3xl font-bold text-purple-500">$1.2M</p>
                  <p className="text-purple-500 text-sm">+22% growth</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Top Artists */}
            <div className="bg-gray-900 rounded-lg border border-gray-800">
              <div className="px-6 py-4 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">Top Artists This Week</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { name: "Taylor Swift", plays: "12.3M", change: "+5%" },
                    { name: "Drake", plays: "10.8M", change: "+3%" },
                    { name: "Bad Bunny", plays: "9.2M", change: "+8%" },
                    { name: "The Weeknd", plays: "8.5M", change: "+2%" },
                    { name: "Billie Eilish", plays: "7.9M", change: "+4%" }
                  ].map((artist, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-400 text-sm font-medium">#{index + 1}</span>
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{artist.name[0]}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{artist.name}</p>
                          <p className="text-gray-400 text-sm">{artist.plays} plays</p>
                        </div>
                      </div>
                      <span className="text-green-500 text-sm">{artist.change}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-900 rounded-lg border border-gray-800">
              <div className="px-6 py-4 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-gray-300 text-sm">New album uploaded by Artist XYZ</p>
                    <span className="text-gray-500 text-xs">2m ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-gray-300 text-sm">Premium subscription milestone reached</p>
                    <span className="text-gray-500 text-xs">15m ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <p className="text-gray-300 text-sm">Playlist "Today's Top Hits" updated</p>
                    <span className="text-gray-500 text-xs">1h ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <p className="text-gray-300 text-sm">New podcast episode published</p>
                    <span className="text-gray-500 text-xs">2h ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <p className="text-gray-300 text-sm">Copyright claim resolved</p>
                    <span className="text-gray-500 text-xs">3h ago</span>
                  </div>
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
  );
};

export default Dashboard;