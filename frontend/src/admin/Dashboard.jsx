import React, { useState } from 'react';
import { 
  Home, 
  Music, 
  Users, 
  BarChart3, 
  Settings, 
  Search,
  Bell,
  User,
  Play,
  Pause,
  SkipForward,
  Volume2,
  TrendingUp,
  Download,
  Eye,
  MoreHorizontal,
  Plus,
  Filter
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isPlaying, setIsPlaying] = useState(false);

  // Sample data
  const stats = [
    { title: 'Total Users', value: '2.4M', change: '+12%', trend: 'up' },
    { title: 'Active Songs', value: '48.2K', change: '+8%', trend: 'up' },
    { title: 'Total Streams', value: '125M', change: '+23%', trend: 'up' },
    { title: 'Revenue', value: '$89.2K', change: '+15%', trend: 'up' }
  ];

  const recentSongs = [
    { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', plays: '2.1M', duration: '3:20' },
    { id: 2, title: 'Watermelon Sugar', artist: 'Harry Styles', album: 'Fine Line', plays: '1.8M', duration: '2:54' },
    { id: 3, title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', plays: '1.6M', duration: '3:23' },
    { id: 4, title: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'SOUR', plays: '1.4M', duration: '2:58' },
    { id: 5, title: 'Stay', artist: 'The Kid LAROI', album: 'F*CK LOVE 3', plays: '1.2M', duration: '2:31' }
  ];

  const topArtists = [
    { name: 'The Weeknd', followers: '8.2M', monthlyListeners: '45M' },
    { name: 'Ariana Grande', followers: '7.8M', monthlyListeners: '42M' },
    { name: 'Drake', followers: '6.9M', monthlyListeners: '38M' },
    { name: 'Taylor Swift', followers: '6.5M', monthlyListeners: '35M' }
  ];

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'music', label: 'Music Library', icon: Music },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">SpotifyAdmin</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-green-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-6 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">Admin User</p>
              <p className="text-sm text-gray-400">admin@spotify.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search songs, artists, users..."
                  className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add Content</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 text-sm font-medium">{stat.title}</h3>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Songs */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-lg border border-gray-800">
                <div className="p-6 border-b border-gray-800">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Recent Songs</h2>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                        <Filter className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800 text-gray-400 text-sm">
                        <th className="text-left p-4 font-medium">Song</th>
                        <th className="text-left p-4 font-medium">Artist</th>
                        <th className="text-left p-4 font-medium">Album</th>
                        <th className="text-left p-4 font-medium">Plays</th>
                        <th className="text-left p-4 font-medium">Duration</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentSongs.map((song) => (
                        <tr key={song.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-8 h-8 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors"
                              >
                                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                              </button>
                              <span className="font-medium">{song.title}</span>
                            </div>
                          </td>
                          <td className="p-4 text-gray-300">{song.artist}</td>
                          <td className="p-4 text-gray-300">{song.album}</td>
                          <td className="p-4 text-gray-300">{song.plays}</td>
                          <td className="p-4 text-gray-300">{song.duration}</td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                                <Download className="w-4 h-4" />
                              </button>
                              <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Top Artists */}
            <div>
              <div className="bg-gray-900 rounded-lg border border-gray-800">
                <div className="p-6 border-b border-gray-800">
                  <h2 className="text-xl font-bold">Top Artists</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {topArtists.map((artist, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold">{artist.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium">{artist.name}</p>
                            <p className="text-sm text-gray-400">{artist.followers} followers</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{artist.monthlyListeners}</p>
                          <p className="text-xs text-gray-400">monthly listeners</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-900 rounded-lg border border-gray-800 mt-6">
                <div className="p-6 border-b border-gray-800">
                  <h2 className="text-xl font-bold">Quick Actions</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <button className="w-full bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg font-medium transition-colors">
                      Upload New Song
                    </button>
                    <button className="w-full bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg font-medium transition-colors">
                      Create Playlist
                    </button>
                    <button className="w-full bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg font-medium transition-colors">
                      Manage Users
                    </button>
                    <button className="w-full bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg font-medium transition-colors">
                      View Reports
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Mini Player */}
        <div className="bg-gray-900 border-t border-gray-800 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded"></div>
              <div>
                <p className="font-medium">Currently Playing</p>
                <p className="text-sm text-gray-400">Sample Track - Artist Name</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                <SkipForward className="w-5 h-5 rotate-180" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4" />
              <div className="w-24 h-1 bg-gray-700 rounded-full">
                <div className="w-3/4 h-full bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;