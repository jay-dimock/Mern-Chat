import React, {useState, useEffect, useRef} from "react";
import io from "socket.io-client";
import { FormControl, TextField, FormHelperText, Button } from '@material-ui/core'
import ChatBubble from "../components/ChatBubble";

const buttonStyle = {
    marginTop: "10px"
}


export default () => {
     //const socket = io(":8000");
    const [socket] = useState(io(":8000"));
    const [username, setUsername] = useState("");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [errors, setErrors] = useState({});
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

    const start = (e) => {
        e.preventDefault();
        setErrors({});
        if(username.length === 0) {setErrors({...errors, username: "Name is required"});}
        else if (username.length < 2) { setErrors({...errors, username: "Name must be at least 2 characters"});}
        else {
            setReady(true);
            socket.emit("joined", {username: username});
        }
    }

    const addNewMessage = (e) => {
        e.preventDefault();
        console.log("newMessage: " + newMessage);
        setErrors({});
        if(newMessage.length === 0) {setErrors({...errors, newMessage: "Enter a new message first!"}); }
        else {
            setMessages(prevMessages => {
                //return [{type:"chat", username:username, message:newMessage, fromMe:true}, ...prevMessages];
                return [...prevMessages, {type:"chat", username:username, message:newMessage, fromMe:true}];
            })

            //socket.emit('chat message', `from ${username}: ${newMessage}`);
            socket.emit('chat message', {username: username, message: newMessage});

            setNewMessage("");
            scrollToBottom();
        }
    }

    return (<>
        <h1>MERN Chat</h1>
        {!ready && 
        <form onSubmit={start}>
            <h3>Get Started!</h3>
            <FormControl>
                <FormHelperText id="helper-text">I want to start chatting with the name...</FormHelperText>
                <TextField label="Name" name="username" variant="filled"
                    value={username} onChange={(e) => {e.preventDefault(); setUsername(e.target.value)}}  />
                {errors["username"] && <FormHelperText id="helper-text" error={true}>{errors["username"]}</FormHelperText>}
                <Button style={buttonStyle} type="button" variant="contained" color="primary" onClick={start}>Start Chatting</Button>
            </FormControl>
        </form>
        }
        {ready && <> 
            {messages.map((m, i) => {
                return ( m.type === "notification" ?
                    <p key={i}>{m.message}</p> : 
                    <ChatBubble key={i} message={m}/>
            )})} 
            <form onSubmit={addNewMessage}>
                <FormControl>
                    <FormHelperText id="helper-text">Enter a new message</FormHelperText>
                    <TextField multiline style={{width:500}} label="New Message" name="newMessage" variant="filled"
                        value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                    {errors["newMessage"] && <FormHelperText id="helper-text" error={true}>{errors["newMessage"]}</FormHelperText>}                    
                </FormControl>
                <div><Button style={buttonStyle} type="button" variant="contained" color="primary" onClick={addNewMessage}>Send</Button></div>
            </form>
            <div ref={messagesEndRef} />
        </>} 
    </>);
}