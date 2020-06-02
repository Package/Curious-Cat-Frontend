import React from 'react';
import {Link} from "react-router-dom";
import {ProfileInitials} from "./ProfileInitials";

export const StatBlock = ({data, title}) => (

    <div className="panel">
        <h3>{title}</h3>
        <ul className="list-group">
            {data.map(d =>
                <li className="list-group-item">
                    <ProfileInitials username={d.username}/>
                    <Link to={`/profile/${d.id}`}>{d.username}</Link>

                    {d.counter && <small className="text-muted float-right">{d.counter}</small>}
                </li>
            )}
        </ul>
    </div>
);

