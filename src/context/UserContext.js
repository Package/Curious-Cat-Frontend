import React, {createContext, useEffect, useState} from 'react';
import {getAcessToken, isLoggedIn} from '../auth';

export const UserContext = createContext(false);

export const UserProvider = ({children}) => {

    const [authToken, setAuthToken] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(isLoggedIn());
        setAuthToken(getAcessToken())
    }, []);

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