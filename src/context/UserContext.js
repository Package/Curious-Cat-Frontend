import React, { createContext, useState, useEffect } from 'react';
import { isLoggedIn, getAcessToken } from '../auth';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [authToken, setAuthToken] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(isLoggedIn());
        setAuthToken(getAcessToken())
    });

    const login = (authToken) => {
        localStorage.setItem("authToken", authToken);
        setAuthToken(authToken);
        setLoggedIn(true);
    }

    const logout = () => {
        localStorage.removeItem("authToken");
        setAuthToken(null);
        setLoggedIn(false);
    }

    const providerValues = {
        authToken,
        loggedIn,
        login,
        logout,
    }

    return (
        <UserContext.Provider value={providerValues}>
            {children}
        </UserContext.Provider>
    )
}