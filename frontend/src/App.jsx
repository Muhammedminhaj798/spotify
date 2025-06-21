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



const App = () => {
  return (
    <>
      <>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/otpSection' element={<OtpComp />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/createPass' element={<CreatePassword />} />
          <Route path='/profileinfo' element={<ProfileInfo />} />
          <Route path='/terms&conditions' element={<Terms />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </>
      <>
        <Routes>
          <Route path='/admin_dashboard' element={<Dashboard />} />
          <Route path='/admin_users' element={<Users />} />
          <Route path='/admin_songs' element={<AdminSongs/>}/>
          <Route path='/admin_artist' element={<AdminArtist/>}/>
        </Routes>

      </>
    </>
  );
}

export default App;
