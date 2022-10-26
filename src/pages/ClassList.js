import React, { useState } from 'react';
import gcmateLogo from '../img/GCMateIcon.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './ClassList.css';

const ClassList = () => {
    return (
        <div className="ClassList" style={{
            position: 'absolute',
            backgroundImage: 'url('+gcmateLogo+')',
            backgroundSize: "cover",
            height: "721px",
            width: "1535px"}}>

        <div className="ClassListTitle"> 
            <h1 class="display-4"> <span className="TitleText">Class List</span></h1>
        </div>
        
        
    </div>
    );
};

export default ClassList; 
