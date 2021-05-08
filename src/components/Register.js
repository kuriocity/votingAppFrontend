import React, { useState } from 'react';
import { BrowserRouter, HashRouter, MemoryRouter, Route, Link, useHistory, Redirect } from 'react-router-dom';
import authentication from '../apis/authentication';

const Register = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();

    const onFormSubmit = (event) => {
        event.preventDefault();
        registerUser();
    }
    const registerUser = async () => {
        const response = await authentication.post("/register", { username, firstName, lastName, email, password })
        console.log('register', response);

        history.push("/login")


    }

    return (
        <div className="row h-100 align-items-center justify-content-center mx-0">
            <div className="col-3">
                <form onSubmit={onFormSubmit} className=" shadow-lg p-3 mb-3 bg-white rounded">
                    <div className="row  g-2">
                        <div className="col-12 mb-0">
                            <div className=" input-group ">
                                <span className="input-group-text" id="basic-addon1">@</span>
                                <input onChange={event => setUsername(event.target.value)} type="text" className="form-control" placeholder="Username" aria-label="Username"
                                    aria-describedby="basic-addon1" required />
                            </div>
                        </div>

                        <div className="col-6 mt-0 ">
                            <label htmlFor="validationCustom01" className="form-label"></label>
                            <input onChange={event => setFirstName(event.target.value)} type="text" className="form-control" id="validationCustom01" placeholder="First Name"
                                required />
                            <div className="valid-feedback">
                                Looks good!
                        </div>
                        </div>
                        <div className="col-6 mt-0 ">
                            <label htmlFor="validationCustom02" className="form-label"></label>
                            <input onChange={event => setLastName(event.target.value)} type="text" className="form-control" id="validationCustom02" placeholder="Last Name"
                                required />
                            <div className="valid-feedback">
                                Looks good!
                        </div>
                        </div>
                        <div className="col-12 mt-4 ">
                            <input onChange={event => setEmail(event.target.value)} type="text" className="form-control" id="validationCustom02"
                                placeholder="Email Address" required />

                        </div>
                        <div className="col-12 mt-4 mb-3">
                            <input onChange={event => setPassword(event.target.value)} type="password" name="" id="" className="form-control" placeholder="New Password" required />
                        </div>
                        <div className="col-3">
                            <label htmlFor="" className="form-check-label text-center">Gender</label>

                        </div>

                        <div className="col-4 mb-2 ">
                            <div className="form-check form-check-inline ">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                                    value="option1" />
                                <label className="form-check-label text-muted" htmlFor="inlineRadio1">Male</label>
                            </div>
                        </div>
                        <div className="col-4 mb-2">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                                    value="option2" />
                                <label className="form-check-label text-muted" htmlFor="inlineRadio2">Female</label>
                            </div>
                        </div>
                        <div className="col-3 mb-3 ">
                            <div className='input-group' id=''>
                                <span className="input-group-text ">Date of Birth</span>
                            </div>
                        </div>
                        <div className="col-9 mb-3 ">
                            <input type='date' placeholder="Date" className="form-control text-center" />
                        </div>
                        <div className=" col-12">
                            <button type="submit" className="btn btn-primary bg-gradient w-100">Sign Up</button>
                        </div>
                    </div>

                </form>

                <div className="container d-flex justify-content-center ">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="" className="form-label">Have an Account?</label>
                            {/* <a href="login" className="btn btn-sm btn-outline-dark bg-gradient m-2">Login</a> */}
                            <Link to="/login" className="btn btn-sm btn-outline-dark bg-gradient m-2" >Login</Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}

export default Register;


