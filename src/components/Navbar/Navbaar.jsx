import React, { useContext } from 'react'
import './navbaar.css'
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import {FaBars, FaTimes} from "react-icons/fa";
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast'
import { server } from '../../main';
export default function Navbaar() {
  const {isAuthenticated,setisAuthenticated,loder,setLoder} = useContext(Context)
  console.log(isAuthenticated)
  const navRef = useRef();
    const navigate = useNavigate();
  const displaymenue=()=>{
    navRef.current.classList.toggle("responsive_nav")
  }
  // console.log(user.email);
  
  const home=()=>{
    navigate('/')
  }
  const logout = async() => {
    setLoder(true)
    try {
      console.log(1)
      const {data}=await axios.get(`${server}/user/logout`,{
        withCredentials:true,
      })
      setisAuthenticated(false)
      toast.success(data.message)
      setLoder(false)
      navigate('/')
    } catch (error) {
      toast.error(error.response.data.message)
      setLoder(false)
    }
    
    // Handle form submission logic here
  };
  const Login=()=>{
    navigate('/login')
  }
  
  const profile=()=>{
    navigate('/profile')
  }
  return (
    <div className='containerH'>
       <header className="Header1">
       <div className="mobileview">
            <button className='menu' onClick={displaymenue}>
              {<FaBars/>}
              </button>          
        </div>
        <nav className="nav1">
           <button className='b1' onClick={home}>TODO</button>
        </nav>
        <nav className="right"  ref={navRef}>
          <button className='b1' onClick={home}>Home</button>
          <button className='b1' onClick={profile}>Profile</button>
          {isAuthenticated?(<button className='b1' onClick={logout} disabled={loder}>Log out</button>):(<button className='b1' onClick={Login}>Log in</button>)}
          
          <button className='menu' onClick={displaymenue} >
          <FaTimes />
          </button>
          
        </nav>
        
    </header>
        
        </div>
  )
}


