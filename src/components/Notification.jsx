import React, {useEffect, useState} from 'react';
import Axios from "axios";
import {Link} from 'react-router-dom';
import {buildAuthorizationHeader} from "../auth";

export const Notification = () => {

    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        Axios.get('/api/notification.php', buildAuthorizationHeader())
            .then(res => {
                console.log(res);
                setNotifications(res.data);
            })
    }, [])

    /**
     * Is the notification about a question being asked?
     *
     * @param notif
     * @returns {boolean}
     */
    const isQuestionNotification = (notif) => {
        return notif.notification_type_string === "asked you a question";
    }

    if (notifications.length === 0) {
        return <p>You have no new notifications.</p>
    }

    return (
        <>
            <h2>Your Notifications</h2>

            {notifications.map((n) => <div className="notification" key={n.id}>
                <p>
                    <Link to={`/profile/${n.from_user}`}>{n.from_username}</Link> {n.notification_type_string}
                </p>

                {n.context != null &&
                    <p>
                        <i>{n.context}</i>
                    </p>
                }

                {isQuestionNotification(n) &&
                    <p>
                        <Link to={`/answer/${n.context_id}`} className="btn btn-sm btn-primary">Answer</Link>
                    </p>
                }
                <small className="text-muted"><time>{n.created_at}</time></small>
            </div>)}
        </>
    );
};
