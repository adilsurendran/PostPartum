import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login';
import { Route, Routes } from 'react-router-dom';
import MotherRegistration from './pages/mother/motherregistration';
import MotherHome from './pages/mother/MotherHome';
import MemberRegistration from './pages/family/memberregistration';
import MemberHome from './pages/family/MemberHome';
import AdminHome from './pages/admin/AdminHome';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/motherreg' element={<MotherRegistration/>}></Route>
      <Route path='/memberreg' element={<MemberRegistration/>}></Route>
      <Route path='/motherhome' element={<MotherHome/>}></Route>
      <Route path='/memberhome' element={<MemberHome/>}></Route>
      <Route path='/adminhome' element={<AdminHome/>}></Route>
      </Routes>
  )
}

export default App
