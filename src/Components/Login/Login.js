import React, { useEffect, useState} from 'react';
import { UserAuth } from '../../context/AuthContext';
import {useNavigate } from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Login.css';
import { async } from '@firebase/util';
import ErrorAlert from '../ErrorAlert/ErrorAlert';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [showErr, setShowErr] = useState(false)
  const {user, logIn} = UserAuth()
  const navigate = useNavigate()


  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(email === '' || email === undefined || email === null){
        setErrMsg('Please enter email address')
        setShowErr(true)
        return false
      } else if (!emailRegex.test(email)) {
        setErrMsg('Please enter a valid email address.');
        setShowErr(true)
        return false;
      } else if (password === '' ||password == undefined || password === null){
        setErrMsg('Please enter password')
        setShowErr(true)
        return false
      } else {
        await logIn(email, password)
        setShowErr(true)
        navigate('/')
      }
    } catch (error) {
      if(error.code == 'auth/wrong-password'){
        setErrMsg('The password you entered is incorrect')
      } else if (error.code == 'auth/user-not-found') {
        setErrMsg('User Does not exist')
      } else {
        setErrMsg('something went wrong! Please try again')
      }
      setShowErr(true)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      showErr && setShowErr(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [showErr])
  

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        {
          showErr && <ErrorAlert errMsg = {errMsg}/>
        }
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="email"
            placeholder="John"
            onChange={(e)=> setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            placeholder="*******"
            onChange={(e)=> setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
