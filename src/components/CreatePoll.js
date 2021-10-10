import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import { BrowserRouter, HashRouter, MemoryRouter, Route, Link, useHistory, Redirect } from 'react-router-dom';
import CreatePollItem from './CreatePollItem';
import backend from '../apis/backend';


const CreatePoll = () => {
    const onInputChange = (event, index) => {
        newOptionsValue[index] = event.target.value;
        console.log('value index', index);
        setNewOptionsValue(newOptionsValue);

        console.log(newOptionsValue);
    }
    const [newOptions, setNewOptions] = useState([]);
    const [newOptionsValue, setNewOptionsValue] = useState([]);
    const [pollQuestion, setPollQuestion] = useState('');
    const [pollCreated, setPollCreated] = useState(false);
    const [voterCodeId, setVoterCodeId] = useState('');
    const [uniquePollOptions, setUniquePollOptions] = useState(true);

    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView();
    const executeFocus = () => myRef.current && myRef.current.focus();

    useEffect(() => {
        document.title = "Create Poll"
        setNewOptions([
            <CreatePollItem key={0} index={0} isFocused={false} onInputChange={onInputChange} required={true} />,
            <CreatePollItem key={1} index={1} isFocused={false} onInputChange={onInputChange} required={true} />,
            <CreatePollItem key={2} index={2} isFocused={false} onInputChange={onInputChange} required={true} />]);

        console.log("First Time Load", newOptions);
        //myRef.current.focus();
        //myRef.current && myRef.current.focus()
        executeFocus();
        console.log(myRef.current);
    }, []);
    
    function checkIfArrayIsUnique(myArray) {
        return myArray.length === new Set(myArray).size;
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        console.log(pollQuestion);
        console.log(newOptionsValue);

        if (!checkIfArrayIsUnique(newOptionsValue)) {
            return setUniquePollOptions(false);
        } else {
            setUniquePollOptions(true);
        }
        const voterCode = Math.floor(Math.random() * 10000) + '';
        setVoterCodeId(voterCode)
        submitPoll(voterCode);
        console.log({ voterCode, polls: newOptionsValue.map(name => { return { name } }) });
    }

    const submitPoll = async (voterCode) => {
        const polls = newOptionsValue.map(name => { return { name } });
        const requestBody = { voterCode, pollQuestion, polls };
        console.log("requestBody", requestBody);
        const response = await backend.post('/polls', requestBody, { headers: { "Authorization": `Bearer ${window.localStorage.getItem("accessToken")}` } }).catch(error => {
            console.log("Error Respone", error.response.data);
        });
        if (response) {
            console.log("Post Poll", response.data);
            setPollCreated(true);
        }
    }



    return (

        <div>
            <Navbar />
            <div className="col-6 p-1 mx-auto">

                <div className=" ">
                    <div className="fs-4 mb-3 w-auto d-inline me-auto" style={{ fontSize: '1.5rem' }}>Create your poll</div>
                    <button type="reset" className="btn btn-sm btn-secondary shadow-sm float-end mt-1 " form="form">Reset Form</button>
                </div>
                <hr />

                <form className="" onSubmit={onFormSubmit} id="form">
                    <div className="form-floating mb-3 shadow-sm">
                        <textarea autoFocus ref={myRef} onChange={(event) => { setPollQuestion(event.target.value) }} className="form-control" placeholder="Leave a comment here" id="poll" rows="3" style={{ height: "100px" }} autoFocus></textarea>
                        <label className="text-muted" for="poll">Enter Poll Question...</label>
                    </div>

                    {/* <div className="form-floating shadow-sm">
                        <input className="form-control form-control-sm mb-3" id="option1" type="text" placeholder="Option 1" />
                        <label for="option1" className="form-text mb-3">Poll Option 1</label>
                    </div>
                    <div className="form-floating mb-3 shadow-sm">
                        <input className="form-control mb-3" id="option1" type="text" placeholder="Option 2" />
                        <label for="option1" className="form-text mb-3">Poll Option 2</label>
                    </div>
                    <div className="form-floating mb-3 shadow-sm ">
                        <input className="form-control mb-3" id="option1" type="text" placeholder="Option 3" />
                        <label for="option1" className="form-text mb-3">Poll Option 3</label>
                    </div> */}
                    {newOptions}
                    <button onClick={() => {
                        //newOptions.push(<CreatePollItem />)
                        setNewOptions([...newOptions, <CreatePollItem key={newOptions.length} isFocused={true} index={newOptions.length} onInputChange={onInputChange} />]);
                        setNewOptionsValue([...newOptionsValue, '']);
                        //executeScroll();
                    }} type="button" className="btn btn-outline-dark bg-gradient shadow pe-2 ">
                        Add Option
                        <span className="material-icons md-24 fs-5 add-icon Dms-1">add</span>
                    </button>
                    <hr />
                    <button type="button" onClick={onFormSubmit} className="btn btn-success bg-gradient shadow px-3 py-2 mb-3">Submit your poll</button>
                </form>
                {
                    !uniquePollOptions ?
                        <div className="alert alert-danger bg-gradient shadow-sm border alert-dismissible fade show" role="alert">
                            All the poll options should be <strong>unique!</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div> : null
                }
                {pollCreated ?
                    <div className="alert alert-success shadow-sm border alert-dismissible fade show" role="alert">
                        <h4 className="alert-heading"><i className="bi bi-check-circle"></i> Success!</h4>
                        <p>Your Poll has been successfully created</p>
                        <hr />
                        <p className="mb-0">
                            Your Voter Code is {voterCodeId} Please find your poll  Link <Link className="alert-link" to={"poll/" + voterCodeId}> here</Link>
                            <button type="button" id='copy'
                                onClick={() => { navigator.clipboard.writeText('http://localhost:3000/poll/' + voterCodeId); document.getElementById('copy').innerHTML = 'Copied!' }}
                                className="btn btn-outline-dark bg-gradient float-end btn-sm shadow-sm">Copy Link</button>

                        </p>
                        <button type="button" className="btn-close" onClick={() => setPollCreated(false)} data-bs-dismiss="alert" aria-label="Close"></button>
                    </div> : null
                }
            </div>

        </div>
    );
}

export default CreatePoll;