//import io from 'socket.io-client';

export default (state, action) => {
    switch(action.type) {
        case 'NEW_USERNAME':
            state.userName = action.payload;
            return {...state};
        case 'OPEN_CHAT':
            state.isChatOpen = action.payload;
            return {...state};
        case 'ADD_MEMBER':
            state.chatMembers = [...state.chatMembers, action.payload];
            return {...state};
        default:
            return state;
    }
}