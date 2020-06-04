import React, {useContext, useEffect, useState} from 'react';
import Axios from "axios";
import {buildHeader} from "../auth";
import {Loading} from "./Loading";
import {FlashMessage} from "./FlashMessage";
import {UserContext} from "../context/UserContext";

export const Settings = () => {

    const [username, setUsername] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const userCtx = useContext(UserContext);

    useEffect(() => {
        if (loading) {
            Axios({
                method: 'get',
                url: '/api/user.php',
                headers: buildHeader()
            }).then(res => {
                setUsername(res.data.username);
                setEmailAddress(res.data.email_address);
                setLoading(false);
            }).catch(err => {
                setSuccess('')
                setError(err.response.data.message);
            });
        }
    }, [loading])

    /**
     * Handles changing user details.
     */
    const onDetailSubmit = (e) => {
        e.preventDefault();

        if (username.length === 0 || emailAddress.length === 0) {
            return false;
        }

        Axios({
            method: 'put',
            url: '/api/user.php',
            headers: buildHeader(),
            data: {
                "action": "update_details",
                "username": username,
                "email_address": emailAddress,
            }
        }).then(res => {
            setError('');
            setSuccess('Your details have been saved.');
            userCtx.changeUsername(username);
        }).catch(err => {
            setSuccess('');
            setError(err.response.data.message);
        });
    }

    /**
     * Handles changing the user's password.
     */
    const onPasswordSubmit = (e) => {
        e.preventDefault();

        if (password.length === 0 || confirmPassword.length === 0) {
            return false;
        }

        Axios({
            method: 'put',
            url: '/api/user.php',
            headers: buildHeader(),
            data: {
                "action": "update_password",
                "password": password,
                "confirm_password": confirmPassword
            }
        }).then(res => {
            setError('');
            setSuccess('Your password has been changed.');
        }).catch(err => {
            setSuccess('');
            setError(err.response.data.message);
        })
    }

    if (loading) {
        return <Loading/>
    }

    return (
        <div>
            <FlashMessage message={success} type="success"/>
            <FlashMessage message={error} type="error"/>

            <h2>Change Details</h2>
            <form onSubmit={onDetailSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" aria-describedby="usernameHelp"
                           placeholder="Choose Username" value={username}
                           onChange={(e) => setUsername(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="emailAddress">Email address</label>
                    <input type="email" className="form-control" id="emailAddress" aria-describedby="emailHelp"
                           placeholder="Enter Email Address" value={emailAddress}
                           onChange={(e) => setEmailAddress(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Change Details</button>
            </form>

            <h2 className="mt-4">Change Password</h2>
            <form onSubmit={onPasswordSubmit}>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" aria-describedby="passwordHelp"
                           placeholder="Choose Password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input type="password" className="form-control" id="confirmPassword"
                           aria-describedby="confirmPasswordHelp" placeholder="Confirm Password" value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>

                <button type="submit" className="btn btn-primary">Change Password</button>
            </form>
        </div>
    );
};
