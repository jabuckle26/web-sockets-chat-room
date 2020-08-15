import React, {createContext, useReducer} from 'react';
import io from 'socket.io-client';
import AppReducer from './AppReducer';

const initialState = {
    chatMembers: [],
    socket: io.connect('http://localhost:4000'),
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    
    return (
    <GlobalContext.Provider value={{
        chatMembers: state.chatMembers,
        socket: state.socket,
    }}>
        {children}
    </GlobalContext.Provider>)
}