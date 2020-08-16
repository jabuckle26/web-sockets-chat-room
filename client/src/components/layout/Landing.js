import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';


export const Landing = () => {
    const {setUserName} = useContext(GlobalContext);
    const isInvalidUserName = false;

    return (
        <section className="landing">
            <div className='landingCard'>
                <h2>Please enter a username:</h2>
                <input className="usernameRegistration" type="text" placeholder="Enter a username..." />
                {isInvalidUserName &&
                    <p>Username already in use! Please try a different one.</p>
                }
            </div>
        </section>
    )
}

export default Landing;