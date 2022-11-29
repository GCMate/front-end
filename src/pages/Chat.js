import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import LeftArrowIcon from '../img/LeftArrowIcon.png'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import {collection, orderBy, query, limit, addDoc, serverTimestamp} from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { app } from "../firebase-config";

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const auth = getAuth(app);
const firestore = getFirestore(app);

function SignIn() {
  const navigate = useNavigate();
  const {state} = useLocation();
  const {user_rin} = state; 
  const {class_title} = state;  
  const {class_id} = state; 
    
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <>
    <div className="Chat"> 
      <Button size="lg"  className="LogoutButton" 
       style={{position: 'absolute'}}
       onClick={() => navigate('/groupChat', 
                      { state: { rin: user_rin, course_title: class_title, course_id: class_id } }) }>
                <img src={LeftArrowIcon} alt="add item" width="30" /> Back
      </Button>

      <Button size="lg" className="sign-in" style={{position: 'absolute'}} 
       onClick={signInWithGoogle}>
        Sign in with Google
      </Button>
      </div>
    </>
  );
}

function SignOut() {
  const navigate = useNavigate();
  const {state} = useLocation();
  const {user_rin} = state; 
  const {class_title} = state;  
  const {class_id} = state; 

  return (
    auth.currentUser && (
      <>
      <Button size="lg" variant="danger" className="LogoutButton" 
      style={{position: 'absolute'}}
       onClick={() => auth.signOut()}>
        Sign Out
      </Button>   

      <Button size="lg" variant="info" className="GroupChatBackButton" 
       style={{position: 'absolute'}}
       onClick={() => navigate('/groupChat', 
                      { state: { rin: user_rin, course_title: class_title, course_id: class_id } }) }>
                <img src={LeftArrowIcon} alt="add item" width="30" /> Group Chats
      </Button>
      </>   
    )
  );
}

function ChatRoom() {
  const {state} = useLocation();
  const {user_rin} = state; 
  const {class_title} = state;  

  const dummy = useRef();
  const messagesRef = collection(firestore, "messages");
  const q = query(messagesRef, orderBy("calculatedCreatedAt"), limit(25));

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    addDoc(messagesRef, {
      text: formValue,
      calculatedCreatedAt: serverTimestamp(),
      uid,
      photoURL,
      textRIN: user_rin
    })

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  const [messages] = useCollectionData(q, { idField: "id" });

  return (
    <>
      <div className="Chat"> 
        <main className="TextMessages" style={{position: 'absolute'}}>
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

          <span ref={dummy}></span>
        </main>
        
        
          <OverlayTrigger placement='left'
            overlay={
              <Tooltip>
                {class_title}
              </Tooltip>
            }
          >
            <Button variant="secondary" className="CourseToolTip" 
            style={{position: 'absolute'}}> Course </Button>
          </OverlayTrigger>
        
        <div className="TextSection" style={{position: 'absolute'}}>
        <form onSubmit={sendMessage} >
            <input className="ChatRoomInput"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Say something nice!"
            />

            <button type="submit" disabled={!formValue}>
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, textRIN } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className="Chat"> 
        <div className={`message ${messageClass}`}>
          <Badge pill bg="warning" text="dark" className="RINBadge"> {textRIN} </Badge>
          <p>{text}</p> 
        </div>
      </div>
      
    </>
  );
}

function Chat() {
  const [user] = useAuthState(auth);
  
  return (
    <div className="Chat">
          <h1> 
            <span className="ChatRoomTitleText" style={{position: 'absolute'}}> 
              Chat Room </span></h1> 
        <SignOut/>
      

      <section> {user ? <ChatRoom /> : <SignIn />} </section>
    </div>
  );
}

export default Chat;
