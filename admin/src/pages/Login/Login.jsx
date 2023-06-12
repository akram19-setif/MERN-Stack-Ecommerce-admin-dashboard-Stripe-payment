import React, { useState } from "react";
// import logo from "./assets/logo.png";
import "./login.css";
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Login = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    alert("Goes to registration page");
  };
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [password, setUserPassword] = useState("");
  // const { isFetching, error } = useSelector((state) => state?.user);
  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div className='login-admin'>
      {/* <img src={logo} className="logo" alt="Business view - Reports" /> */}
      <form className='form'>
        <div className='input-group'>
          <label htmlFor='email'>UserName</label>
          <input
            type='text'
            name='userName'
            placeholder='your Name'
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className='input-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>
        <button
          className='primary login'
          // disabled={isFetching}
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
      {/* {error && <p>your Name or Password is incorrect!</p>} */}
      <Link to={""}>DO NOT YOU REMEMBER THE PASSWORD?</Link>
      <button
        className='secondary new-account'
        onClick={handleRegister}
      >
        Create a new Account
      </button>
    </div>
  );
};

export default Login;
