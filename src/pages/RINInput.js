import React, { useState, useEffect } from 'react';
import gcmateLogo from '../img/GCMateIcon.png';
import MouseIcon from '../img/CompMouse.png';
import {Navigate, BrowserRouter as Router, Link} from 'react-router-dom';
import './RINInput.css';

const RINInput = () => {
    const [rin, setRIN] = useState(null);
    /* validRIN = 0 --> RIN hasn't been inputted yet, Display original text 
     * validRIN = 1 --> RIN is invalid, Display "Invalid RIN" text
     * validRIN = 2 --> RIN is valid, Go to Phone Number Input page 
     */
    const [validRIN, setValidRIN] = useState(0); 
    const [nextPage, setNextPage] = useState(false);
    // Checks whether the user's mouse is hovering over an object or not 
    const [hover, setHover] = useState(false); 
  
    // Get the user's typed in RIN 
    function getRIN(val) {
      setRIN(val.target.value)
    }    

    // Checks if the RIN is integer 
    // + CHANGE LATER TO WORK WITH BACKEND 
    function isInt(val) {
      return !isNaN(+val);
    }

    function checkValidRIN(r) {
      if (isInt(r)) {
        // Valid RIN 
        if (r.length === 9) { 
          
          const jsonData = {
            RIN: "661878609", 
          }
          
          fetch('http://localhost:5000/api/rin', {  // Enter your IP address here

          method: 'POST', 
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify(jsonData) // body data type must match "Content-Type" header

          }).then((response) => response.json())
          .then(data => console.log(data))
          .catch((err) => { console.log(err.message);});
          /**/
          setNextPage(true);
        } else {
          setValidRIN(1);
        }
      }
      
      else { setValidRIN(1); }
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
    
          <div className="Prompt"> 
              {validRIN === 0 && <h2 className="PromptTextRIN">Please enter your RIN</h2> }
              {validRIN === 1 && <h2 className="PromptTextInvalid">Invalid RIN. Please try again. </h2>}
              
          </div>
          <div className="Input"> 
              <input type="text" onChange={getRIN}/> 
              <button onClick={()=> {setRIN(true); checkValidRIN(rin);} }> SUBMIT </button>
              {nextPage && <Navigate replace to="/phoneEnter"/>}
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