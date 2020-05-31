
import React, { useContext } from 'react'
import { CuriousContext } from '../context/CuriousContext'
import { UserContext } from '../context/UserContext';

export const Home = () => {
    const value = useContext(CuriousContext);
    const user = useContext(UserContext);

    return (
        <div className="container">
            {value.message}
            <p>
                {user.loggedIn ? 'logged in' : 'not logged in'}
            </p>
            <p>
                {user.authToken}
            </p>
        </div>
    )
}
