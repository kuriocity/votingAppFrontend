import React, { useState, useEffect } from 'react';
import VotingPoll from './VotingPoll';
import backend from '../apis/backend';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

const Home = () => {
    const [voteCode, setVoteCode] = useState('');
    const [polls, setPolls] = useState([]);
    const [pollQuestion, setPollQuestion] = useState('');

    const [isCodeValid, setIsCodeValid] = useState(true);
    const { voterCodeParams } = useParams();


    useEffect(() => {
        console.log("First Time Component Mount");
        console.log("Params Voter Code", voterCodeParams);

        if (voterCodeParams) {
            setVoteCode(voterCodeParams);
            getPolls(voterCodeParams);

        }
    }, []);

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
                setPollQuestion(response.data.pollQuestion);
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
                <input autoFocus onChange={onInputChange} type="text" value={voteCode} className="form-control" id="searchPoll" />
                <label htmlFor="searchPoll">Enter Voter Code</label>
            </div>
            {
                isCodeValid ? null : <div className="alert alert-warning alert-dismissible fade show w-50 mx-auto" role="alert">
                    <i className="bi bi-exclamation-triangle "></i> Invalid Voter Code!
                    <button type="button" className="btn-close " data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }
            <div className="w-25 mx-auto">
                <VotingPoll voteCode={voteCode} polls={polls} getPolls={getPolls} pollQuestion={pollQuestion} isCodeValid={isCodeValid} />
            </div>


        </div>

    );
}

export default Home;