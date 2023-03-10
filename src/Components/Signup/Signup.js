import React, { useEffect, useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Signup.css';
import Loading from '../loading/loading';
import ErrorAlert from '../ErrorAlert/ErrorAlert';

function Signup() {
  const passwordRegex = /^[a-zA-Z0-9]{8,16}$/
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(?:\+91|0)?[6789]\d{9}$/

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const { user, signUp } = UserAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!usernameRegex.test(username)) {
        setErrMsg('Please enter a valid username');
        setShowErr(true)
        return false
      } else if (!emailRegex.test(email)) {
        setErrMsg('Please enter a valid email');
        setShowErr(true)
        return false
      } else if (!phoneRegex.test(phone)) {
        setErrMsg('Please enter a valid phonenumber');
        setShowErr(true)
        return false
      } else if (!passwordRegex.test(password)) {
        if(password.length < 8){
          setErrMsg('Password must contain 8 characters');
        } else{
          setErrMsg('Spaces not allowed in password');
        }
        setShowErr(true)
        return false
      } else {
        setShowErr(false)
        setIsloading(true)
        await signUp(email, password, username, phone)
        navigate('/')
        setIsloading(false)
      }
    } catch (error) {
      setIsloading(false)
      setErrMsg('something went wrong! Please try again')
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
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        {
          isLoading && <Loading />
        }
        {
          showErr && <ErrorAlert errMsg={errMsg} />
        }
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            placeholder="John"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            placeholder="jhon@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            placeholder="9876543210"
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            placeholder='********'
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}

export default Signup