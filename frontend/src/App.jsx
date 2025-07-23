import React from 'react';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import { CreatePassword, ProfileInfo, Signup, Terms } from './pages/Signup';
// import Terms from './pages/Signup';
import Home from './pages/Home';
import Dashboard from './admin/Dashboard';
import OtpComp from './pages/OtpComp';
import Users from './admin/Users';
import AdminSongs from './admin/AdminSongs';
import AdminArtist from './admin/AdminArtist';
import AdminLogin from './admin/AdminLogin';
import LoginWithPassword from './pages/LoginWithPassword';
// import Navbar from './components/Navbar';
import AddPlaylist from './pages/AddPlaylist';
import HomePage from './pages/HomePage';
import AdminArtistEdit from './admin/AdminArtistEdit';
import Profile from './pages/Profile';
import ShowAllArtist from './pages/ShowAllArtist';
import ViewPlaylist from './pages/ViewPlaylist';
import SongFullScreen from './pages/SongFullScreen';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import ArtistSongs from './pages/ArtistSongs';



const App = () => {
  const admin = localStorage.getItem("isAdmin")
  return (
    <>

      <ToastContainer
        position="top-right"      // Position (top-left, top-right, bottom-left, bottom-right)
        autoClose={3000}          // Auto close after 3 seconds
        hideProgressBar={false}   // Show progress bar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"           // or "light", "dark"
      />
      <>
        {!admin && <Navbar />}
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/otpSection' element={<OtpComp />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/createPass' element={<CreatePassword />} />
          <Route path='/profileinfo' element={<ProfileInfo />} />
          <Route path='/terms&conditions' element={<Terms />} />
          <Route path='/' element={<Home />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/AllArtist' element={<ShowAllArtist />} />
            <Route path='/viewPlaylist/:id' element={<ViewPlaylist />} />
            <Route path='/viewArtistSongs/:id' element={<ArtistSongs />} />
          </Route>

          <Route path='/loginWithPass' element={<LoginWithPassword />} />
          <Route path='/adminLogin' element={<AdminLogin />} />
          <Route path='/addPlaylist' element={<AddPlaylist />} />
          <Route path='/SongFullScreen' element={<SongFullScreen />} />

        </Routes>
      </>

      <>
        {admin &&
          <>
            <Routes>
              <Route path='/admin_dashboard' element={<Dashboard />} />
              <Route path='/admin_users' element={<Users />} />
              <Route path='/admin_songs' element={<AdminSongs />} />
              <Route path='/admin_artist' element={<AdminArtist />} />
              <Route path='/admin_artist_edit/:id' element={<AdminArtistEdit />} />

            </Routes>
          </>
        }
      </>
    </>
  );
}

export default App;
