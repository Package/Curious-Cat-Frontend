import React, { useState } from 'react'
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

export const Login = () => {

    const [usernameOrEmail, setUsernameOrEmail] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();

        Axios.post('/api/login.php', {
            "userOrEmail": usernameOrEmail,
            "password": password
        }).then(res => {
            localStorage.setItem("authToken", res.data.authorization_token);
            setSuccess(res.data.message);
        }).catch(err => {
            setError(err.response.data.message);
        });
    }


    return (
        <>
            <h2>Login to your Account</h2>

            {error.length > 0 &&
                <div className="alert alert-danger">
                    {error}
                </div>
            }

            {success.length > 0 &&
                <Redirect to="/" />
            }

            <form onSubmit={onSubmit} >
                <div className="form-group">
                    <label htmlFor="usernameOrEmail">Username</label>
                    <input type="text" className="form-control" id="usernameOrEmail" aria-describedby="usernameHelp" placeholder="Username Or Email Address" value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} />
                    <small id="usernameHelp" className="form-text text-muted">You can login using either your username or email address.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" aria-describedby="passwordHelp" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-dark">Login</button>
            </form>
        </>
    )
}
