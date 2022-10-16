import React, { useState } from 'react';
import gcmateLogo from '../img/GCMateIcon.png';
import MouseIcon from '../img/CompMouse.png';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './PhoneEnter.css';

const PhoneEnter = () => {
    const [phoneNum, setPhoneNum] = useState(null);
    /* validRIN = 0 --> Phone number hasn't been inputted yet, Display original text 
     * validRIN = 1 --> Phone number, Display "Invalid phone number" text
     * validRIN = 2 --> Phone number is valid, Go to Phone Number Validation page 
     */
    const [validPhoneNum, setValidPhoneNum] = useState(0); 
    // Checks whether the user's mouse is hovering over an object or not 
    const [hover, setHover] = useState(false); 
    const [test, setTest] = useState(0); 

    function checkValidPhoneNum() {
        if (phoneNum.length < 10) { setValidPhoneNum(1) }
        else { setValidPhoneNum(2) }
    }

    function boop() { 
        setTest(1);
    }
    function foo() {
        setTest(2);
    }

    return (
        <div className="PhoneEnter" style={{
          position: 'absolute',
          backgroundImage: 'url('+gcmateLogo+')',
          backgroundSize: "cover",
          height: "721px",
          width: "1535px" 
        }}>
          
          <div className="Title"><h1> Almost 
            <span className="LastWord"> there...</span> </h1></div> 
    
          <div className="Prompt"> 
              {validPhoneNum === 0 && <h2 className="PromptText">
                Please enter your <span className="PN">phone number </span></h2> }
              {validPhoneNum === 1 && <h2 className="PromptTextInvalid">Invalid phone number. Please try again. </h2>}
          
          </div>
          
          <PhoneInput className="PhoneTextInput"
            onlyCountries={['us']}
            country={'us'}
            value={phoneNum}
            onChange={setPhoneNum}/>
            
          {<button onClick={()=> {checkValidPhoneNum();} }> SUBMIT </button>}
          
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

export default PhoneEnter;