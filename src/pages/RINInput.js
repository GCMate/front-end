import React, { useState } from 'react';
import gcmateLogo from '../img/GCMateIcon.png';
import MouseIcon from '../img/CompMouse.png';
import './RINInput.css';
import {BrowserRouter as Router, Link} from 'react-router-dom';

const RINInput = () => {
    const [rin, setRIN] = useState(null);
    // Checks whether the user's mouse is hovering over an object or not 
    const [hover, setHover] = useState(false); 
  
    // Get the user's typed in RIN 
    function getRIN(val) {
      setRIN(val.target.value)
    }    

    return (
        
        <div className="RINInput" style={{
          position: 'absolute',
          backgroundImage: 'url('+gcmateLogo+')',
          backgroundSize: "cover",
          height: "721px",
          width: "1535px" 
        }}>
          
          <div className="Title"><h1> Welcome to  
            <span className="LastWord"> GCMate</span>! </h1></div> 
    
          <div className="Prompt"> <h2 className="PromptText">Please enter your RIN</h2></div>
          <div className="Input"> 
              <input type="text" onChange={getRIN}/> 
              <button onClick={()=>setRIN(true)}> SUBMIT </button>
          </div>
          <div className="LearnIcon" > 
            <Link to="/about">
            <img 
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              src={MouseIcon} width="40" alt="mouse"/>
              </Link>
            { hover && 
              (<h1> LEARN MORE </h1>)}
    
          </div>
          
        </div>
        
      );    
};

export default RINInput;