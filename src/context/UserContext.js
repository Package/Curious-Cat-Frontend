import React, {createContext, useState} from 'react';
import {getAccessToken, getUsername, isLoggedIn} from '../auth';

export const UserContext = createContext(false);

export const UserProvider = ({children}) => {

    const [authToken, setAuthToken] = useState(getAccessToken());
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());
    const [username, setUsername] = useState(getUsername());

    const login = (authToken, username) => {
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("username", username);
        setAuthToken(authToken);
        setUsername(username);
        setLoggedIn(true);
    }

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        setAuthToken(null);
        setUsername('');
        setLoggedIn(false);
    }

    const changeUsername = (newUsername) => {
        localStorage.setItem("username", newUsername);
        setUsername(newUsername);
    }

    const providerValues = {
        authToken,
        loggedIn,
        username,
        login,
        logout,
        changeUsername
    }

    return (
        <UserContext.Provider value={providerValues}>
            {children}
        </UserContext.Provider>
    )
}