import React, { useContext ,useState,useEffect} from 'react'
import Navbaar from '../../components/Navbar/Navbaar'
import './Home.css'
import toast from 'react-hot-toast'
import { Context, server } from '../../main'
import axios from 'axios'
import Loader from '../../components/Loder/Loder'
import TodoIteam from '../../components/TodoIteam/TodoIteam'
function Home() {
  const {user,isAuthenticated,loading} = useContext(Context)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loder,setloder]= useState(false)
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loader, setloader] = useState(false);
  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Validation checks
    if (!title.trim() || !description.trim()) {
      return;
    }
    try {
      setloder(true)
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
      setloder(false)
    } catch (error) {
      toast.error(data.message)
      setTitle("")
      setDescription("")
      setloder(false)
    }
    
  }
  
  useEffect(() => {
    axios
      .get(`${server}/task/mytask`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);
 
  return loading?(<Loader></Loader>):(

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
      <button type="submit" onClick={handleSubmit} disabled={loder}>Add Todo</button>
    </form>
    <section className="todosContainer">
        {tasks?tasks.map((i) => (
          <TodoIteam
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
          />
        )):null}
      </section>
    </div>
  )
}

export default Home
