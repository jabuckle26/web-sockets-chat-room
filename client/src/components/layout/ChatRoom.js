import React, {useContext} from 'react'
import { ChatWindow } from './ChatWindow'
import { ChatMembersPane } from './ChatMembersPane'
import { Landing } from './Landing';
import { GlobalContext } from '../../context/GlobalState';


export const ChatRoom = () => {
    const {isChatOpen} = useContext(GlobalContext);
    
    return (
        <section className="chatRoom">
            {!isChatOpen ?
                <Landing></Landing> :
                <>
                    <ChatWindow></ChatWindow>
                    <ChatMembersPane></ChatMembersPane>
                </>
            }
        </section>
    )
}
