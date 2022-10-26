import React, { useState, useEffect } from 'react';
import gcmateLogo from '../img/GCMateIcon.png';
import MouseIcon from '../img/CompMouse.png';
import {Navigate, BrowserRouter as Router, Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './RINInput.css';

const RINInput = () => {
    const [rin, setRIN] = useState(null);
    /* validRIN = 0 --> RIN hasn't been inputted yet, Display original text 
     * validRIN = 1 --> RIN is invalid, Display "Invalid RIN" text
     * validRIN = 2 --> RIN is valid
     */
    const [validRIN, setValidRIN] = useState(0); 
    const [rinData, setRINData] = useState([{}]);
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
          
          const jsonData = { RIN: rin }
          
          fetch('http://localhost:5000/api/rin', {  // Enter your IP address here

          method: 'POST', 
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify(jsonData) // body data type must match "Content-Type" header

          }).then((response) => response.json())
          .then(rinData => {setRINData(rinData) 
                            setValidRIN(2)
                            setNextPage(rinData["valid"] === 'true')})
          .catch((err) => { console.log(err.message);});
          
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
          
          <div className="Title"><h1 class="display-2"> Welcome to  
            <span className="LastWord1"> GCMate</span>! </h1></div> 
    
          <div className="Prompt" style={{height: '10vh'}}> 
              {validRIN === 0 && <h2 className="PromptTextRIN">Please enter your <span className="LastWord2"> RIN </span> </h2> }
              {validRIN === 1 && <h2 className="PromptTextInvalid">Invalid RIN. Please try again. </h2>}
              
          </div>
          <div className="Input"> 
              <input type="text" onChange={getRIN}/> 
              <Button variant="success" className="RINSubmitButton" 
                onClick={()=> {setRIN(true); checkValidRIN(rin);} }> 
                  SUBMIT </Button>
              {nextPage && <Navigate replace to="/phoneEnter"/>}
              {!nextPage && validRIN == 2 && <Navigate replace to="/classList"/>}
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