import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../context/UserContext';
import {NotificationContext} from "../context/NotificationContext";

export const Navbar = () => {

    const user = useContext(UserContext);
    const notifications = useContext(NotificationContext);

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Curious Cat Clone</Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {user.loggedIn &&
                            <>
                                <li className="nav-item">
                                    <Link to="/search" className="nav-link">Search</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/notifications" className="nav-link">Notifications
                                        <span
                                            className="badge badge-light ml-1">{notifications.notifications.length}</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link">My Profile</Link>
                                </li>
                            </>
                        }
                    </ul>

                    {!user.loggedIn &&
                        <ul className="navbar-nav justify-content-end">
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                        </ul>
                    }

                    {user.loggedIn &&
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
