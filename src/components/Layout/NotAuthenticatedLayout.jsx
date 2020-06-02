import React, {useContext} from 'react';
import {UserContext} from "../../context/UserContext";
import {Redirect} from "react-router-dom";

export const NotAuthenticatedLayout = (props) => {

    const user = useContext(UserContext);

    if (user.loggedIn) {
        return <Redirect to="/"/>
    }

    return (
        <div id="contentWrapper" className="container">
            {props.children}
        </div>
    )
};
