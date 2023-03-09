import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Signup from './Pages/Signup'
import Home from './Pages/Home';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
