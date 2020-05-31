import React, { useState } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

export const Register = () => {

    const [username, setUsername] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();

        Axios.post('/api/register.php', {
            "username": username,
            "email_address": emailAddress,
            "password": password,
            "confirm_password": confirmPassword
        }).then(res => {
            localStorage.setItem("authToken", res.data.authorization_token);
            setSuccess(res.data.message);
            setError('');
        }).catch(err => {
            setError(err.response.data.message);
            setSuccess('');
        });
    }

    return (
        <>
            <h2>Create your Account</h2>

            {error.length > 0 &&
                <div className="alert alert-danger">
                    {error}
                </div>
            }

            {success.length > 0 &&
                <div className="alert alert-success">
                    <p>
                        {success} <Link to="/">Click here</Link> to go to the homepage.
                    </p>
                </div>
            }

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Choose Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    {/* <small id="usernameHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>

                <div className="form-group">
                    <label htmlFor="emailAddress">Email address</label>
                    <input type="email" className="form-control" id="emailAddress" aria-describedby="emailHelp" placeholder="Enter Email Address" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" aria-describedby="passwordHelp" placeholder="Choose Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {/* <small id="passwordHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input type="password" className="form-control" id="confirmPassword" aria-describedby="confirmPasswordHelp" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    {/* <small id="confirmPasswordHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>

                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </>
    )
}
