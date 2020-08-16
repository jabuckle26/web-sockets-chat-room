import React, {createContext, useReducer} from 'react';
import io from 'socket.io-client';
import AppReducer from './AppReducer';

const initialState = {
    chatMembers: [],
    socket: io.connect('http://localhost:4000'),
    userName: '',
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const setUserName = (userName) => {
        dispatch({
            type: 'NEW_USERNAME',
            payload: userName,
        })
    }
    
    return (
    <GlobalContext.Provider value={{
        chatMembers: state.chatMembers,
        socket: state.socket,
        setUserName,
        userName: state.userName,
    }}>
        {children}
    </GlobalContext.Provider>)
}