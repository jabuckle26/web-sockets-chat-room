import React, { useState, useEffect } from 'react'
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
        <div className="chatWindow">
            <div className="chatContainer">
                <div className="chatTextOutput">{chatOutput.map((message) => (
                    <p className="message" key={message}>{message}</p>
                ))}</div>
                <div className="typingFeedback"></div>
            </div>
            <div className="chatInputContainer">
                <textarea className="messageInput" value={messageText} type="textArea" onChange={(e) => handleTyping(e)} placeholder="Enter message..." />
                <button className="sendButton" onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}
