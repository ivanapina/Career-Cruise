import React, { Component, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'
import Modal from 'react-modal';
import Zip from 'collect';

import {
    Link, BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch
} from 'react-router-dom';


export default class ViewJobs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            search: '',
            jobs: [],
            NameType: 1,
            ratingType: 1,
            DateofApplicationType: 1,
            showModal: false,
            SOP: '',
            res: [],
            fullTime: false,
            partTime: false,
            WFH: false,
            applicants: [],
            applications: [],
            lowerName: 0,
            higherName: 999999999,
            DateofApplication: 7,
            jobID: this.props.location.state.job._id
        }
        console.log(this.state.jobID)
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.sortbyRating = this.sortbyRating.bind(this);
        this.sortbyName = this.sortbyName.bind(this);
        this.sortbyDateofApplication = this.sortbyDateofApplication.bind(this);
        this.applyJob = this.applyJob.bind(this);
        this.onChangeLowerName = this.onChangeLowerName.bind(this);
        this.onChangeHigherName = this.onChangeHigherName.bind(this);
        this.onChangeDateofApplication = this.onChangeDateofApplication.bind(this);
        this.zip = this.zip.bind(this);
        this.notreject = this.notreject.bind(this);
        this.reject = this.reject.bind(this);
    }

    onChangeSearch(event) {
        this.setState({ search: event.target.value });
    }
    onChangeLowerName(event) {
        this.setState({ lowerName: Number(event.target.value) });
    }
    onChangeHigherName(event) {
        this.setState({ higherName: Number(event.target.value) });
    }
    onChangeDateofApplication(event) {
        this.setState({ DateofApplication: event.target.value });
    }


    componentDidMount() {
        let token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        const body = {
            jobID: this.state.jobID
        }
        axios.post('http://localhost:4000/user/job_applications', body, { headers: headers })
            .then(res => {
                console.log(res.data);
                var ind = []
                var newapplications = []
                var newapplicants = []
                for (var indu in res.data.applications) {
                    if (res.data.applications[indu].status != 3) {
                        ind.push(indu)
                        newapplications.push(res.data.applications[indu])
                        newapplicants.push(res.data.applicants[indu])
                    }
                }
                this.setState({ applications: newapplications, applicants: newapplicants });
            })
            .catch(err => {
                if (err.response.data)
                    alert(err.response.data);
                console.log(err)
            });
    }
    zip(a, b) {
        var arr = [];
        for (var key in a) arr.push([a[key], b[key]]);
        return arr;
    }

    applyJob(Job, i) {
        return (
            <td>
                <Link to={{ pathname: '/applyjob', state: { 'job': this.state.jobs[i] } }}>Apply to Job</Link>
            </td>
        )
    }

    sortbyName = () => {
        let applicants = this.state.applicants;
        let applications = this.state.applications;
        let n = applicants.length;
        if (this.state.NameType) {
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - 1; j++) {
                    let left = applicants[j].name;
                    let left2 = applicants[j + 1].name;
                    if (left < left2) {
                        applicants[j] = [applicants[j + 1], applicants[j + 1] = applicants[j]][0];
                        applications[j] = [applications[j + 1], applications[j + 1] = applications[j]][0];
                    }
                }
            }
        }
        else {
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - 1; j++) {
                    let left = applicants[j].name;
                    let left2 = applicants[j + 1].name;
                    if (left > left2) {
                        applicants[j] = [applicants[j + 1], applicants[j + 1] = applicants[j]][0];
                        applications[j] = [applications[j + 1], applications[j + 1] = applications[j]][0];
                    }
                }
            }
        }
        this.state.NameType = !this.state.NameType;
        this.setState({ applicants, applications });

    }

    sortbyRating = () => {
        let applicants = this.state.applicants;
        let applications = this.state.applications;
        let n = applicants.length;
        if (this.state.ratingType) {
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - 1; j++) {
                    let left = applicants[j].numRating != 0 ? applicants[j].totalRating / applicants[j].numRating : 0;
                    let left2 = applicants[j + 1].numRating != 0 ? applicants[j + 1].totalRating / applicants[j + 1].numRating : 0;
                    if (left < left2) {
                        applicants[j] = [applicants[j + 1], applicants[j + 1] = applicants[j]][0];
                        applications[j] = [applications[j + 1], applications[j + 1] = applications[j]][0];
                    }
                }
            }
        }
        else {
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - 1; j++) {
                    let left = applicants[j].numRating != 0 ? applicants[j].totalRating / applicants[j].numRating : 0;
                    let left2 = applicants[j + 1].numRating != 0 ? applicants[j + 1].totalRating / applicants[j + 1].numRating : 0;
                    if (left > left2) {
                        applicants[j] = [applicants[j + 1], applicants[j + 1] = applicants[j]][0];
                        applications[j] = [applications[j + 1], applications[j + 1] = applications[j]][0];
                    }
                }
            }
        }
        this.state.ratingType = !this.state.ratingType;
        this.setState({ applicants, applications });

    }

    sortbyDateofApplication = () => {
        let applicants = this.state.applicants;
        let applications = this.state.applications;
        let n = applicants.length;
        if (this.state.DateofApplicationType) {
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - 1; j++) {
                    let left = applications[j].dateOfApplication;
                    let left2 = applications[j + 1].dateOfApplication;
                    if (left < left2) {
                        applicants[j] = [applicants[j + 1], applicants[j + 1] = applicants[j]][0];
                        applications[j] = [applications[j + 1], applications[j + 1] = applications[j]][0];
                    }
                }
            }
        }
        else {
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - 1; j++) {
                    let left = applications[j].dateOfApplication;
                    let left2 = applications[j + 1].dateOfApplication;
                    if (left > left2) {
                        applicants[j] = [applicants[j + 1], applicants[j + 1] = applicants[j]][0];
                        applications[j] = [applications[j + 1], applications[j + 1] = applications[j]][0];
                    }
                }
            }
        }
        this.state.DateofApplicationType = !this.state.DateofApplicationType;
        this.setState({ applicants, applications });

    }

    notreject(e) {
        e.preventDefault()
        let index = e.target.value
        let application = this.state.applications[index]
        let token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        const body = {
            applicationID: application._id,
            status: Number(application.status) + 1
        }
        console.log(body)
        // return;
        axios.post('http://localhost:4000/user/change_status', body, { headers: headers })
            .then(res => {
                console.log(res.data);

                if (body.status == 2) {
                    console.log("itthe")
                    axios.post('http://localhost:4000/user/reduce_job_position', { jobID: application.jobID , applicantID : application.applicantID }, { headers: headers }).then(res2 => {
                        alert("Job status updated")
                        window.location.reload()
                    })
                    .catch(err => {
                        if (err.response.data)
                            alert(err.response.data);
                        console.log(err)
                    });
                }
                // this.setState({ jobs: res.data });
            })
            .catch(err => {
                if (err.response.data)
                    alert(err.response.data);
                console.log(err)
            });
    }

    reject(e) {
        e.preventDefault()
        let index = e.target.value
        let application = this.state.applications[index]
        let token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        const body = {
            applicationID: application._id,
            status: 3
        }
        console.log(body)
        // return;
        axios.post('http://localhost:4000/user/change_status', body, { headers: headers })
            .then(res => {
                console.log(res.data);
                window.location.reload()
                alert("Job status updated")
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
                <Button variant="info" onClick={this.sortbyName} >Order by Name</Button> &nbsp; &nbsp;
                <Button variant="info" onClick={this.sortbyDateofApplication} >Order by Date of Application</Button>&nbsp; &nbsp;
                <Button variant="info" onClick={this.sortbyRating} >Order by Rating</Button>
                <br></br>
                <br></br>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Skills</th>
                            <th>Date of Application</th>
                            <th>Education</th>
                            <th>SOP</th>
                            <th>Rating</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.zip(this.state.applicants, this.state.applications).map((x, i) => {
                                let dict = { 0: "Applied", 1: "Shortlisted", 2: "Accepted", 3: "Rejected" }
                                return (
                                    <tr key={i}>
                                        <td>{x[0].name}</td>
                                        <td>{x[0].skills}</td>
                                        <td>{x[1].dateOfApplication}</td>
                                        <td>{x[0].education}</td>
                                        <td>{x[1].SOP}</td>
                                        <td>{x[0].numRating != 0 ? x[0].totalRating / x[0].numRating : 0}</td>
                                        <td>{dict[x[1].status]}</td>
                                        { x[1].status != 2 &&
                                            <td><Button variant="success" value={i} onClick={this.notreject}>{x[1].status == 0 ? "Shortlist Application" : "Accept Application"}</Button></td>}
                                        <td><Button variant="danger" value={i} onClick={this.reject}>Reject Application</Button></td>
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