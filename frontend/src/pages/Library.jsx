// import React, { useEffect, useState, useRef } from 'react';
// import { Search, Plus, ArrowUpDown, Heart, Music, User, EllipsisVertical, Trash2, Edit, X } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getPlaylist } from '../redux/users/playlistSlice';

// const Library = () => {
//   const [activeTab, setActiveTab] = useState('Playlists');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedPlaylist, setSelectedPlaylist] = useState(null);
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const { playlists } = useSelector((state) => state.userPlaylist)
//   console.log("playlist", playlists);

//   useEffect(() => {
//     const fetchPlaylists = async () => {
//       await dispatch(getPlaylist()).unwrap();
//     };
//     fetchPlaylists();
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // Close dropdown if clicking outside
//       if (activeDropdown !== null) {
//         const dropdownElement = document.getElementById(`dropdown-${activeDropdown}`);
//         const buttonElement = document.getElementById(`button-${activeDropdown}`);
        
//         if (dropdownElement && buttonElement) {
//           if (!dropdownElement.contains(event.target) && !buttonElement.contains(event.target)) {
//             setActiveDropdown(null);
//           }
//         }
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [activeDropdown]);

//   const artists = [
//     {
//       id: 1,
//       name: 'Kalabhavan Mani',
//       type: 'Artist',
//       image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=center',
//       bgColor: 'bg-gray-700'
//     },
//     {
//       id: 2,
//       name: 'Vineeth Sreenivasan',
//       type: 'Artist',
//       image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=center',
//       bgColor: 'bg-gray-700'
//     },
//     {
//       id: 3,
//       name: 'Kailash Kher',
//       type: 'Artist',
//       image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&crop=center',
//       bgColor: 'bg-gray-700'
//     }
//   ];

//   const currentData = activeTab === 'Playlists' ? playlists : artists;

//   const filteredData = currentData.filter(item =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleEllipsisClick = (e, itemId) => {
//     e.preventDefault();
//     e.stopPropagation();
//     console.log('Clicked ellipsis for item:', itemId);
    
//     if (activeDropdown === itemId) {
//       setActiveDropdown(null);
//     } else {
//       setActiveDropdown(itemId);
//     }
//   };

//   const handleDeleteClick = (item) => {
//     setSelectedPlaylist(item);
//     setShowDeleteModal(true);
//     setActiveDropdown(null);
//   };

//   const handleDeleteConfirm = () => {
//     // Add your delete playlist logic here
//     console.log('Deleting playlist:', selectedPlaylist.name);
//     // dispatch(deletePlaylist(selectedPlaylist.id));
//     setShowDeleteModal(false);
//     setSelectedPlaylist(null);
//   };

//   const handleDeleteCancel = () => {
//     setShowDeleteModal(false);
//     setSelectedPlaylist(null);
//   };

//   const handleEditClick = (item) => {
//     console.log('Edit playlist:', item.name);
//     setActiveDropdown(null);
//   };

//   return (
//     <div className=" fixed left-0 min-h-screen w-80 bg-gray-900 border-r border-gray-800 
//         transform transition-transform duration-300 ease-in-out text-white">
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 pb-2">
//         <h1 className="text-2xl font-bold">Your Library</h1>
//         <div className="flex items-center space-x-2">
//           <button onClick={() => navigate("/addPlaylist")} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
//             <Plus className="w-5 h-5" />
//           </button>
//           <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
//             <ArrowUpDown className="w-5 h-5" />
//           </button>
//         </div>
//       </div>

//       {/* Toggle Buttons */}
//       <div className="flex space-x-2 px-4 pb-4">
//         {['Playlists', 'Artists'].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === tab
//                 ? 'bg-gray-800 text-white'
//                 : 'bg-transparent text-gray-400 hover:text-white'
//               }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Search Bar */}
//       <div className="px-4 pb-4">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search in Your Library"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>
//       </div>

//       {/* Recents Header */}
//       <div className="flex items-center justify-between px-4 pb-2">
//         <span className="text-sm text-gray-400">Recents</span>
//         <button className="p-1 hover:bg-gray-800 rounded transition-colors">
//           <ArrowUpDown className="w-4 h-4 text-gray-400" />
//         </button>
//       </div>

//       {/* Content List */}
//       <div className="px-4 space-y-2">
//         {filteredData.map((item) => (
//           <div
//             key={item.id}
//             className="group flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-md transition-colors cursor-pointer"
//             onClick={() => console.log('Clicked playlist:', item.name)}
//           >
//             {/* Icon/Image */}
//             <div className={`w-12 h-12 rounded-md flex items-center justify-center ${item?.bgColor} flex-shrink-0`}>
//               {item.image ? (
//                 <img
//                   src={item?.image}
//                   alt={item.name}
//                   className="w-full h-full object-cover rounded-md"
//                 />
//               ) : (
//                 item.icon || <Music className="w-6 h-6 text-gray-400" />
//               )}
//             </div>

//             {/* Content */}
//             <div className="flex-1 min-w-0">
//               <h3 className="text-white font-medium truncate">{item.name}</h3>
//               <p className="text-sm text-gray-400 truncate">
//                 {item?.type}
//                 {item.songs && ` • ${item.songs} songs`}
//                 {item.creator && ` • ${item.creator}`}
//               </p>
//             </div>

//             {/* Ellipsis Menu Container */}
//             <div className="relative">
//               <button
//                 id={`button-${item.id}`}
//                 onClick={(e) => handleEllipsisClick(e, item.id)}
//                 className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-all duration-200 flex-shrink-0"
//               >
//                 <EllipsisVertical className="w-4 h-4 text-gray-400 hover:text-white" />
//               </button>

//               {/* Dropdown Menu */}
//               {activeDropdown === item.id && (
//                 <div 
//                   id={`dropdown-${item.id}`}
//                   className="absolute right-0 top-8 w-48 bg-gray-800 rounded-md shadow-lg border border-gray-700 z-50"
//                 >
//                   <div className="py-1">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleEditClick(item);
//                       }}
//                       className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors"
//                     >
//                       <Edit className="w-4 h-4 mr-3" />
//                       Edit details
//                     </button>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleDeleteClick(item);
//                       }}
//                       className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4 mr-3" />
//                       Delete playlist
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredData.length === 0 && searchQuery && (
//         <div className="text-center text-gray-400 mt-8">
//           <p>No results found for "{searchQuery}"</p>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           {/* Backdrop */}
//           <div 
//             className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
//             onClick={handleDeleteCancel}
//           />
          
//           {/* Modal */}
//           <div className="relative bg-gray-900 rounded-lg w-full max-w-md mx-4 shadow-2xl border border-gray-700">
//             {/* Header */}
//             <div className="flex items-center justify-between p-6 border-b border-gray-700">
//               <h2 className="text-white text-lg font-semibold">Delete playlist</h2>
//               <button
//                 onClick={handleDeleteCancel}
//                 className="text-gray-400 hover:text-white transition-colors p-1"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* Content */}
//             <div className="p-6">
//               <p className="text-gray-300 mb-4">
//                 Are you sure you want to delete <span className="font-semibold text-white">"{selectedPlaylist?.name}"</span>?
//               </p>
//               <p className="text-sm text-gray-400">
//                 This action cannot be undone.
//               </p>
//             </div>

//             {/* Footer */}
//             <div className="flex justify-end space-x-3 p-6 border-t border-gray-700">
//               <button
//                 onClick={handleDeleteCancel}
//                 className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDeleteConfirm}
//                 className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-medium"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Library;

import React, { useEffect, useState, useRef } from 'react';
import { Search, Plus, ArrowUpDown, Heart, Music, User, EllipsisVertical, Trash2, Edit, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaylist } from '../redux/users/playlistSlice';

const Library = () => {
  const [activeTab, setActiveTab] = useState('Playlists');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { playlists } = useSelector((state) => state.userPlaylist)
  console.log("playlist", playlists);

  useEffect(() => {
    const fetchPlaylists = async () => {
      await dispatch(getPlaylist()).unwrap();
    };
    fetchPlaylists();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close dropdown if clicking outside
      if (activeDropdown !== null) {
        const dropdownElement = document.getElementById(`dropdown-${activeDropdown}`);
        const buttonElement = document.getElementById(`button-${activeDropdown}`);
        
        if (dropdownElement && buttonElement) {
          if (!dropdownElement.contains(event.target) && !buttonElement.contains(event.target)) {
            setActiveDropdown(null);
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const artists = [
    {
      id: 1,
      name: 'Kalabhavan Mani',
      type: 'Artist',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=center',
      bgColor: 'bg-gray-700'
    },
    {
      id: 2,
      name: 'Vineeth Sreenivasan',
      type: 'Artist',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=center',
      bgColor: 'bg-gray-700'
    },
    {
      id: 3,
      name: 'Kailash Kher',
      type: 'Artist',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&crop=center',
      bgColor: 'bg-gray-700'
    }
  ];

  const currentData = activeTab === 'Playlists' ? playlists : artists;

  const filteredData = currentData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEllipsisClick = (e, itemId) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Clicked ellipsis for item:', itemId);
    
    if (activeDropdown === itemId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(itemId);
    }
  };

  const handleDeleteClick = (item) => {
    setSelectedPlaylist(item);
    setShowDeleteModal(true);
    setActiveDropdown(null);
  };

  const handleDeleteConfirm = () => {
    // Add your delete playlist logic here
    console.log('Deleting playlist:', selectedPlaylist.name);
    // dispatch(deletePlaylist(selectedPlaylist.id));
    setShowDeleteModal(false);
    setSelectedPlaylist(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSelectedPlaylist(null);
  };

  const handleEditClick = (item) => {
    console.log('Edit playlist:', item.name);
    setActiveDropdown(null);
  };

  return (
    <div className=" fixed left-0 min-h-screen w-80 bg-gray-900 border-r border-gray-800 
        transform transition-transform duration-300 ease-in-out text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-2">
        <h1 className="text-2xl font-bold">Your Library</h1>
        <div className="flex items-center space-x-2">
          <button onClick={() => navigate("/addPlaylist")} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Plus className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <ArrowUpDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex space-x-2 px-4 pb-4">
        {['Playlists', 'Artists'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === tab
                ? 'bg-gray-800 text-white'
                : 'bg-transparent text-gray-400 hover:text-white'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search in Your Library"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Recents Header */}
      <div className="flex items-center justify-between px-4 pb-2">
        <span className="text-sm text-gray-400">Recents</span>
        <button className="p-1 hover:bg-gray-800 rounded transition-colors">
          <ArrowUpDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Content List */}
      <div className="px-4 space-y-2">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="group flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-md transition-colors cursor-pointer"
            onClick={() => console.log('Clicked playlist:', item.name)}
          >
            {/* Icon/Image */}
            <div className={`w-12 h-12 rounded-md flex items-center justify-center ${item?.bgColor} flex-shrink-0`}>
              {item.image ? (
                <img
                  src={item?.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                item.icon || <Music className="w-6 h-6 text-gray-400" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium truncate">{item.name}</h3>
              <p className="text-sm text-gray-400 truncate">
                {item?.type}
                {item.songs && ` • ${item.songs} songs`}
                {item.creator && ` • ${item.creator}`}
              </p>
            </div>

            {/* Ellipsis Menu Container */}
            <div className="relative">
              <button
                id={`button-${item.id}`}
                onClick={(e) => handleEllipsisClick(e, item.id)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-all duration-200 flex-shrink-0"
              >
                <EllipsisVertical className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>

              {/* Dropdown Menu */}
              {activeDropdown === item.id && (
                <div 
                  id={`dropdown-${item.id}`}
                  className="absolute right-0 top-8 w-48 bg-gray-800 rounded-md shadow-lg border border-gray-700 z-50"
                >
                  <div className="py-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(item);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors"
                    >
                      <Edit className="w-4 h-4 mr-3" />
                      Edit details
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(item);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-3" />
                      Delete playlist
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && searchQuery && (
        <div className="text-center text-gray-400 mt-8">
          <p>No results found for "{searchQuery}"</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
            onClick={handleDeleteCancel}
          />
          
          {/* Modal */}
          <div className="relative bg-gray-900 rounded-lg w-full max-w-md mx-4 shadow-2xl border border-gray-700">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-white text-lg font-semibold">Delete playlist</h2>
              <button
                onClick={handleDeleteCancel}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-300 mb-4">
                Are you sure you want to delete <span className="font-semibold text-white">"{selectedPlaylist?.name}"</span>?
              </p>
              <p className="text-sm text-gray-400">
                This action cannot be undone.
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-700">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;