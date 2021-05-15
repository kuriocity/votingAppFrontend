import React, { useState } from 'react';
import { BrowserRouter, HashRouter, MemoryRouter, Route, Link, useHistory, Redirect } from 'react-router-dom';
import authentication from '../apis/authentication';

const ForgotPassword = () => {
    const [forgotPasswordEmailOrUsername, setForgotPasswordEmailOrUsername] = useState("");
    const [mailSent, setMailSent] = useState(false);
    const history = useHistory();

    const onFormSubmit = (event) => {
        event.preventDefault();
        sendEmail();
        setMailSent(true);
    }
    const sendEmail = async () => {
        const response = await authentication.post("/forgotPassword", {
            "EmailOrUsername": forgotPasswordEmailOrUsername
        }).catch((error) => {
            if (error.response) {
                console.log('data', error.response.data);
                console.log('status', error.response.status);
                console.log('headers', error.response.headers);
            }
        });
        console.log(response);
    }
    const onBackButtonClick = () => {
        history.push("/login")
    }
    return (
        <div className="row h-100 align-items-center justify-content-center mx-0">
            <div className="col-3 ">
                {mailSent ? <div className="alert alert-success" role="alert">
                <i className="bi bi-check-circle"></i> A reset link has been sent to your registered email. Please use it to reset your password.
                </div> : null}
                <form onSubmit={onFormSubmit} className="d-grid shadow-lg p-3 mb-4  bg-white rounded   " method="POST">
                    <div className="mb-2">
                        <div id="emailHelp" className="form-label fs-5 fw-normal">Forgot Password?</div>
                        <label htmlFor="exampleUsername" className="form-label text- fs-6 fw-normal">Enter Email or Username</label>
                        <input onChange={event => setForgotPasswordEmailOrUsername(event.target.value)} type="text" className="form-control shadow-sm " id="exampleUsername"
                            placeholder="Email or Username" required />
                    </div>
                    <button type="submit" className="btn btn-dark bg-gradient mt-1  mb-2">Reset Password</button>
                    <button onClick={onBackButtonClick} className="btn btn-white bg-gradient ">Back</button>

                </form>
            </div>

        </div>
    );
}

export default ForgotPassword;