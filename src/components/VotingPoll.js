import React, { useState } from 'react';
import VotingPollItem from './VotingPollItem';


const VotingPoll = ({ voteCode, polls, isCodeValid }) => {
    const arr = [{ id: 1, name: 'Bjp' }, { id: 2, name: 'Shiv Sena' }, { id: 3, name: 'Aaam Aadmi Party' }];


    console.log('in VotingPoll', polls);

    const renderedList = polls.map(party => {
        return (
            <div className="mx-auto shadow-sm bg-white p-3 mb-0 rounded bg-gradient" key={party._id}>
                <VotingPollItem item={party.name} />
            </div>
        )

    })


    return (


        <div className="text-center">
            {console.log('polls : ', polls)}
            {

                isCodeValid && polls ?
                    < div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> :
                    ''
            }
            { renderedList}
        </div>

    )
}


export default VotingPoll;