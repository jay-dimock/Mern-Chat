import React, {useState} from "react";
import { FormControl, TextField, FormHelperText, Button } from '@material-ui/core'

const buttonStyle = {
    marginTop: "10px"
}

export default (props) => {
    const [newMessage, setNewMessage] = useState("");
    const [errors, setErrors] = useState({});

    const addNewMessage = (e) => {
        e.preventDefault();
        console.log("newMessage: " + newMessage);
        setErrors({});
        if(newMessage.length === 0) {setErrors({...errors, newMessage: "Enter a new message first!"}); }
        else {
            props.addNewMessage(newMessage);
            setNewMessage("");
        }
    }

    return (
        <form onSubmit={addNewMessage}>
            <FormControl>
                <FormHelperText id="helper-text">Enter a new message</FormHelperText>
                <TextField multiline style={{width:500}} label="New Message" name="newMessage" variant="filled"
                    value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                {errors["newMessage"] && <FormHelperText id="helper-text" error={true}>{errors["newMessage"]}</FormHelperText>}                    
            </FormControl>
            <div><Button style={buttonStyle} type="button" variant="contained" color="primary" onClick={addNewMessage}>Send</Button></div>
        </form>
    );
}