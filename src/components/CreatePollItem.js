import React, { useState, useEffect, useRef } from 'react';

const CreatePollItem = ({ onInputChange, index, isFocused }) => {
    const myRef = useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView();

    useEffect(() => {
        console.log('CreatePollItem loaded');
        if (isFocused)
            myRef.current.focus();
        executeScroll()

    }, [])

    return (
        <div className="form-floating mb-3 shadow-sm " >
            {/* <button type="button" class="btn-close  float-end" ></button> */}
            <input ref={myRef} className="form-control mb-3" id="option1" type="text" placeholder="Option " onChange={(event) => onInputChange(event, index)} />
            <label for="option1" className="form-text mb-3">Poll Option {index + 1}</label>
        </div>
    );
}

export default CreatePollItem;
