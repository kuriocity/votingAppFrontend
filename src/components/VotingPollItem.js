import React, { useState } from 'react';

const VotingPollItem = ({ pollItem, totalVoteCount, pollClicked, setPollClicked }) => {

    const onPollClick = (event) => {
        console.log(`${event.target.value} clicked!`);
        setPollClicked(event.target.value)
    }

    console.log("Percentage Votes of " + pollItem.name + " : " + pollItem.votes * 100 / totalVoteCount);

    return (
        <div className="mx-auto shadow-sm bg-white p-3 mb-0 rounded bg-gradient" >
            <div className="border border-1 rounded-3 p-2 mb-1 "  >

                <label className="btn btn-outline-dark bg-gradient d-inline ms-0 fs-6 d-grid d-inline " htmlFor={pollItem.name}>
                    <input required type="radio" className="btn-check-radio d-inline ms-0 float-start  d-inline " name="btnradio" value={pollItem.name} id={pollItem.name}
                        checked={pollClicked == pollItem.name} onChange={onPollClick} />
                    <span className="">{pollItem.name}</span>
                </label>
                <div class="progress shadow-sm text-center" style={{ "height": "12px" }}>
                    <div class="progress-bar " role="progressbar" style={{ "width": (pollItem.votes * 100 / totalVoteCount) + "" + "%" }} >
                        {Math.floor(pollItem.votes * 100 / totalVoteCount)} %
                    </div>
                </div>
            </div>
        </div>
    )
}


export default VotingPollItem;