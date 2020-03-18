import React, {useState, useEffect, useRef} from "react";
import io from "socket.io-client";
import ChatBubble from "../components/ChatBubble";
import UsernameForm from '../components/UsernameForm';
import MessageForm from '../components/MessageForm';
import { AppBar } from '@material-ui/core';

const marginBottom = {
    marginBottom: "20px"
}

export default () => {
    //const socket = io(":8000");
    const [socket] = useState(io(":8000"));
    const [username, setUsername] = useState("");
    const [messages, setMessages] = useState([]);
    const [ready, setReady] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        console.log("Socket is listening...");
        
        //all socket event listeners go here
        socket.on("notification", msg => {
            setMessages(prevMessages => {
                //return [{type:"notification", message:msg}, ...prevMessages];
                return [...prevMessages, {type:"notification", message:msg}];
            })
            scrollToBottom();
        })

        socket.on("incoming message", msg => {
            //when setting state, you HAVE to use this exact syntax.
            //Any difference in syntax will not work the way you expect.
            setMessages(prevMessages => {
                //return [msg, ...prevMessages];
                return [...prevMessages, msg];
            })   
            scrollToBottom();     
        })

    }, []);

    const start = (newUsername) => {
        setReady(true);
        setUsername(newUsername);
        socket.emit("joined", {username: newUsername}); 
    }

    const addNewMessage = (newMessage) => {
        setMessages(prevMessages => {
            return [...prevMessages, {type:"chat", username: username, message: newMessage, fromMe:true}];
        })
        socket.emit('chat message', {username: username, message: newMessage});
        scrollToBottom();
    }

    return (<>
        <AppBar position="sticky" style={marginBottom}><h1>MERN Chat{username && ' - ' + username}</h1></AppBar>
        {!ready && <UsernameForm username={username} start={start} /> }
        {ready && <> 
            {messages.map((m, i) => {
                return ( m.type === "notification" ?
                    <p key={i}>{m.message}</p> : 
                    <ChatBubble key={i} message={m}/>
            )})} 
            <MessageForm addNewMessage={addNewMessage} />
            
        </>} 
        <div ref={messagesEndRef} />
    </>);
}