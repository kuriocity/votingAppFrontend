import React, { useState } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
const Profile = () => {
    const { username } = useParams();
    return (
        <div className="">
            <Navbar />
            <div className="card-body text-center bg-light shadow-sm">{username}</div>
        </div>
    )
}

export default Profile;