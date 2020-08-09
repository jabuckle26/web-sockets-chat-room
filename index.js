const express = require('express');
const socket = require('socket.io');

//App setup
const app = express();
const server = app.listen(4000, () => {
    console.log('Now listening on port 4000');
});

//Here we define the folder to serve to the client
app.use(express.static('public'));

//Socket setup on server
//Invoking the fucntion. Pass the paraemeter of the server we want to work with
const io = socket(server);
//Listen for connection event when a new socket is esstablished.
io.on('connection', (theSocket) => {
    console.log('Connected to socket');
    console.log(theSocket.id);

    //Listen out for the chat event from client
    theSocket.on('chat', (dataFromClient) => {
        console.log(dataFromClient);
        //Update all sockets connected to the server
        io.sockets.emit('chat', dataFromClient);
    });

    //Listen out for the typing event from client
    theSocket.on('typing', (dataFromClient) => {
        //broadcast event from original socket to others
        theSocket.broadcast.emit('typing', dataFromClient);
    })
})
