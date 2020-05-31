import React, { useState, useContext, useReducer } from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import registerReducer from '../../reducers/registerReducer'

const initialState = {
    username: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    success: '',
    error: ''
}

export const Register = () => {

    const [registerState, dispatch] = useReducer(registerReducer, initialState)
    const { username, emailAddress, password, confirmPassword, success, error } = registerState;

    const user = useContext(UserContext);

    const onSubmit = (e) => {
        e.preventDefault();

        Axios.post('/api/register.php', {
            "username": username,
            "email_address": emailAddress,
            "password": password,
            "confirm_password": confirmPassword
        }).then(res => {
            user.login(res.data.authorization_token);
            dispatch({ type: "register", message: res.data.message })
        }).catch(err => {
            dispatch({ type: "error", message: err.response.data.message })
        });
    }

    return (
        <React.Fragment>
            <h2>Create your Account</h2>

            {error.length > 0 &&
                <div className="alert alert-danger">
                    {error}
                </div>
            }

            {success.length > 0 &&
                <Redirect to="/" />
            }

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Choose Username" value={username} onChange={(e) => dispatch({ type: "updateField", field: "username", value: e.target.value })} />
                </div>

                <div className="form-group">
                    <label htmlFor="emailAddress">Email address</label>
                    <input type="email" className="form-control" id="emailAddress" aria-describedby="emailHelp" placeholder="Enter Email Address" value={emailAddress} onChange={(e) => dispatch({ type: "updateField", field: "emailAddress", value: e.target.value })} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" aria-describedby="passwordHelp" placeholder="Choose Password" value={password} onChange={(e) => dispatch({ type: "updateField", field: "password", value: e.target.value })} />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input type="password" className="form-control" id="confirmPassword" aria-describedby="confirmPasswordHelp" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => dispatch({ type: "updateField", field: "confirmPassword", value: e.target.value })} />
                </div>

                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </React.Fragment>
    )
}
