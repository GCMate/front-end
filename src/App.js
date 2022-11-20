import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import RINInput from "./pages/RINInput"
import About from "./pages/About";
import PhoneEnter from "./pages/PhoneEnter"
import ClassList from './pages/ClassList';
import GroupChat from './pages/GroupChat';
<<<<<<< HEAD
import Chat from './pages/Chat'; 
=======
>>>>>>> bcb3d0a150d647732e51589ee63b3e5e34db086f

const App = () => {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<RINInput />} />
        <Route path="about" element={<About />} />
        <Route path="phoneEnter" element={<PhoneEnter />} />
        <Route path="classList" element={<ClassList />} />
        <Route path="groupChat" element={<GroupChat />} />
<<<<<<< HEAD
        <Route path="chat" element={<Chat />} />
=======
>>>>>>> bcb3d0a150d647732e51589ee63b3e5e34db086f
      </Routes>
    </Router>
  );
};


export default App;