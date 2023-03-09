import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext';
import Signup from './Pages/Signup'
import Home from './Pages/Home';
import Login from './Components/Login/Login';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
