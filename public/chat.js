//Make connection
//This is the socket for thr front end
//We have access to the io because its loaded in our index.html from the CDN script (Content Delivery Network)
//Page loads and then a connected event is emited. The server is listening for this.
const socket = io.connect('http://localhost:4000');

//Query the DOM
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feeback = document.getElementById('feedback');

//Emit events to server
btn.addEventListener('click', () => {
    //When button is clicked we want to send info down the socket
    socket.emit('chat', {
        username: username.value,
        message: message.value,
    });
    message.value = '';
});

message.addEventListener('keypress', () => {
    socket.emit('typing', username.value);
})

//Listen for events from server
socket.on('chat', (dataFromServer) => {
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong>${dataFromServer.username}</strong>: ${dataFromServer.message}</p>`
});

socket.on('typing', (dataFromServer) => {
    feedback.innerHTML = `<p>${dataFromServer} is typing...</p>`
});