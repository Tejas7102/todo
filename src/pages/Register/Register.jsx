import React, { useState,useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import axios from 'axios';
import { server } from '../../main';
import toast from 'react-hot-toast'
import Navbaar from '../../components/Navbar/Navbaar';
import { Context } from '../../main';
function Register() {
  const navigate= useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pasword, setPassword] = useState('');
  const {isAuthenticated,setisAuthenticated,loder,setLoder} = useContext(Context)
  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [isAuthenticated]);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async(event) => {
    setLoder(true)
    event.preventDefault();
    try {
      const {data}=await axios.post(`${server}/user/new`,{
        name,
        email,
        pasword
      },{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      
      toast.success(data.message)
      setisAuthenticated(true);
      setLoder(false)
    } catch (error) {
      toast.error(error.response.data.message)
      setLoder(false)
    }
    
    // Handle form submission logic here
  };
  return (
    <>
    <Navbaar></Navbaar>
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={pasword}
          onChange={handlePasswordChange}
          required
        />

        <button type="submit" disabled={loder}>Register</button>
      </form>
    </div>
    </>
  );
}

export default Register
