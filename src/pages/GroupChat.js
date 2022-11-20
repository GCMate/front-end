import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { useNavigate, useLocation, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import gcmateLogo from '../img/GCMateIcon.png';
import logoutIcon from '../img/LogoutIcon.png';
import LeftArrowIcon from '../img/LeftArrowIcon.png'
=======
import { useLocation, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import gcmateLogo from '../img/GCMateIcon.png';
import logoutIcon from '../img/LogoutIcon.png';
import coursesIcon from '../img/CoursesIcon.png';
>>>>>>> bcb3d0a150d647732e51589ee63b3e5e34db086f
import chatIcon from '../img/ChatIcon.png'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
<<<<<<< HEAD
import Toast from 'react-bootstrap/Toast';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Alert from 'react-bootstrap/Alert';
import './GroupChat.css';

const GroupChat = () => {
    const navigate = useNavigate();
=======
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './GroupChat.css';

const GroupChat = () => {
>>>>>>> bcb3d0a150d647732e51589ee63b3e5e34db086f
    const {state} = useLocation();
    const {rin} = state; 
    const {course_title} = state;
    const {course_id} = state; 

    // ===== Show states =====    
    // Show the user's joined group chats 
    const [showJoinedGC, setShowJoinedGC] = useState(false); 
<<<<<<< HEAD
    // Alert for joining chat
    const [showJoinAlert, setShowJoinAlert] = useState(false); 
    // Alert for leaving chat
    const [showLeaveAlert, setShowLeaveAlert] = useState(false);      
    // ====================    

    const [members, setMembers] = useState([]); 
    const [joinedChats, setJoinedChats] = useState([]); 

    // Executed when page loads 
    useEffect(() => {
        // When page loads, get the list of members of the chat
        const course_jsonData = { COURSEID: course_id }
          
        fetch('http://127.0.0.1:5000/api/chatMembersList', {  

        method: 'POST', 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(course_jsonData) 

        }).then((response) => response.json())
        .then(data => { setMembers(data.members)
                        setJoinedChats(data.members.indexOf(rin) > -1 ? ['Chat Room 1'] : [])})
        .catch((err) => { console.log(err);});
    }, [])

    // ========== API CALLS ==========
    // Adds the user to the chat  
    const joinChat = () => {
        const chat_jsonData = { RIN: rin, COURSEID: course_id}
          
        fetch('http://127.0.0.1:5000/api/addUserChat', {  

        method: 'POST', 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(chat_jsonData) 

        }).then((response) => response.json())
        .then(data => {setMembers(data.users)
                       setJoinedChats(['Chat Room 1'])
                       setShowJoinAlert(true)})
        .catch((err) => { console.log(err);});
    }

    const leaveChat = () => {
        const chat_jsonData = { RIN: rin, COURSEID: course_id}
          
        fetch('http://127.0.0.1:5000/api/removeUserChat', {  

        method: 'POST', 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(chat_jsonData) 

        }).then((response) => response.json())
        .then(data => {setMembers(data.users)
                       setJoinedChats([])
                       setShowLeaveAlert(true)})
        .catch((err) => { console.log(err);});
    }
    // =================================

=======
    // ====================    

>>>>>>> bcb3d0a150d647732e51589ee63b3e5e34db086f
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
        
<<<<<<< HEAD
        <Link to="/classList" state={{ user_rin: rin }}>
            <Button size="lg" className="ClassListButton" style={{position: 'absolute'}}>
                <img src={LeftArrowIcon} alt="add item" width="30" /> Back to Courses
            </Button>
        </Link>

=======
>>>>>>> bcb3d0a150d647732e51589ee63b3e5e34db086f
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
<<<<<<< HEAD
                {joinedChats.map(c => {
                    return( <>
                             <h4> {c} </h4> 
                            </>
                        );
                    })}
=======
                {course_title} {course_id}
>>>>>>> bcb3d0a150d647732e51589ee63b3e5e34db086f
            </Offcanvas.Body>
            
        </Offcanvas>

        </>

<<<<<<< HEAD
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
                        {members.indexOf(rin) == -1 &&
                        <Button size="sm" variant="outline-success"
                         onClick={joinChat}> Join Chat</Button>}


                        {members.indexOf(rin) > -1 &&
                            <>
                            <Button size="sm" variant="outline-danger" 
                            onClick={leaveChat}> Leave Chat</Button>
                            
                            <Link to="/chat" 
                                    state={{ user_rin: rin, class_title: course_title, class_id: course_id }}>
                                    <Button size="sm" variant="outline-dark" className="ChatRoomButton"> 
                                        Enter Chat Room 
                                    </Button>
                            </Link> 
                            
                            </>
                        }
                        
                        
                    </small>
                </Toast.Header>
                <Toast.Body>
                    <span className="BoldText"> Members: </span> 
                    {members.map(m => {
                        return(
                            <>
                             {m} {' '} 
                        </>
                        );
                    })}
                </Toast.Body>
            </Toast>
            </div>

        <Alert show={showJoinAlert} variant="success" className="ChatAlert"
            onClose={() => setShowJoinAlert(false)} dismissible>
            <Alert.Heading>You have joined a group chat!</Alert.Heading>
        </Alert>

        <Alert show={showLeaveAlert} variant="secondary" className="ChatAlert"
            onClose={() => setShowLeaveAlert(false)} dismissible>
            <Alert.Heading>You have left a group chat!</Alert.Heading>
        </Alert>

=======
>>>>>>> bcb3d0a150d647732e51589ee63b3e5e34db086f
        </div>
    );
  };
  
  
  export default GroupChat;