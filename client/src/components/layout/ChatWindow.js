import React, {useState, useEffect} from 'react'
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

export const ChatWindow = () => {

    const [messageText, setMessageText] = useState('');
    const [chatOutput, setChatOutput] = useState([]);
    const io = window.cloudflare;

    const handleSend = (e) => {
        socket.emit('sendMessage', messageText);
        setMessageText('');
    }

    const handleTyping = (e) => {
        setMessageText(e.target.value);
    }

    useEffect(() => {
        socket.on("messageFromServer", (data) => {
            console.log('Got something');
            console.log(data);
          setChatOutput([...chatOutput, data]);
        });
      });

    return (
        <div id="chat-container">
            <div id="chat-window">
            <div id="output">{chatOutput.map((message) => (
                <li key={message}>{message}</li>
            ))}</div>
                <div id="feedback"></div>
            </div>
            <div id="input-control">
                <input id="message" value={messageText} type="text" onChange={(e) => handleTyping(e)} placeholder="Enter message..." />
                <button id="send" onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}
