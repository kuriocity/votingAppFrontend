import React, { useState } from 'react';
import { BrowserRouter, HashRouter, MemoryRouter, Route, Link, useHistory, Redirect } from 'react-router-dom';

const NavBar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm mb-3">
            <div className="container">
                {/* <a className="navbar-brand" href="/">Voting App</a> */}
                <Link className="navbar-brand " to='/'><i className="fas fa-poll fs-3 me-1 logo"></i> Voting App</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <Link to='/create-poll' className="btn btn-dark bg-gradient shadow ms-auto mx-2 ps-2 pt-1" type="submit">
                        {/* <i className="align-top bi bi-plus fst-normal">Create Poll </i> */}
                        {/* <i className="fas fa-plus me-2 "> </i>Create Poll */}
                        <span className="material-icons md-24 fs-5 add-icon me-1">add</span><span>Create Poll</span>
                    </Link>
                    <ul className="navbar-nav  mb-2 mb-lg-0 text-end">
                        <li className="nav-item border-start">
                            {/* <a className="nav-link active" aria-current="page" href="">Home</a> */}
                            <Link className="nav-link active" to='/'>Home</Link>

                        </li>
                        <li className="nav-item border-start">
                            {/* <a className="nav-link" href="#">Link</a> */}
                            <Link className="nav-link" to='/'>My Polls</Link>

                        </li>
                        <li className="nav-item dropdown border-start">
                            <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Profile Name</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="">Profile</Link></li>
                                <li><Link className="dropdown-item" to="">Check Votes</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/login">Logout</Link></li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;