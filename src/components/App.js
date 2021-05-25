import React from 'react';
import { BrowserRouter, HashRouter, MemoryRouter, Route, Link, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import Navbar from './Navbar';
import Profile from './Profile';
import CreatePoll from './CreatePoll';
import PollResult from './PollResult';
import './style.css'
const App = () => {


    // const PrivateRoute ({route, comp}) => {
    //     return (
    //         if (token exists) {
    //             <Route path={route} component={comp}/>
    //         } else {
    //             redirect to "/login"
    // }


    return (
        <div className="h-100">
            <BrowserRouter>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/forgot-password" exact component={ForgotPassword} />
                    {/* <div> */}
                    <Route path="/" exact component={Home} />
                    <Route path="/poll/:voterCodeParams" exact component={Home} />
                    <Route path="/poll/results/:voterCodeParams" exact component={PollResult} />
                    <Route path="/@:username" exact component={Profile} />
                    {/* </div> */}
                    <Route path="/create-poll" exact component={CreatePoll} />}
                    <Route path="*" component={() => { return <div className="bg-light h-100 text-center">404 NOT FOUND</div> }} />
                </Switch>
            </BrowserRouter>


        </div>
    )
}

export default App;