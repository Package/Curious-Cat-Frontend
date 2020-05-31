import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { Register } from './components/Auth/Register';
import { Login } from './components/Auth/Login';
import { Logout } from './components/Auth/Logout';
import { Profile } from './components/Profile';
import { Explore } from './components/Explore';
import { Notification } from "./components/Notification";
import { Answer } from "./components/Answer";
import { CuriousProvider } from './context/CuriousContext';
import { UserProvider } from './context/UserContext';

function App() {
    return (
        <UserProvider>
            <CuriousProvider>
                <Router>
                    <Navbar />
                    <div id="contentWrapper" className="container">
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/profile/:id?" component={Profile} />
                            <Route path="/answer/:questionId" component={Answer} />
                            <Route path="/explore/:search?" component={Explore} />
                            <Route path="/notifications" component={Notification} />
                            <Route path="/register" component={Register} />
                            <Route path="/login" component={Login} />
                            <Route path="/logout" component={Logout} />
                        </Switch>
                    </div>
                </Router>
            </CuriousProvider>
        </UserProvider>
    );
}

export default App;
