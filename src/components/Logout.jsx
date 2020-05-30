
import React from 'react'
import { Redirect } from 'react-router-dom';

export const Logout = () => {

    localStorage.removeItem("authToken");

    return (
        <Redirect to="/" />
    )
}
