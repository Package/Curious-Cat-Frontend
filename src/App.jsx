import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Logout } from './components/Logout';
import { Profile } from './components/Profile';

function App() {
    return (
        <React.Fragment>
            <Router>
                <Navbar />
                <div id="contentWrapper" className="container">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/profile/:id?" component={Profile} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                        <Route path="/logout" component={Logout} />
                    </Switch>
                </div>
            </Router>
        </React.Fragment>
    );
}

export default App;
