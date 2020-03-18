import React, {useState} from "react";
import { FormControl, TextField, FormHelperText, Button } from '@material-ui/core'

const buttonStyle = {
    marginTop: "10px"
}


export default (props) => {
    //const {username, setUsername} = props;
    const [username, setUsername] = useState(props.username ?? "");
    const [errors, setErrors] = useState({});

    const start = (e) => {
        e.preventDefault();
        setErrors({});
        if(username.length === 0) {setErrors({...errors, username: "Name is required"});}
        else if (username.length < 2) { setErrors({...errors, username: "Name must be at least 2 characters"});}
        else props.start(username);
    }

    return (<>
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
    </>);
}