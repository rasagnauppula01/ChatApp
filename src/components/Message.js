import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Timestamp } from 'firebase/firestore';

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
         // Check if the message sender is not the current user and browser supports notifications
         if (message.senderId !== currentUser.uid && "Notification" in window) {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification("New Message Received", {
                        body: message.text || "New message received", // Display message content if available
                    });
                }
            });
        }
    }, [message]); // Dependency array should include 'message' not 'message()'

    const getMessageSentTime = (timestamp) => {
        const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return date.toLocaleString('en-US', options);
    };

    // Check if message is empty before rendering
    if (!message.text && !message.img) {
        return null; // Do not render empty messages
    }

    return (
        <div ref={ref}
            className={`message ${message.senderId === currentUser.uid && "owner"}`}>
            <div className="messageInfo">
                <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="User Avatar" />
                <span>{getMessageSentTime(message.date)}</span>
            </div>
            <div className="messageContent" style={{marginTop: '10px'}}>
                {message.text && <p>{message.text}</p>}
                {message.img && <img src={message.img} alt="Message Image" />}
            </div>
        </div>
    );
};

export default Message;

