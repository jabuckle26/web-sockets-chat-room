import React, {useContext, useState} from 'react';
import { GlobalContext } from '../../context/GlobalState';

export const Landing = () => {
    const {addMember, assignUserName, chatMembers, openChatWindow, socket} = useContext(GlobalContext);
    const [isInvalidUserName, setIsInvalidUserName] = useState(false);
    const [attemptedUserName, setAttemptedUserName] = useState('');

    const handleEnterUserName = () => {
        if (chatMembers.filter((member) => member.name === attemptedUserName).length === 0) {
            socket.emit('userLogin', attemptedUserName);
            addMember({id: socket.id, name: attemptedUserName});
            assignUserName(attemptedUserName);
            openChatWindow();
        } else {
            setIsInvalidUserName(true);
        }
    }

    const handleTyping = (e) => {
        setAttemptedUserName(e.target.value);
    }

    return (
        <section className='landing'>
            <div className='landingCard'>
                <h2>Please enter a username:</h2>
                <div>
                    <input className='usernameRegistration' value={attemptedUserName} type='text' onChange={(e) => handleTyping(e)} placeholder='Enter a username...' />
                    <button className='enterButton' onClick={() => handleEnterUserName()}>Enter</button>
                </div>
                {isInvalidUserName &&
                    <p className='warningText'>Username already in use! Please try a different one.</p>
                }
            </div>
        </section>
    )
}

export default Landing;