const express = require('express');
const socket = require('socket.io');

const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});

//Here we define the folder to serve to the client
app.use(express.static('public'));

let chatMembers = [];

const io = socket(server);
io.on('connection', (theSocket) => {
    console.log('Connected to socket');
    console.log(theSocket.id);
    
    theSocket.on('userLogin', (newUserName) => {
        chatMembers.push({id: theSocket.id, name: newUserName});
        io.sockets.emit('updateChatMembers', chatMembers);
        io.emit('newChatMember', newUserName);
    });  

    theSocket.on('sendMessage', (dataFromClient) => {
        io.sockets.emit('messageFromServer', dataFromClient);
    });

    theSocket.on('typing', (dataFromClient) => {
        theSocket.broadcast.emit('typing', dataFromClient);
    });

    theSocket.on('disconnect', () => {
        console.log('Disconnected');
        console.log(theSocket.id);
        io.sockets.emit('chatMemberLeft', chatMembers.filter((chatMember) => chatMember.id === theSocket.id)[0].name);
        chatMembers = chatMembers.filter((chatMember) => chatMember.id !== theSocket.id);
        io.sockets.emit('updateChatMembers', chatMembers);
    });
})
