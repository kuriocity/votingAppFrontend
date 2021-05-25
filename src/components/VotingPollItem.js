import React, { useState } from 'react';

const VotingPollItem = ({ pollItem, totalVoteCount, pollClicked, setPollClicked }) => {

    const onPollClick = (event) => {
        console.log(`${event.target.value} clicked!`);
        setPollClicked(event.target.value)
    }

    console.log("Percentage Votes of " + pollItem.name + " : " + pollItem.votes * 100 / totalVoteCount);

    return (
        <div className="mx-auto shadow-sm bg-white p-3  mb-0 rounded bg-gradient" >
            <div className="border border-1 rounded-3 p-2 mb-1  "  >
                <input required type="radio" className="btn-check d-inline ms-0 float-start  d-inline shadow bg-gradient " name="btnradio" value={pollItem.name} id={pollItem.name}
                    checked={pollClicked == pollItem.name} onChange={onPollClick} />

                <label className="btn btn-outline-dark bg-gradient ms-0 fs-6 d-grid d-inline shadow bg-gradient " htmlFor={pollItem.name}>
                    <div className="row align-items-center">
                        <input type="radio" className="col-2 ms-2" name="btnradio" checked={pollClicked === pollItem.name} id={pollItem.name+" Dummy Radio"} onChange={() => { }} />
                        <div className="col text-center me-5 ps-0 ">{pollItem.name}</div>
                    </div>
                </label>
                <div class="progress shadow-lg text-center bg-gradient mt-2" style={{ "height": "12px" }}>
                    <div class="progress-bar " role="progressbar" style={{ "width": (pollItem.votes * 100 / totalVoteCount) + "" + "%" }} >
                        {Math.floor(pollItem.votes * 100 / totalVoteCount)} %
                    </div>
                </div>
            </div>
        </div>
    )
}


export default VotingPollItem;