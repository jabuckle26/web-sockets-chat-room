import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../../context/GlobalState';

const setNotificationToObject = (userName, status) => {
    return {
        text: `${userName} has ${status} the chat!`,
        style: 'notifyUserChange',
        sender: '',
    }
}

export const ChatWindow = () => {
    const { socket, userName } = useContext(GlobalContext);
    const [messageText, setMessageText] = useState('');
    const [chatOutput, setChatOutput] = useState([]);

    const handleSend = () => {
        socket.emit('sendMessage', { text: messageText, sender: userName, style: 'message' });
        setMessageText('');
    }

    const handleTyping = (e) => {
        setMessageText(e.target.value);
    }

    useEffect(() => {
        socket.on("messageFromServer", (data) => {
            setChatOutput([...chatOutput, data]);
        });

        socket.on('newChatMember', (data) => {
            setChatOutput([...chatOutput, setNotificationToObject(data, 'joined')]);
        });

        socket.on('chatMemberLeft', (data) => {

            setChatOutput([...chatOutput, setNotificationToObject(data, 'left')]);
        });
    });

    return (
        <div className="chatWindow">
            <div className="chatContainer">
                <div className="chatTextOutput">{chatOutput.map((message) => 
                    (
                        message.style !== 'notifyUserChange' ?
                            <p className={message.style} key={message.text}><span className="sender">{`${message.sender}: `}</span>{message.text}</p>
                            : <p className={message.style} key={message.text}>{message.text}</p>
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
