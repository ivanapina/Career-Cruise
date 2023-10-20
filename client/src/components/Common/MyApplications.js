import React, { Component, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import {Link, BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch} from 'react-router-dom';


export default class ViewJobs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            jobs: []
        }
        
    }

    ratejob(Job,i){
        console.log(Job , i)
        return (
            <td>
                <Link to={{ pathname: '/ratejob', state: { 'jobID': this.state.jobs[i]._id }}}>Rate Job</Link>
            </td>
        )
    }

    async componentDidMount() {
        let token = localStorage.getItem('token');
        const headers = {
            // 'Content-Type': 'application/json',
            'token': token
        }
        console.log(headers)
        axios.post('http://localhost:4000/user/my_applications', {"x":"x"} , { headers: headers })
            .then(res => {
                console.log(res.data);
                this.setState({ jobs: res.data });
            })
            .catch(err => {
                if (err.response.data)
                    alert(err.response.data);
                console.log(err)
            });
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Recruiter name</th>
                            <th>Rating</th>
                            <th>Salary</th>
                            <th>Duration</th>
                            <th>Deadline</th>
                            <th>Type of job</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.jobs && this.state.jobs.map((Job, i) => {
                                let dict = { 0: "Full-time", 1: "Part-time", 2: "WFH" }
                                console.log(i)
                                return (
                                    <tr key={i}>
                                        <td>{Job.title}</td>
                                        <td>{Job.recruiterName} </td>
                                        <td>{Job.numRating != 0 ? Job.totalRating / Job.numRating : 0} </td>
                                        <td>{Job.salary} </td>
                                        <td>{Job.duration} </td>
                                        <td>{Job.deadline} </td>
                                        <td>{dict[Job.jobType]} </td>
                                        {this.ratejob(Job,i)}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div >
        )
    }
}