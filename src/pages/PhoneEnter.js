import React, { useEffect, useState } from 'react';
import gcmateLogo from '../img/GCMateIcon.png';
import MouseIcon from '../img/CompMouse.png';
import {useLocation, useNavigate, Navigate, BrowserRouter as Router, Link} from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'
import { authentication } from '../firebase-config';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Button from 'react-bootstrap/Button';
import 'react-phone-input-2/lib/style.css'
import './PhoneEnter.css';

const PhoneEnter = () => {
    // Get RIN from RINInput page 
    const navigate = useNavigate();
    const {state} = useLocation();
    const { rin } = state; 

    const [phoneNum, setPhoneNum] = useState(null);
    /* validRIN = 0 --> Phone number hasn't been inputted yet, Display original text 
     * validRIN = 1 --> Phone number invalid, Display "Invalid phone number" text
     * validRIN = 2 --> Phone number is valid, Go to Phone Number Validation page 
     */
    const [validPhoneNum, setValidPhoneNum] = useState(0); 
    // Code used for phone number verification 
    const [otp, setOTP] = useState('');
    // Checks whether the user's mouse is hovering over an object or not 
    const [hover, setHover] = useState(false); 
    // Used to change text prompt if user inputs incorrect OTP 
    const [incorrectOTP, setIncorrectOTP] = useState(false); 
    const [nextPage, setNextPage] = useState(false); 

    function checkValidPhoneNum() {
        if (phoneNum.length !== 11) { setValidPhoneNum(1); }
        else { 
          let finalPhoneNum = "+" + phoneNum; 
          setValidPhoneNum(2); 
          window.recaptchaVerifier = new RecaptchaVerifier('otpRegister', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
          }, authentication); 
          signInWithPhoneNumber(authentication, finalPhoneNum,  window.recaptchaVerifier)
          .then(confirmationResult => {
            window.confirmationResult = confirmationResult;
          }).catch((error) => {
            // Error; SMS not sent
            console.log(error); 
          });
        }
    }

    const verifyOTP = (e) => {
      let pin = e.target.value; 
      setOTP(pin); 

      if (pin.length === 6) { 
        // Check correctness of OTP
        let confirmationResult = window.confirmationResult; 
        confirmationResult.confirm(pin).then((result) => {
          // User signed in successfully.
          const user = result.user;
          
          const jsonData = { RIN: rin, PHONE: phoneNum }

          fetch('http://127.0.0.1:5000/api/phoneRIN', {  // Enter your IP address here

          method: 'POST', 
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify(jsonData) // body data type must match "Content-Type" header

          }).then((response) => response.json())
          .catch((err) => { console.log(err.message);});
          
          navigate('/classList', { state: { user_rin: rin } });
          
        }).catch((error) => {
          // Prompt user to try again 
          setIncorrectOTP(true);
        });
      }
    }

    return (
        <div className="PhoneEnter" style={{
          position: 'absolute',
          backgroundImage: 'url('+gcmateLogo+')',
          backgroundSize: "cover",
          height: "100%", 
          width: "100%"
        }}>
          
          {nextPage && <Navigate replace to="/classList"/>}
          <div className="Title"><h1 className="display-2"> Almost 
            <span className="LastWord1"> there...</span> </h1></div> 
    
          <div className="Prompt" style={{height: '10vh'}}> 
              {!incorrectOTP && validPhoneNum === 0 && <h2 className="PromptText">
                Please enter your <span className="PN">phone number </span></h2> }
              {!incorrectOTP && validPhoneNum === 1 && <h2 className="PromptTextInvalid">
                Invalid phone number. Please try again. </h2>}
              {!incorrectOTP && validPhoneNum === 2 && 
              <h2 className="PromptText"> Please enter your 
                <span className="LastWord3"> verification code</span> </h2>}
              {incorrectOTP && validPhoneNum === 2 && 
              <h2 className="PromptTextInvalid">Invalid OTP. Please try again. </h2>}
          </div>
          
          <div className="PhoneTextInput" style={{position: 'absolute', left: '40%'}}>
          { validPhoneNum !== 2 && 
          <PhoneInput 
            onlyCountries={['us']}
            country={'us'}
            value={phoneNum}
            onChange={setPhoneNum}/> }

            {validPhoneNum !== 2 && 
              <Button variant="success" className="PhoneSubmitButton" 
                onClick={()=> {checkValidPhoneNum();} }> SUBMIT </Button> }
            </div>

            {validPhoneNum === 2 && 
              <input type="number" value={otp} onChange={verifyOTP}/> }
          
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
          
          <div id="otpRegister"> </div>
        </div>
        
        
      );    
};

export default PhoneEnter;