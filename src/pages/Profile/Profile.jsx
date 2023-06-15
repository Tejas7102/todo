import React from 'react'
import Navbaar from '../../components/Navbar/Navbaar'
import { Context } from '../../main'
import { useContext } from 'react'
import './profile.css'
import Loder from '../../components/Loder/Loder'
function Profile() {
  const {isAuthenticated,user,loading} = useContext(Context)
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
