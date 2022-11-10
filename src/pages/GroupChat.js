import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import gcmateLogo from '../img/GCMateIcon.png';
import logoutIcon from '../img/LogoutIcon.png';
import coursesIcon from '../img/CoursesIcon.png';
import chatIcon from '../img/ChatIcon.png'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './GroupChat.css';

const GroupChat = () => {
    const {state} = useLocation();
    const {user_rin} = state; 
    //const {course} = state; 

    // ===== Show states =====    
    // Show the user's joined group chats 
    const [showJoinedGC, setShowJoinedGC] = useState(false); 
    // ====================    

    return (
        <div className="GroupChat" style={{
            position: 'absolute',
            backgroundImage: 'url('+gcmateLogo+')',
            backgroundSize: "cover",
            height: "100%", 
            width: "100%"}}>

        <Navbar bg="info" className="NavbarBackground"  
            style={{position: 'absolute', height: '17vh', width: "100%"}}>
            <Container> </Container>
        </Navbar>
      
        <div className="GroupChatTitle" 
            style={{position: 'absolute'}}> 
            <h1 className="display-3"> <span className="TitleTextGC">Group Chats</span></h1>
        </div>
        
        <Link to="/">
            <Button size="lg" variant="danger" className="LogoutButton" style={{
                position: 'absolute'}}>
                <img src={logoutIcon} alt="add item" width="30" /> Log  Out
            </Button>
        </Link>

        <>
            <Button size="lg" className="GCMenu"
                onClick={() => setShowJoinedGC(true)}
                style={{position: 'absolute',  backgroundColor: 'green'}}>
                    <img src={chatIcon} alt="add item" width="30" /> Joined Group Chats
            </Button>

            <Offcanvas show={showJoinedGC} onHide={() => setShowJoinedGC(false)}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>RPI Student  </Offcanvas.Title>
            </Offcanvas.Header>
            
            <Offcanvas.Body>
                
            </Offcanvas.Body>
            
        </Offcanvas>

        </>

        </div>
    );
  };
  
  
  export default GroupChat;