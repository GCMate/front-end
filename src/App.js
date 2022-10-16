import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import gcmateLogo from './img/GCMateIcon.png';
import MouseIcon from './img/CompMouse.png';
import RINInput from "./pages/RINInput"
import About from "./pages/About";
import './App.css';


const App = () => {
  
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<RINInput />} />
        <Route path="about" element={<About />} />
      </Routes>
    </Router>
  );
};


export default App;