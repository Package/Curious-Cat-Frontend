import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import Moment from "react-moment";
import {ProfileInitials} from "./ProfileInitials";
import {NotificationContext} from "../context/NotificationContext";
import {Stats} from "./Stats";

export const Notification = () => {

    const ctx = useContext(NotificationContext);

    /**
     * Is the notification about a question being asked?
     */
    const isQuestionNotification = (notif) => {
        return notif.notification_type_string === "asked you a question";
    }

    if (ctx.notifications.length === 0) {
        return <p>You have no new notifications.</p>
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <Stats/>
            </div>

            <div className="col-md-8">
                <h2>Your Notifications</h2>
                {ctx.notifications.map((n) => <div className="notification" key={n.id}>
                    <p>
                        <ProfileInitials username={n.from_username}/>
                        <Link to={`/profile/${n.from_user}`}>
                            {n.from_username}
                        </Link> {n.notification_type_string}

                        &nbsp;
                        <small className="text-muted">
                            <Moment fromNow date={n.created_at}/>
                        </small>
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

                    <button className="btn btn-outline-primary btn-sm" onClick={e => ctx.readNotification(n.id)}>Dismiss
                    </button>
                </div>)}
            </div>
        </div>
    );
};
