import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {buildAuthorizationHeader, isLoggedIn} from '../auth';
import Axios from "axios";

export const Navbar = () => {

    const [notificationCount, setNotificationCount] = useState(0)

    useEffect(() => {
        if (!isLoggedIn())
            return false;

        Axios.get('/api/notification.php', buildAuthorizationHeader())
            .then(res => {
                console.log(res);

                if (res.data != null) {
                    setNotificationCount(res.data.length);
                } else {
                    setNotificationCount(0);
                }
            })
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">Curious Cat Clone</Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {isLoggedIn() &&
                        <>
                            <li className="nav-item">
                                <Link to="/explore" className="nav-link">Explore</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/notifications" className="nav-link">Notifications
                                    <span className="badge badge-light ml-1">{notificationCount}</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link">My Profile</Link>
                            </li>
                        </>
                        }
                    </ul>

                    {!isLoggedIn() &&
                        <ul className="navbar-nav justify-content-end">
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                        </ul>
                    }

                    {isLoggedIn() &&
                        <ul className="navbar-nav justify-content-end">
                            <li className="nav-item justify-content-end">
                                <Link to="/logout" className="nav-link">Logout</Link>
                            </li>
                        </ul>
                    }

                </div>
            </div>
        </nav>
    )
}
