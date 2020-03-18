const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

//require('./config/mongoose.config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const server = app.listen(port, () => {
    console.log("Now listening on port " + port) 
});

const io = require("socket.io")(server);

io.on("connection", socket => {
    console.log("connected to socket: " + socket.id);

    socket.on("joined", data => {
        socket.broadcast.emit("notification", data.username + " has joined the chat")
    })

    socket.on("chat message", data => {
        console.log("chat message: " + data.message);
        socket.broadcast.emit("incoming message", data);
    });

    socket.on("event_from_client", data => {
        //pass the data to all clients except the the one who is emitting
        socket.broadcast.emit("send_data_to_all_other_clients", data);
    })

    //add additional event listenters here as desired
})