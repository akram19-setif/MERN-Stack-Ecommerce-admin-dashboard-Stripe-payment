import React, { useState } from "react";
// import logo from "./assets/logo.png";
import "./login.css";
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [password, setUserPassword] = useState("");
  const { isFetching, error, loading } = useSelector((state) => state?.user);

  const handleLogin = (e) => {
    e.preventDefault();

    login(dispatch, { username, password });
  };

  return (
    <div className='container'>
      <div className='login-admin'>
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
          {error && <div className='error'>{error}</div>}
          <div className='login-btn-container'>
            <button
              className='primary login'
              type='submit'
              disabled={isFetching || loading}
              onClick={handleLogin}
            >
              Login
            </button>
            <Link to={""}>DO NOT YOU REMEMBER THE PASSWORD?</Link>
            <span className='or'>OR</span>
            <span className="text_new_account">
              don't have an account?
              <Link  to={"/newUser"}> CREATE A NEW ACCOUNT</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
