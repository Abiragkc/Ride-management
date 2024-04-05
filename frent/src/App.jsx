import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Page/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Page/Login'

import Profile from './Page/Profile';
import Register from './Page/Register';
import Adminpanal from './Page/Adminpanal';
import TechncianReg from './Page/TechncianReg';
import Banner from './Banner';

function App() {


  return (
    <>
      <BrowserRouter>
      <Banner/>
        <Routes>
          <Route path='/home' element={<Home />}></Route>
         <Route path='/register'element={<Register/>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/profile'element={<Profile/>}></Route>
          <Route path='/admin'element={<Adminpanal></Adminpanal>}></Route>
          <Route path='/techReg'element={<TechncianReg></TechncianReg>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
