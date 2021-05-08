import React, { useState } from 'react';
import VotingPoll from './VotingPoll';
import backend from '../apis/backend';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

const Home = () => {
    const [voteCode, setVoteCode] = useState('');
    const [polls, setPolls] = useState([]);
    const [isCodeValid, setIsCodeValid] = useState(true);
    const { voterCode } = useParams();

    console.log("Params Voter Code", voterCode);
    const onFormClick = (event) => {
        event.preventDefault();
    }
    const onInputChange = (event) => {
        console.log('Input changed', event.target.value);
        setVoteCode(event.target.value);
        console.log('value of voteCode ', voteCode);
        getPolls(event.target.value);

    }
    const getPolls = async code => {
        console.log('in getPolls', code);
        if (code) {
            const response = await backend.get('/polls/' + code).catch((error) => {
                setIsCodeValid(false);
                if (error.response) {
                    console.log('data', error.response.data);
                    console.log('status', error.response.status);
                    console.log('headers', error.response.headers);
                }
            });
            setIsCodeValid(true);
            console.log('Reponse :', response);
            if (response) {
                setPolls(response.data.polls);
                setIsCodeValid(true);

            }
            else {
                setPolls([]);
                setIsCodeValid(false);
            }
        }

    }


    return (
        <div>
            <Navbar />
            <div className="form-floating mt-5 mb-3 w-50 mx-auto">
                <input autoFocus onChange={onInputChange} type="text" value={voteCode ? voteCode : (voterCode ? voterCode : '')} className="form-control" id="floatingPassword" />
                <label htmlFor="floatingPassword">Enter Voter Code</label>
            </div>
            {isCodeValid ? null : <div className="alert alert-warning alert-dismissible fade show w-50 mx-auto" role="alert">
                Invalid Voter Code!
               <button type="button" className="btn-close " data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
            <div className="w-25 mx-auto">
                {voteCode}
                <VotingPoll voteCode={voteCode} polls={polls} isCodeValid={isCodeValid} />
            </div>

            {voterCode}
        </div>

    );
}

export default Home;