import React from 'react'
import {Link} from 'react-router-dom'
import Moment from "react-moment";
import {ProfileInitials} from "./ProfileInitials";

export const UserGrid = ({ users }) => {

    if (users.length === 0) {
        return <p>No Users to show.</p>
    }

    return (
        <React.Fragment>
            {users.map(u =>
                <div key={u.id} className="user">
                    <strong>
                        <ProfileInitials username={u.username}/>
                        <Link to={`/profile/${u.id}`}>{u.username}</Link>
                    </strong>
                    <div>
                        <small className="text-muted">Joined <Moment fromNow date={u.created_at}/> </small>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}
