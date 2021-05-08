import React, { useState } from 'react';

const VotingPollItem = ({ item }) => {

    const onPollClick = () => {

    }
    return (
        <div>
            <div className="border border-1 rounded-3 p-2" onClick={onPollClick}>
                <input type="radio" className="btn-check " name="btnradio" id={item} />
                <label className="btn btn-outline-primary bg-gradient w-100 fs-6 " htmlFor={item}>
                    {item}
                </label>

            </div>
        </div>
    )
}


export default VotingPollItem;