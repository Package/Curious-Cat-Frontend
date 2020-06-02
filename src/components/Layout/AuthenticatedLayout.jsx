import React, {useContext} from 'react';
import {Stats} from "../Stats";
import {Redirect} from 'react-router-dom';
import {UserContext} from "../../context/UserContext";

export const AuthenticatedLayout = (props) => {

    const user = useContext(UserContext);

    if (!user.loggedIn) {
        return <Redirect to="/login"/>
    }

    return (
        <div id="contentWrapper" className="container">
            <div className="row">
                <div className="col-md-4">
                    <Stats/>
                </div>

                <div className="col-md-8">
                    {props.children}
                </div>
            </div>
        </div>
    )
};
