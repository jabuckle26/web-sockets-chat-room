import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../../context/GlobalState';

export const ChatWindow = () => {
    const {socket} = useContext(GlobalContext);
    const [messageText, setMessageText] = useState('');
    const [chatOutput, setChatOutput] = useState([]);

    const handleSend = (e) => {
        socket.emit('sendMessage', messageText);
        setMessageText('');
    }

    const handleTyping = (e) => {
        setMessageText(e.target.value);
    }

    useEffect(() => {
        socket.on("messageFromServer", (data) => {
            setChatOutput([...chatOutput, {message: data, style: 'message'}]);
        });

        socket.on('newChatMember', (data) => {
            setChatOutput([...chatOutput, {message: `${data} has joined the chat lol!`, style: 'notifyUserChange'}]);
        });

        socket.on('chatMemberLeft', (data) => {
            setChatOutput([...chatOutput, {message: `${data} has left the chat, sad times!`, style: 'notifyUserChange'}]);
        });
    });

    return (
        <div className="chatWindow">
            <div className="chatContainer">
                <div className="chatTextOutput">{chatOutput.map((message) => (
                    <p className={message.style} key={message.message}>{message.message}</p>
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
