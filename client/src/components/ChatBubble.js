import React  from "react";
//import io from "socket.io-client";
//import { FormControl, TextField, FormHelperText, Button } from '@material-ui/core'



export default props => {
    const m = props.message;

    const divStyle = {
        margin: "0 auto 20px auto",
        maxWidth: "600px",
        textAlign: "left",
    }

    const innerStyle = {
        backgroundColor: m.fromMe ? "green" : "blue",
        padding: "5px 12px",
        marginLeft: m.fromMe ? "40%" : "1%",
        marginRight: m.fromMe ? "1%" : "40%",
        borderRadius: "5px",
    }

    return  (
        <div style={divStyle}>
            <div style={innerStyle}><b>{m.fromMe ? "You" : m.username} said:</b><br/> {m.message}</div>
        </div>
    )

}