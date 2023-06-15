import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createContext } from 'react'
export const server = 'https://todoapp-jkfs.onrender.com/api/v1'

export const Context  = createContext({isAuthenticated:false,user:{}})
const AppWrapper =()=>{
  const [isAuthenticated,setisAuthenticated]=useState(false)
  const [loder,setLoder]=useState(false)
  const [user,setUser]=useState({})
  const [loading,setLoading]=useState(false)
  return(
  <Context.Provider
  value={{
    isAuthenticated,
    setisAuthenticated,
    user,
    setUser,
    loder,
    setLoder,
    loading,
    setLoading
  }}
  >
    <App />
  </Context.Provider>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper/>
    
  </React.StrictMode>,
)
