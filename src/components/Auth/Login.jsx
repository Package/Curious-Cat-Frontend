import React, { useState, useContext, useReducer } from 'react'
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import loginReducer from '../../reducers/loginReducer';

const initialState = {
    usernameOrEmail: '',
    password: '',
    success: '',
    error: ''
}

export const Login = () => {

    const [loginState, dispatch] = useReducer(loginReducer, initialState);
    const { usernameOrEmail, password, success, error } = loginState;
    const user = useContext(UserContext)

    const onSubmit = (e) => {
        e.preventDefault();

        Axios.post('/api/login.php', {
            "userOrEmail": usernameOrEmail,
            "password": password
        }).then(res => {
            dispatch({ type: "login", message: res.data.message })
            user.login(res.data.authorization_token);
        }).catch(err => {
            dispatch({ type: "error", message: err.response.data.message });
        });
    }

    return (
        <React.Fragment>
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
                    <input type="text" className="form-control" id="usernameOrEmail" aria-describedby="usernameHelp" placeholder="Username Or Email Address" value={usernameOrEmail} onChange={(e) => dispatch({ type: "updateField", field: "usernameOrEmail", value: e.target.value })} />
                    <small id="usernameHelp" className="form-text text-muted">You can login using either your username or email address.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" aria-describedby="passwordHelp"
                        placeholder="Enter Password" value={password} onChange={(e) => dispatch({ type: "updateField", field: "password", value: e.target.value })} />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </React.Fragment>
    )
}
