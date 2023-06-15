import React, { useContext ,useState} from 'react'
import Navbaar from '../../components/Navbar/Navbaar'
import './Home.css'
import toast from 'react-hot-toast'
import { Context, server } from '../../main'
import axios from 'axios'
import Loder from '../../components/Loder/Loder'

function Home() {
  const {user,isAuthenticated,loading} = useContext(Context)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loader,setLoader]= useState(false)
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Validation checks
    if (!title.trim() || !description.trim()) {
      return;
    }
    try {
      setLoader(true)
      const data = await axios.post(`${server}/task/new`,{
        title,
        description
      }, 
      {
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      toast.success(data.message)
      setTitle("")
      setDescription("")
      setLoader(false)
    } catch (error) {
      toast.error(data.message)
      setTitle("")
      setDescription("")
      setLoader(false)
    }
    
  }
  return loading?(<Loder></Loder>):(

    <div>
      <Navbaar></Navbaar>
      <form className="todo-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <button type="submit" onClick={handleSubmit} disabled={loader}>Add Todo</button>
    </form>
      
    </div>
  )
}

export default Home
