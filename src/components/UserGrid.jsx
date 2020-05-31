import React from 'react'
import { Link } from 'react-router-dom'

export const UserGrid = ({ users }) => {

    if (users.length === 0) {
        return <p>No Users to show.</p>
    }

    return (
        <React.Fragment>
            {users.map(u =>
                <div key={u.id} className="user">
                    <strong>
                        <Link to={`/profile/${u.id}`}>{u.username}</Link>
                    </strong>
                    <p><small className="text-muted">Joined <time>{u.created_at}</time></small></p>
                </div>
            )}
        </React.Fragment>
    )
}
