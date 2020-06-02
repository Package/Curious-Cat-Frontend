import React, {createContext, useState} from 'react';
import {getAccessToken, isLoggedIn} from '../auth';

export const UserContext = createContext(false);

export const UserProvider = ({children}) => {

    const [authToken, setAuthToken] = useState(getAccessToken());
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());

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