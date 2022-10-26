import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import RINInput from "./pages/RINInput"
import About from "./pages/About";
import PhoneEnter from "./pages/PhoneEnter"
import ClassList from './pages/ClassList';


const App = () => {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<RINInput />} />
        <Route path="about" element={<About />} />
        <Route path="phoneEnter" element={<PhoneEnter />} />
        <Route path="classList" element={<ClassList />} />
      </Routes>
    </Router>
  );
};


export default App;