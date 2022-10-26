import React, { useState } from 'react';
import gcmateLogo from '../img/GCMateIcon.png';
import logoutIcon from '../img/LogoutIcon.png';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './ClassList.css';

const ClassList = () => {
    return (
        <div className="ClassList" style={{
            position: 'absolute',
            backgroundImage: 'url('+gcmateLogo+')',
            backgroundSize: "cover",
            height: "100%", 
            width: "100%"}}>
        
        <Navbar bg="secondary" className="NavbarBackground"  
            style={{position: 'absolute', height: '17vh', width: "100%"}}>
            <Container> </Container>
        </Navbar>
      
        <div className="ClassListTitle" 
            style={{position: 'absolute'}}> 
            <h1 class="display-3"> <span className="TitleText">Class List</span></h1>
        </div>
        
        <Link to="/">
            <Button size="lg" variant="danger" className="LogoutButton" style={{
                position: 'absolute'}}>
                <img src={logoutIcon} alt="add item" width="30" /> Log  Out
            </Button>
        </Link>
        
    </div>
    );
};

export default ClassList; 
