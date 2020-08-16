//import io from 'socket.io-client';

export default (state, action) => {
    switch(action.type) {
        case 'NEW_USERNAME':
            state.userName = action.payload;
            return {...state}
        default:
            return state;
    }
}