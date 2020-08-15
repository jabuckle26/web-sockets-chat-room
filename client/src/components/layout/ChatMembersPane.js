import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/GlobalState';

export const ChatMembersPane = () => {
    const {socket} = useContext(GlobalContext);
    const [chatPanelList, setChatPanelList] = useState([]);

    useEffect(() => {
        socket.on("updateChatMembers", (data) => {
            setChatPanelList(data);
        });
    });

    return (
        <div className="membersPane">
            {chatPanelList.map((member) => (
                <li>{member}</li>
            ))}
        </div>
    )
}
