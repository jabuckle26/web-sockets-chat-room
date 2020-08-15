const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(4000, () => {
    console.log('Now listening on port 4000');
});

//Here we define the folder to serve to the client
app.use(express.static('public'));

let chatMembers = [];

const io = socket(server);
io.on('connection', (theSocket) => {
    console.log('Connected to socket');
    console.log(theSocket.id);
    
    chatMembers.push(theSocket.id);
    io.sockets.emit('updateChatMembers', chatMembers);
    io.emit('newChatMember', theSocket.id);
    
    theSocket.on('chat', (dataFromClient) => {
        console.log(dataFromClient);
        io.sockets.emit('chat', dataFromClient);
    });

    theSocket.on('sendMessage', (dataFromClient) => {
        console.log(dataFromClient);
        io.sockets.emit('messageFromServer', dataFromClient);
    });

    theSocket.on('typing', (dataFromClient) => {
        theSocket.broadcast.emit('typing', dataFromClient);
    });

    theSocket.on('disconnect', (dataFromClient) => {
        console.log('Disconnected');
        console.log(theSocket.id);
        chatMembers = chatMembers.filter((chatMember) => chatMember !== theSocket.id);
        io.sockets.emit('updateChatMembers', chatMembers);
        io.sockets.emit('chatMemberLeft', theSocket.id);
    });
})
