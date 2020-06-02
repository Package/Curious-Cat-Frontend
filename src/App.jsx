import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Home} from './components/Home';
import {Navbar} from './components/Navbar';
import {Register} from './components/Auth/Register';
import {Login} from './components/Auth/Login';
import {Logout} from './components/Auth/Logout';
import {Profile} from './components/Profile';
import {Search} from './components/Search';
import {Notification} from "./components/Notification";
import {Answer} from "./components/Answer";
import {UserProvider} from './context/UserContext';
import {NotificationProvider} from "./context/NotificationContext";
import {AuthenticatedLayout} from "./components/Layout/AuthenticatedLayout";
import {NotAuthenticatedLayout} from "./components/Layout/NotAuthenticatedLayout";

function App() {
    return (
        <UserProvider>
            <NotificationProvider>
                <Router>
                    <Navbar/>

                    <Switch>
                        <Route path={["/register", "/login", "/logout"]}>
                            <NotAuthenticatedLayout>
                                <Switch>
                                    <Route path="/register" component={Register}/>
                                    <Route path="/login" component={Login}/>
                                    <Route path="/logout" component={Logout}/>
                                </Switch>
                            </NotAuthenticatedLayout>
                        </Route>

                        <Route
                            path={["/profile/:id?", "/answer/:questionId", "/search/:search?", "/notifications", "/"]}>
                            <AuthenticatedLayout>
                                <Switch>
                                    <Route path="/" exact component={Home}/>
                                    <Route path="/profile/:id?" component={Profile}/>
                                    <Route path="/answer/:questionId" component={Answer}/>
                                    <Route path="/search/:search?" component={Search}/>
                                    <Route path="/notifications" component={Notification}/>
                                </Switch>
                            </AuthenticatedLayout>
                        </Route>
                    </Switch>
                </Router>
            </NotificationProvider>
        </UserProvider>
    );
}

export default App;
