
import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export const Logout = () => {

    const user = useContext(UserContext);
    user.logout();

    return (
        <Redirect to="/" />
    )
}
