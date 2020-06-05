import React from 'react';
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {UserPhoto} from "./UserPhoto";

export const StatBlock = ({data, title, hasDate}) => (

    <div className="panel">
        <h3>{title}</h3>
        <ul className="list-group">
            {data.map((d, i) =>
                <li className="list-group-item" key={i}>
                    <UserPhoto photoPath={d.photo_file}/>
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

