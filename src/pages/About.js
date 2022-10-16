import React, { useState } from 'react';
import gcmateLogo from '../img/GCMateIcon.png';
import speech1 from '../img/Speech1.png'; 
import speech2 from '../img/SpeechRight.png';
import './About.css'

const About = () => {
    return (
        <div className="About" style={{
            position: 'absolute',
            backgroundImage: 'url('+gcmateLogo+')',
            backgroundSize: "cover",
            height: "721px",
            width: "1535px"}}>

        <div className="Title"> 
            <h2> <span className="TitleText">About</span></h2>
        </div>
        <div className="SpeechBox1"> <img src={speech1} width="600" alt="box1" /> </div>
        <div className="SpeechBox2"> <img src={speech2} width="570" alt="box2" /> </div>
        
    </div>
    );
};

// <div className="SpeechBox2"> <img src={speech2} width="570" alt="box2" /> </div>
export default About; 