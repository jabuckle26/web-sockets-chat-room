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
            <h3 className="membersPaneTitle">Chat Members</h3>
            <div className="membersContainer">
                {chatPanelList.map((member) => (
                    <ul key={member} className="member">{member}</ul>
                ))}
            </div>
        </div>
    )
}
