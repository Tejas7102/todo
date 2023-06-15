import React from 'react'
import Navbaar from '../../components/Navbar/Navbaar'
import { Context } from '../../main'
import { useContext,useEffect } from 'react'
import './profile.css'
import Loder from '../../components/Loder/Loder'
import axios from "axios";
import { server } from '../../main'
function Profile() {

  const {isAuthenticated,user,loading,setUser,setLoading} = useContext(Context)
  useEffect(() => {
    setLoading(true)
    axios.get(`${server}/user/me`, { 
      withCredentials: true,
    }).then((res) => {
    setUser(res.data.user); 
    setLoading(false)
     }) .catch((error) => { setUser({});
    setLoading(false)
    });
  }, []);
  return loading?(<Loder></Loder>):(
    <>
    <div>
      <Navbaar></Navbaar>
    </div>
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-heading">Profile</h1>
        <div className="profile-info">
          <div className="profile-item">
            <label className="profile-label">Name:</label>
            <p className="profile-value">{user.name}</p>
          </div>
          <div className="profile-item">
            <label className="profile-label">Email:</label>
            <p className="profile-value">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
    </>
    
  )
}

export default Profile
