import React, { useState } from 'react';
import { BrowserRouter, HashRouter, MemoryRouter, Route, Link, useHistory, Redirect } from 'react-router-dom';
import authentication from '../apis/authentication';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const history = useHistory();

    const onFormSubmit = (event) => {
        event.preventDefault();
        authenticateUser();
    }
    const authenticateUser = async () => {
        const response = await authentication.post("/login", {
            "username": username,
            "password": password
        }).catch(error => {
            console.log(error.response.data);
            setErrorMessage(error.response.data.message);
        });
        if (response) {
            console.log('login', response);

            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            window.localStorage.setItem("accessToken", accessToken);

            history.push('/');
        }

        //return <Redirect to="/" />


    }
    return (
        <div className="row h-100 align-items-center justify-content-center mx-0">
            <div className="col-3 ">
                <form onSubmit={onFormSubmit} className="d-grid shadow-lg p-3 mb-4  bg-white rounded  " method="POST">
                    <div className="mb-3">
                        <label htmlFor="exampleUsername" className="form-label ">Enter Username</label>
                        <input onChange={event => setUsername(event.target.value)} type="text" className="form-control shadow-sm " id="exampleUsername"
                            placeholder="Username" required />
                        <div id="emailHelp" className="form-text">Your username is always unique</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Enter Password</label>
                        <input onChange={event => setPassword(event.target.value)} type="password" className="form-control shadow-sm " id=" exampleInputPassword1" placeholder="Password"
                            required />
                    </div>
                    <div className="row ">
                        <div className="col-6">
                            <Link className="link mb-2" to='/forgot-password'>Forgot Password?</Link>
                            {/* <a href="" className="link mb-3  ">
                                Forgot Password?</a> */}

                        </div>
                        <div className="col-6 text-end ">
                            <div className="mb-2 form-check-inline justify-content-end align-items-end">
                                <input type="checkbox" className="form-check-input shadow-sm me-1" id="exampleCheck1" />
                                <label className="form-check-label ms-1" htmlFor="exampleCheck1">Keep Logged In</label>
                            </div>
                        </div>
                    </div>
                    {errorMessage ? <div className="text-danger ">{errorMessage}</div> : null}
                    <button type="submit" className="btn btn-primary bg-gradient mt-2 ">Log In</button>

                </form>
                <div className="container d-flex justify-content-center ">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="" className="form-label">Don't have an Account yet?</label>
                            <Link className="btn btn-sm btn-outline-dark bg-gradient m-2" to='/register' >Register</Link>
                            {/* <a href="register" className="btn btn-sm btn-outline-dark bg-gradient m-2">Register </a> */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login;