import React, { Component, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom';


export default class ViewJobs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            jobs: []
        }
        this.deleteJob = this.deleteJob.bind(this);
        this.editJob = this.editJob.bind(this);
        this.viewApplicants = this.viewApplicants.bind(this);
    }

    componentDidMount() {
        console.log("reeeeeeeeeeeeeeeeeeeeeeee")
        let token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        console.log(headers)
        axios.post('http://localhost:4000/user/my_listings', { "x": "x" }, { headers: headers })
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


    editJob(Job, i) {
        console.log(Job, i)
        return (
            <td>
                <Link to={{ pathname: '/editjob', state: { 'job': this.state.jobs[i] } }}>Edit Job</Link>
            </td>
        )
    }

    viewApplicants(Job, i) {
        console.log(Job, i)
        return (
            <td>
                    <Link to={{ pathname: '/viewapplicants', state: { 'job': this.state.jobs[i] } }}>View Applicants</Link>
            </td>
        )
    }

    deleteJob(e) {
        e.preventDefault()
        let index = e.target.value
        let job = this.state.jobs[index]
        console.log(job)
        let token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        const body = {
            jobID: job._id
        }
        axios.post('http://localhost:4000/user/delete_job', body, { headers: headers })
            .then(res => {
                console.log(res.data);
                window.location.reload()
                // this.setState({ jobs: res.data });

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
                            <th>Date of Posting</th>
                            <th>Number of Applicants</th>
                            <th>Remaining Positions</th>
                            {/* <th>Delete Job</th> */}
                            {/* <th>Edit Job</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.jobs.map((Job, i) => {
                                let dict = { 0: "Full-time", 1: "Part-time", 2: "WFH" }
                                return (
                                    <tr key={i}>
                                        {/* <td>{Job._id}</td> */}
                                        <td>{Job.title}</td>
                                        <td>{Job.dateOfPosting} </td>
                                        <td>{Job.currentApplications} </td>
                                        <td>{Job.availablePos} </td>
                                        <td><Button variant="danger" value={i} onClick={this.deleteJob}>Delete Job</Button></td>
                                        {this.editJob(Job, i)}
                                        {this.viewApplicants(Job, i)}
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