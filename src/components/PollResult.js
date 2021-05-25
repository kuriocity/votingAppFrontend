import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import backend from '../apis/backend';
import { useParams } from 'react-router-dom';

const PollResult = () => {
    const [usersVoted, setUsersVoted] = useState([]);
    const [poll, setPoll] = useState([]);
    const { voterCodeParams } = useParams();

    useEffect(() => {
        getUsersVoted();
        document.title = "Poll Result" //+ poll.pollQuestion
    }, []);

    const getUsersVoted = async () => {
        const response = await backend.get('/polls/' + voterCodeParams + '/votes/users',
            { headers: { "Authorization": `Bearer ${window.localStorage.getItem("accessToken")}` } })
            .catch((error) => {
                if (error.response) {
                    console.log('data', error.response.data);
                    console.log('status', error.response.status);
                    console.log('headers', error.response.headers);
                }
            });
        if (response) {
            console.log("results ", response.data);
            let array = response.data.usersVoted;
            setPoll(response.data);
            array.map((arr, index) => {
                arr.map((user) => {
                    console.log('inside user array ', user);
                    const object = {
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        optionVoted: response.data.polls[/*user.pollsVoted[voterCodeParams]*/ index].name
                    }
                    console.log(usersVoted);
                    setUsersVoted((prev) => [...prev, object])
                })

            })
        }
    }

    return (
        <div>
            <Navbar />
            <table className="container table table-striped table-hover caption-top ">
                <caption className="fs-5">List of users voted <strong>{poll.pollQuestion}</strong></caption>
                <thead className="table-light bg-gradient">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Option Voted</th>
                        {/* <th scope="col">Time Voted</th> */}
                    </tr>
                </thead>
                <tbody>
                    {/* <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@facebook</td>
                        <td>Option Index</td>
                         <td>35 mins ago</td> 
                    </tr> */}
                    {/* <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@google</td>
                        <td>Option Index</td>
                    </tr> */}
                    {/* <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>Page</td>
                        <td><a href="/@twitter" className="text-decoration-none">@twitter</a></td>
                        <td>Option Index</td>
                    </tr> */}
                    {
                        //[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        usersVoted
                            .map(({ username, firstName, lastName, optionVoted }, index) => {
                                return (
                                    <PollResultTableItem username={username} firstName={firstName} lastName={lastName} optionVoted={optionVoted} index={index} />
                                )
                            })
                    }
                </tbody>
            </table>
        </div>
    )
}

const PollResultTableItem = ({ username, firstName, lastName, optionVoted, index }) => {

    return (
        <tr className="">
            <th scope="row">{index + 1}</th>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td><a href={"/@" + username} className="text-decoration-none">@{username}</a></td>
            <td>{optionVoted}</td>
            {/* <td>35 mins ago</td> */}
        </tr>
    );
}

export default PollResult
