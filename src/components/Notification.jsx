import React from 'react';
import {Link} from 'react-router-dom';
import useNotification from "../hooks/useNotification";

export const Notification = () => {

    const notifications = useNotification();

    /**
     * Is the notification about a question being asked?
     */
    const isQuestionNotification = (notif) => {
        return notif.notification_type_string === "asked you a question";
    }

    if (notifications.length === 0) {
        return <p>You have no new notifications.</p>
    }

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
};
