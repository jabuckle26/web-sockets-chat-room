import React, {createContext, useReducer} from 'react';
import io from 'socket.io-client';
import AppReducer from './AppReducer';

const initialState = {
    chatMembers: [],
    isChatOpen: false,
    socket: io.connect('https://web-chat-socket-io-demo.herokuapp.com/'),
    userName: '',
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const addMember = (userName) => {
        dispatch({
            type: 'ADD_MEMBER',
            payload: userName,
        })
    };

    const assignUserName = (userName) => {
        dispatch({
            type: 'NEW_USERNAME',
            payload: userName,
        })
    }

    const openChatWindow = () => {
        dispatch({
            type: 'OPEN_CHAT',
            payload: true,
        })
    }
    
    return (
    <GlobalContext.Provider value={{
        addMember,
        chatMembers: state.chatMembers,
        isChatOpen: state.isChatOpen,
        openChatWindow,
        socket: state.socket,
        assignUserName,
        userName: state.userName,
    }}>
        {children}
    </GlobalContext.Provider>)
}