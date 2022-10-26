import React, { useState } from 'react';
import gcmateLogo from '../img/GCMateIcon.png';

const ClassList = () => {
    return (
        <div className="ClassList" style={{
            position: 'absolute',
            backgroundImage: 'url('+gcmateLogo+')',
            backgroundSize: "cover",
            height: "721px",
            width: "1535px"}}>

        <div className="Title"> 
            <h2> <span className="TitleText">Class List</span></h2>
        </div>
        
        
    </div>
    );
};

export default ClassList; 
