import React from 'react'
import { ChatWindow } from './ChatWindow'
import { ChatMembersPane } from './ChatMembersPane'

export const ChatRoom = () => {
    return (
        <section className="chatRoom">
            <ChatWindow/>
            <ChatMembersPane/>
        </section>
    )
}
