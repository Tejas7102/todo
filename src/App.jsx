import React, { useContext } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import { Toaster } from "react-hot-toast";

import { useEffect } from "react";
import axios from "axios";
import { server } from "./main.jsx";
import { Context } from "./main.jsx";
function App() {
  const {setUser,setisAuthenticated,setLoading} = useContext(Context)
  useEffect(() => {
    setLoading(true)
    axios.get(`${server}/user/me`, { 
      withCredentials: true,
    }).then((res) => {
    setUser(res.data.user); 
    setisAuthenticated(true)
    setLoading(false)
     }) .catch((error) => { setUser({});
    setisAuthenticated(false)
    setLoading(false)
    });
    
    }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>} />  
        <Route path='/login' element={<Login/>} />  
        <Route path='/' element={<Home/>} />  
        <Route path='/profile' element={<Profile/>} />  
      </Routes>  
      <Toaster/>    
    </BrowserRouter>
    
  )
}

export default App
