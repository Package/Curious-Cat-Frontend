import React, {createContext, useEffect, useState} from 'react';
import {buildAuthorizationHeader, buildHeader, isLoggedIn} from "../auth";
import Axios from "axios";

export const NotificationContext = createContext(false);

export const NotificationProvider = ({children}) => {
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        if (!isLoggedIn()) {
            setNotifications([]);
            return false;
        }

        Axios.get('/api/notification.php', buildAuthorizationHeader())
            .then(res => {
                setNotifications(res.data);
            }).catch(err => console.log(err));
    }, [])

    const readNotification = (notificationId) => {
        Axios({
            method: 'put',
            url: `/api/notification.php?id=${notificationId}`,
            headers: buildHeader()
        }).then(_ => {
            const filteredNotifications = notifications.filter(n => n.id !== notificationId);
            setNotifications(filteredNotifications);
        }).catch(err => console.error(err));
    }

    const providerValues = {
        notifications,
        readNotification
    }

    return (
        <NotificationContext.Provider value={providerValues}>
            {children}
        </NotificationContext.Provider>
    )
}
