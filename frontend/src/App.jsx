import React from 'react';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import { CreatePassword, ProfileInfo, Signup, Terms } from './pages/Signup';
// import Terms from './pages/Signup';
import Home from './pages/Home';
import Dashboard from './admin/Dashboard';
import OtpComp from './pages/OtpComp';
import Users from './admin/users';
import AdminSongs from './admin/AdminSongs';
import AdminArtist from './admin/AdminArtist';
import AdminLogin from './admin/AdminLogin';
import LoginWithPassword from './pages/LoginWithPassword';
import Navbar from './components/Navbar';
import Library from './pages/Library';
import AddPlaylist from './pages/AddPlaylist';
import HomePage from './pages/HomePage';



const App = () => {
  const admin = localStorage.getItem("isAdmin")
  return (
    <>
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
          </Route>
          <Route path='/loginWithPass' element={<LoginWithPassword />} />
          <Route path='/adminLogin' element={<AdminLogin />} />
          <Route path='/addPlaylist' element={<AddPlaylist />} />

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
            </Routes>
          </>
        }
      </>
    </>
  );
}

export default App;
