import {useEffect, useState} from "react";
import Axios from "axios";
import {buildAuthorizationHeader, isLoggedIn} from "../auth";

const useNotification = () => {
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        if (!isLoggedIn()) {
            setNotifications([]);
            return false;
        }

        Axios.get('/api/notification.php', buildAuthorizationHeader())
            .then(res => {
                setNotifications(res.data);
            })
    }, [])

    return notifications;
}

export default useNotification;