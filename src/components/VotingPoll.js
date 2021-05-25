import React, { useState, useEffect } from 'react';
import VotingPollItem from './VotingPollItem';
import backend from '../apis/backend';


const VotingPoll = ({ voteCode, polls, getPolls, setPolls, pollQuestion, isCodeValid }) => {
    const arr = [{ id: 1, name: 'Bjp' }, { id: 2, name: 'Shiv Sena' }, { id: 3, name: 'Aaam Aadmi Party' }];

    const [pollClicked, setPollClicked] = useState('');
    const [pollClickedIndex, setPollClickedIndex] = useState(0);
    const [totalVoteCount, setTotalVoteCount] = useState(1);
    const [voteSubmitted, setVoteSubmitted] = useState(false);

    console.log('in VotingPoll', polls);

    useEffect(() => {
        console.log('in UseEffect', polls);

        const totalVotes = polls.reduce(function (previous, current) { return previous + current.votes; }, 0);
        if (totalVotes) setTotalVoteCount(totalVotes)
        console.log("Total votes set " + totalVotes);
    }, [polls]);

    const onFormSubmit = async (event) => {
        event.preventDefault();

        console.log('This is the poll item selected ', pollClicked);
        if (pollClicked) {
            const index = polls.findIndex(poll => poll.name === pollClicked)
            setPollClickedIndex(index);
            const submittedResponse = await submitVote(index);
            console.log("%csubmittedResponse " + submittedResponse, 'background: #222; color: #bada55');
            if (submittedResponse) {
                setVoteSubmitted(true);
                setTimeout(() => {
                    setVoteSubmitted(false);
                }, 2000);
            }
        }
    }

    const submitVote = async (index) => {
        console.log('Submitting your vote... ', pollClicked);
        var pollVotedObject = polls
        const response = await backend.patch("/polls/" + voteCode + "/vote/" + index, { polls: pollVotedObject },
            { headers: { "Authorization": `Bearer ${window.localStorage.getItem("accessToken")}` } })
            .catch(error => {   
                console.log("Error Respone", error.response.data);
            });

        console.log('Voted Respone', response);
        //getPolls(voteCode);
        setPolls(response.data.polls);
        return response;
    }

    const renderedList = polls.map((pollItem, index) => {
        return (
            <div className="" key={pollItem._id}>
                {pollItem.votes + " votes"}
                <VotingPollItem pollItem={pollItem} index={index} key={pollItem._id} totalVoteCount={totalVoteCount} pollClicked={pollClicked} setPollClicked={setPollClicked} />
            </div>)

    })

    return (
        <div className="text-center">
            {console.log('polls : ', polls)}
            {
                isCodeValid && polls.length == 0 ?
                    < div className="spinner-border text-secondary " role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> :
                    ''
            }
            {
                isCodeValid && polls.length !== 0 ?
                    <form onSubmit={onFormSubmit} className="">

                        <div className="form-label bg-light" >{pollQuestion}</div>

                        {renderedList}

                        <button type="submit" class="btn btn-success bg-gradient shadow my-3 py-2 px-3  ">Submit Vote</button>
                    </form> : null
            }
            {

                <div className={`alert alert-primary bg-gradient px-0 alert-voted  ${voteSubmitted ? 'alert-shown' : 'alert-hidden'}`} role="alert">
                    <i className="bi bi-check-circle"></i> Your vote '{polls[pollClickedIndex] ? polls[pollClickedIndex].name : ''}' has been    submitted!
                    </div>
            }




        </div>


    )
}


export default VotingPoll;