import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import gcmateLogo from '../img/GCMateIcon.png';
import logoutIcon from '../img/LogoutIcon.png';
import chatIcon from '../img/ChatIcon.png'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Toast from 'react-bootstrap/Toast';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './GroupChat.css';

const GroupChat = () => {
    const {state} = useLocation();
    const {rin} = state; 
    const {course_title} = state;
    const {course_id} = state; 

    // ===== Show states =====    
    // Show the user's joined group chats 
    const [showJoinedGC, setShowJoinedGC] = useState(false); 
    // ====================    

    const {gcNum, setGCNum} = useState(1);

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
            <Offcanvas.Title>RPI Student {rin} </Offcanvas.Title>
            </Offcanvas.Header>
            
            <Offcanvas.Body>
                
            </Offcanvas.Body>
            
        </Offcanvas>

        </>

        <Card style={{position: 'absolute', width:"20%", height:"15%"}} className="CourseReminder">
        <Card.Header> <span className="CurrCourseText"> Current Course </span>: {course_id} </Card.Header>
        <Card.Body>
            <Card.Title>{course_title}</Card.Title>
            
            
        </Card.Body>
        </Card>
        
        <div className="GroupChatComponent" style={{position: 'absolute'}}>
            <Toast bg='warning' >
                <Toast.Header closeButton={false}>
                    <img src="holder.js/20x20?text=%20"  alt="" />
                    <strong className="me-auto"> Chat Room 1</strong>
                    <small> 
                        <Button size="sm" variant="outline-success"> Join Chat</Button>
                        <Link to="/chat" 
                                state={{ user_rin: rin, class_title: course_title }}>
                                <Button size="sm" variant="outline-dark" className="ChatRoomButton"> 
                                    Enter Chat Room 
                                </Button>
                        </Link>
                        
                    </small>
                </Toast.Header>
                <Toast.Body>
                    Members: 
                </Toast.Body>
            </Toast>
            </div>

        </div>
    );
  };
  
  
  export default GroupChat;