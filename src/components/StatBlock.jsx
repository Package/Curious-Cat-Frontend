import React from 'react';
import {Link} from "react-router-dom";
import {ProfileInitials} from "./ProfileInitials";
import Moment from "react-moment";

export const StatBlock = ({data, title, hasDate}) => (

    <div className="panel">
        <h3>{title}</h3>
        <ul className="list-group">
            {data.map((d, i) =>
                <li className="list-group-item" key={i}>
                    <ProfileInitials username={d.username}/>
                    <Link to={`/profile/${d.id}`}>{d.username}</Link>

                    <small className="text-muted float-right">
                        {hasDate && <Moment fromNow date={d.counter}/>}
                        {!hasDate && d.counter}
                    </small>
                </li>
            )}
        </ul>
    </div>
);

