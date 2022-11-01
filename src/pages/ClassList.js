import React, { useEffect, useState } from 'react';
import gcmateLogo from '../img/GCMateIcon.png';
import logoutIcon from '../img/LogoutIcon.png';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './ClassList.css';

const ClassList = () => {
    const [subjectChosen, setSubjChosen] = useState(false);
    const [subject, setSubject] = useState('');
    const [coursesRetrieved, setCoursesRetrieved] = useState(false);
    const [subjectCourses, setSubjCourses] = useState(null);

    // Sends the selected subject to the backend 
    // Get the courses of the subject 
    const handleSelect=(subj)=>{
        setSubjChosen(true);
        setSubject(subj);
        
        const jsonData = { SUBJECT: subj }
          
          fetch('http://127.0.0.1:5000/api/coursebysubj', {  

          method: 'POST', 
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify(jsonData) 

          }).then((response) => response.json())
          .then(data => {setCoursesRetrieved(true)
                         setSubjCourses(data)})
          .catch((err) => { console.log(err.message);});
    }

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

        {coursesRetrieved &&
        <Card className="SelectCoursesCard" 
            style={{position: 'absolute', width:"40%", height:"40%"}}>
        <Card.Header> Select a course! </Card.Header>
        <Card.Body className="mt-1">
            {subjectCourses.map(course => {
                return(
                    <Button className="CourseButton"> {course.title} </Button>
                );
            })}

        </Card.Body>
        </Card> }
    </div>
    );
};

export default ClassList; 
