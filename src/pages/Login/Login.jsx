import React, { useState, useContext,useEffect } from "react";
import "../Register/register.css";
import axios from "axios";
import { server } from "../../main";
import toast from "react-hot-toast";
import Navbaar from "../../components/Navbar/Navbaar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
function Register() {
  const { isAuthenticated, setisAuthenticated,loder,setLoder } = useContext(Context);
  const navigate = useNavigate();
  const [pasword, setPassword] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [isAuthenticated]);
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    setLoder(true)
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/user/login`,
        {
          email,
          pasword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: "include",
        }
      );
      toast.success(data.message);
      setisAuthenticated(true);
      setLoder(false)
    } catch (error) {
      toast.error(error.response.data.message);
      setLoder(false)
    }

    // Handle form submission logic here
  };
  if (isAuthenticated) return navigate("/");
  return (
    <>
      <Navbaar></Navbaar>
      <div className="register-container">
        <h2>Login</h2>
        <form className="register-form" onSubmit={handleSubmit}>
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

          {}
          <button type="submit" onClick={handleSubmit} disabled={loder}>
            Login
          </button>
        </form>
        <Link to="/register">If you are new create account first</Link>
      </div>
    </>
  );
}

export default Register;
