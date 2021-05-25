import React, { useState } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
const Profile = () => {
    const { username } = useParams();
    return (
        <div className="">
            <Navbar />
            <div className="card-body text-center bg-light shadow-sm">{username}</div>
            <div className="container">
                <div className="row text-center gx-5">
                    <div className="col">
                        Polls Created
                        <div class="card bg-light   shadow-sm">
                            <div class="card-header fs-4 shadow-sm">
                                Poll Question?
                            </div>
                            <div class="card-body">
                                <h5 class="card-title mb-0">Option Name</h5>
                                <p class="card-text mb-2">(Most Voted)</p>
                                <a href="/poll/results/7769" class="btn btn-primary shadow-sm " shadow-sm >Check Results</a>
                            </div>
                            <div class="card-footer text-muted">
                                110 people voted
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        Polls Voted
                        <div class="card shadow-sm">
                            <div class="card-header fs-5 shadow-sm">
                                Poll Question?
                            </div>
                            <div class="card-body">
                                <h5 class="card-title mb-1">You Voted Option2</h5>
                                <p class="card-text mb-2">2 days back</p>
                                <a href="#" class="btn btn-primary shadow-sm ">Change Vote</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile;