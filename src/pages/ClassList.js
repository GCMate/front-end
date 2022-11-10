import React, { useEffect, useState } from 'react';
import gcmateLogo from '../img/GCMateIcon.png';
import logoutIcon from '../img/LogoutIcon.png';
import coursesIcon from '../img/CoursesIcon.png';
import { useLocation, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Alert from 'react-bootstrap/Alert';
import './ClassList.css';

const ClassList = () => {
    // Get RIN from RINInput page for logging in, or 
    // PhoneEnter page for registering 
    const {state} = useLocation();
    const {user_rin} = state; 
    const {new_user} = state; 

    // Determines whether the user has chosen a subject yet 
    const [subjectChosen, setSubjChosen] = useState(false);
    // User's chosen subject 
    const [subject, setSubject] = useState('');
    const [coursesRetrieved, setCoursesRetrieved] = useState(false);
    // List of courses for chosen subject 
    const [subjectCourses, setSubjCourses] = useState(null);
    // Course that the user selected
    const [currentCourse, setCurrentCourse] = useState(null);

    // ===== Show states =====    
    // Register Course modal 
    const [show, setShow] = useState(false); 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // Remove Course modal
    const [showRCModal, setShowRCModal] = useState(false); 
    const handleRCClose = () => setShowRCModal(false); 
    // Show a subject's courses 
    const [showCourses, setShowCourses] = useState(false);
    // Alert for course registration
    const [showCorrectAlert, setShowCorrectAlert] = useState(false); 
    // Alert for choosing duplicate
    const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);     
    // ====================

    // User's registered courses
    const [emptyCourseList, setEmptyCourseList] = useState(true); 
    const [reg_courses, setRegCourses] = useState([]);  

    // Executed when page loads 
    useEffect(() => {
        fetchCourseList();
    }, [])

    // ========== API CALLS ==========
    // Fetches all courses registered to the user 
    const fetchCourseList = () => {
        const rin_jsonData = { RIN: user_rin }
          
        fetch('http://127.0.0.1:5000/api/userCourses', {  

        method: 'POST', 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(rin_jsonData) 

        }).then((response) => response.json())
        .then(data => {setRegCourses(data.courses)
                       setEmptyCourseList(data.courses.length == 0)})
        .catch((err) => { console.log("Success!");});
    }

    // Sends the selected subject to the backend 
    // Get the courses of the subject 
    const handleSelect=(subj)=>{
        setSubjChosen(true);
        setSubject(subj);
        
        const subj_jsonData = { SUBJECT: subj }
          
          fetch('http://127.0.0.1:5000/api/coursebysubj', {  

          method: 'POST', 
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify(subj_jsonData) 

          }).then((response) => response.json())
          .then(data => {setCoursesRetrieved(true)
                         setSubjCourses(data)})
          .catch((err) => { console.log(err.message);});
    }

    // Register the selected course to the user 
    const registerCourse=()=> {
        const reg_jsonData = { RIN: user_rin, COURSEID: currentCourse.id }
          
        fetch('http://127.0.0.1:5000/api/ucupdate', {  

        method: 'POST', 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(reg_jsonData) 

        }).then((response) => response.json())
        .then(data => {setRegCourses(data.courses)
                       setEmptyCourseList(false)
                       setShowCorrectAlert(true)})
        .catch((err) => { setShowDuplicateAlert(true)});
        
    };

    // Remove a registered course from the user
    const removeCourse=(course_id)=> {
        const rem_jsonData = { RIN: user_rin, COURSEID: course_id }

        fetch('http://127.0.0.1:5000/api/ucremove', {  

            method: 'POST', 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(rem_jsonData) 
    
            }).then((response) => response.json())
            .then(data => {setRegCourses(data.courses)})
            .catch((err) => { console.log(err.message); });
    }; 
    // =========================================================

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
            <h1 className="display-3"> <span className="TitleText">Class List</span></h1>
        </div>
        
        <Link to="/">
            <Button size="lg" variant="danger" className="LogoutButton" style={{
                position: 'absolute'}}>
                <img src={logoutIcon} alt="add item" width="30" /> Log  Out
            </Button>
        </Link>
        
        <Card className="SelectSubjectCard" 
            style={{position: 'absolute', width:"40%", height:"20%"}}>
        <Card.Header> Select a Subject! </Card.Header>

        <Card.Body>
            <DropdownButton className="SubjectDropdown1" variant="secondary" menuVariant="dark"
              title="Subjects A-B" onSelect={handleSelect}>
              <Dropdown.Item eventKey="ADMN">Administrative Courses</Dropdown.Item>
              <Dropdown.Item eventKey="USAF">Aerospace Studies</Dropdown.Item>
              <Dropdown.Item eventKey="ARCH">Architecture</Dropdown.Item>
              <Dropdown.Item eventKey="ARTS">Arts</Dropdown.Item>
              <Dropdown.Item eventKey="ASTR">Astronomy</Dropdown.Item>
              <Dropdown.Item eventKey="BCBP">Biochemistry & Biophysics</Dropdown.Item>
              <Dropdown.Item eventKey="BIOL">Biology</Dropdown.Item>
              <Dropdown.Item eventKey="BMED">Biomedical Engineering</Dropdown.Item>
              <Dropdown.Item eventKey="BUSN">Business</Dropdown.Item>
            </DropdownButton>

            <DropdownButton className="SubjectDropdown2" variant="secondary" menuVariant="dark"
              title="Subjects C-E" onSelect={handleSelect}>
              <Dropdown.Item eventKey="CHME">Chemical Engineering</Dropdown.Item>
              <Dropdown.Item eventKey="CHEM">Chemistry</Dropdown.Item>
              <Dropdown.Item eventKey="CIVL">Civil Engineering</Dropdown.Item>
              <Dropdown.Item eventKey="COGS">Cognitive Science</Dropdown.Item>
              <Dropdown.Item eventKey="COMM">Communication</Dropdown.Item>
              <Dropdown.Item eventKey="CSCI">Computer Science</Dropdown.Item>
              <Dropdown.Item eventKey="ENGR">Core Engineering</Dropdown.Item>
              <Dropdown.Item eventKey="ERTH">Earth & Environmental Science</Dropdown.Item>
              <Dropdown.Item eventKey="ECON">Economics</Dropdown.Item>
              <Dropdown.Item eventKey="ECSE">Electrical & Comp. Sys. Engr.</Dropdown.Item>
              <Dropdown.Item eventKey="ESCI">Engineering Science</Dropdown.Item>
              <Dropdown.Item eventKey="ENVE">Environmental & Energy Engr.</Dropdown.Item>
            </DropdownButton>

            <DropdownButton className="SubjectDropdown3" variant="secondary" menuVariant="dark"
              title="Subjects G-L" onSelect={handleSelect}>
              <Dropdown.Item eventKey="GSAS">Games & Simulation Arts && Sci</Dropdown.Item>
              <Dropdown.Item eventKey="ISYE">Industrial and Systems Engr</Dropdown.Item>
              <Dropdown.Item eventKey="ITWS">Information Technology & Web Sci</Dropdown.Item>
              <Dropdown.Item eventKey="IENV">Interdisciplinary Environmental</Dropdown.Item>
              <Dropdown.Item eventKey="IHSS">Interdisciplinary H&SS</Dropdown.Item>
              <Dropdown.Item eventKey="ISCI">Interdisciplinary Science</Dropdown.Item>
              <Dropdown.Item eventKey="LANG">Languages</Dropdown.Item>
              <Dropdown.Item eventKey="LGHT">Lighting</Dropdown.Item>
              <Dropdown.Item eventKey="LITR">Literature</Dropdown.Item>
              
            </DropdownButton>

            <DropdownButton className="SubjectDropdown4" variant="secondary" menuVariant="dark"
              title="Subjects M-Z" onSelect={handleSelect}>
              <Dropdown.Item eventKey="MGMT">Management</Dropdown.Item>
              <Dropdown.Item eventKey="MTLE">Materials Science & Engineering</Dropdown.Item>
              <Dropdown.Item eventKey="MATP">Math Prgmg,Probab,& Math Stat</Dropdown.Item>
              <Dropdown.Item eventKey="MATH">Mathematics</Dropdown.Item>
              <Dropdown.Item eventKey="MANE">Mech, Aero, Nucl Engr</Dropdown.Item>
              <Dropdown.Item eventKey="USAR">Military Science</Dropdown.Item>
              <Dropdown.Item eventKey="USNA">Naval Science</Dropdown.Item>
              <Dropdown.Item eventKey="PHIL">Philosophy</Dropdown.Item>
              <Dropdown.Item eventKey="PHYS">Physics</Dropdown.Item>
              <Dropdown.Item eventKey="PSYC">Psychology</Dropdown.Item>
              <Dropdown.Item eventKey="STSO">Science, Technology & Society</Dropdown.Item>
              <Dropdown.Item eventKey="WRIT">Writing</Dropdown.Item>
            </DropdownButton>
        </Card.Body>
        
        </Card>

        {subjectChosen && coursesRetrieved &&
            <Card className="SelectCoursesCard" 
                style={{position: 'absolute', width:"40%", height:"40%"}}>
            <Card.Header> Select a course! </Card.Header>
            <Card.Body className="mt-1">
                {subjectCourses.map(course => {
                    return(
                        <>
                        <Button key={course.id} className="CourseButton" 
                            onClick={() => {setCurrentCourse(course); setShow(true)}}> 
                            {course.title} 
                        </Button>
                        {show && 
                            <Modal show={show} onHide={() => setShow(false)}>
                            <Modal.Header closeButton>
                            <Modal.Title>Register the selected course?</Modal.Title>
                            </Modal.Header>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShow(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={()=> {setShow(false); registerCourse() }}>
                                Yes
                            </Button>
                            </Modal.Footer>
                    </Modal>}
                    </>
                    );
                })}
            </Card.Body>
            </Card> 
        }

        
        <Alert show={showCorrectAlert} variant="success" className="CourseAlert"
            onClose={() => setShowCorrectAlert(false)} dismissible>
            <Alert.Heading>Course Registered!</Alert.Heading>
        </Alert>

        <Alert show={showDuplicateAlert} variant="danger" className="CourseAlert"
            onClose={() => setShowDuplicateAlert(false)} dismissible>
            <Alert.Heading>Course Already Registered...</Alert.Heading>
        </Alert>

        <>
            <Button size="lg" variant="info" className="CoursesMenu"
                onClick={() => setShowCourses(true)}
                style={{position: 'absolute'}}>
                    <img src={coursesIcon} alt="add item" width="30" /> Course List
            </Button>

            <Offcanvas show={showCourses} onHide={() => setShowCourses(false)}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>RPI Student {user_rin} </Offcanvas.Title>
            </Offcanvas.Header>
            {!emptyCourseList && 
            <Offcanvas.Body>
                {reg_courses.map(course_elem => {
                        return(
                            <Card key={course_elem[1]} bg="warning" text="dark" 
                                style={{ width: '20rem', marginBottom: '18px' }}>
                                <Card.Body>
                                <Card.Title> {course_elem[3]} </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted"> 
                                    {course_elem[1]} </Card.Subtitle>

                                <>
                                <Button variant="danger" 
                                    onClick={()=> {removeCourse(course_elem[1]); setShowRCModal(true)}}> 
                                    Remove Course
                                </Button>

                                <Modal size="sm" show={showRCModal} onHide={handleRCClose}
                                    backdrop="static" keyboard={false}>
                                    <Modal.Header closeButton>
                                    <Modal.Title> Course Removed! </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body> You may now choose another course! </Modal.Body>
                                    
                                </Modal>
                                </>
                                </Card.Body>
                            </Card>
                        );
                    })}
            </Offcanvas.Body>
            }
        </Offcanvas>

        </>
    </div>
    );
};

export default ClassList; 