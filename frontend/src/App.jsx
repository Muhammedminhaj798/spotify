import React from 'react';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import { CreatePassword, ProfileInfo, Signup, Terms } from './pages/Signup';
// import Terms from './pages/Signup';
import Home from './pages/Home';
import Dashboard from './admin/Dashboard';
import OtpComp from './pages/OtpComp';


const App = () => {
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/otpSection' element={<OtpComp/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/createPass' element={<CreatePassword/>}/>
      <Route path='/profileinfo' element={<ProfileInfo/>}/>
      <Route path='/terms&conditions' element={<Terms/>}/>
      <Route path='/' element={<Home/>}/>

      <Route path='/admin_dashboard' element={<Dashboard/>}/> 
    </Routes>

    </>
  );
}

export default App;
