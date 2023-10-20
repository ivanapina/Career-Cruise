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
            DateofJoiningType: 1,
            TitleType: 1,
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
        }
        console.log(this.state.jobID)
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.sortbyRating = this.sortbyRating.bind(this);
        this.sortbyName = this.sortbyName.bind(this);
        this.sortbyTitle = this.sortbyTitle.bind(this);
        this.sortbyDateofJoining = this.sortbyDateofJoining.bind(this);
        this.zip = this.zip.bind(this);
        this.rateapplicant = this.rateapplicant.bind(this);
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
        axios.post('http://localhost:4000/user/accepted_applications', body, { headers: headers })
            .then(res => {
                console.log(res.data);
                this.setState({ applicants: res.data.applicants, jobs: res.data.jobs });
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

    sortbyName = () => {
        let applicants = this.state.applicants;
        let jobs = this.state.jobs;
        let n = applicants.length;
        if (this.state.NameType) {
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - 1; j++) {
                    let left = applicants[j].name;
                    let left2 = applicants[j + 1].name;
                    if (left < left2) {
                        applicants[j] = [applicants[j + 1], applicants[j + 1] = applicants[j]][0];
                        jobs[j] = [jobs[j + 1], jobs[j + 1] = jobs[j]][0];
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
                        jobs[j] = [jobs[j + 1], jobs[j + 1] = jobs[j]][0];
                    }
                }
            }
        }
        this.state.NameType = !this.state.NameType;
        this.setState({ applicants, jobs });

    }

    sortbyTitle = () => {
        let applicants = this.state.applicants;
        let jobs = this.state.jobs;
        let n = applicants.length;
        if (this.state.TitleType) {
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - 1; j++) {
                    let left = jobs[j].title;
                    let left2 = jobs[j + 1].title;
                    if (left < left2) {
                        applicants[j] = [applicants[j + 1], applicants[j + 1] = applicants[j]][0];
                        jobs[j] = [jobs[j + 1], jobs[j + 1] = jobs[j]][0];
                    }
                }
            }
        }
        else {
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - 1; j++) {
                    let left = jobs[j].title;
                    let left2 = jobs[j + 1].title;
                    if (left > left2) {
                        applicants[j] = [applicants[j + 1], applicants[j + 1] = applicants[j]][0];
                        jobs[j] = [jobs[j + 1], jobs[j + 1] = jobs[j]][0];
                    }
                }
            }
        }
        this.state.TitleType = !this.state.TitleType;
        this.setState({ applicants, jobs });

    }

    sortbyRating = () => {
        let applicants = this.state.applicants;
        let jobs = this.state.jobs;
        let n = applicants.length;
        if (this.state.ratingType) {
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - 1; j++) {
                    let left = applicants[j].numRating != 0 ? applicants[j].totalRating / applicants[j].numRating : 0;
                    let left2 = applicants[j + 1].numRating != 0 ? applicants[j + 1].totalRating / applicants[j + 1].numRating : 0;
                    if (left < left2) {
                        applicants[j] = [applicants[j + 1], applicants[j + 1] = applicants[j]][0];
                        jobs[j] = [jobs[j + 1], jobs[j + 1] = jobs[j]][0];
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
                        jobs[j] = [jobs[j + 1], jobs[j + 1] = jobs[j]][0];
                    }
                }
            }
        }
        this.state.ratingType = !this.state.ratingType;
        this.setState({ applicants, jobs });

    }

    sortbyDateofJoining = () => {
        let applicants = this.state.applicants;
        let jobs = this.state.jobs;
        let n = applicants.length;
        if (this.state.DateofJoiningType) {
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - 1; j++) {
                    let left = jobs[j].dateOfJoining;
                    let left2 = jobs[j + 1].dateOfJoining;
                    if (left < left2) {
                        applicants[j] = [applicants[j + 1], applicants[j + 1] = applicants[j]][0];
                        jobs[j] = [jobs[j + 1], jobs[j + 1] = jobs[j]][0];
                    }
                }
            }
        }
        else {
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - 1; j++) {
                    let left = jobs[j].dateOfJoining;
                    let left2 = jobs[j + 1].dateOfJoining;
                    if (left > left2) {
                        applicants[j] = [applicants[j + 1], applicants[j + 1] = applicants[j]][0];
                        jobs[j] = [jobs[j + 1], jobs[j + 1] = jobs[j]][0];
                    }
                }
            }
        }
        this.state.DateofJoiningType = !this.state.DateofJoiningType;
        this.setState({ applicants, jobs });

    }
    rateapplicant(Job,i){
        console.log(Job , i)
        return (
            <td>
                <Link to={{ pathname: '/rateapplicant', state: { 'applicantID': this.state.applicants[i]._id }}}>Rate Applicant</Link>
            </td>
        )
    }
    render() {
        return (
            <div>
                <Button variant="info" onClick={this.sortbyName} >Order by Name</Button> &nbsp; &nbsp;
                <Button variant="info" onClick={this.sortbyTitle} >Order by Title</Button> &nbsp; &nbsp;
                <Button variant="info" onClick={this.sortbyDateofJoining} >Order by Date of Joining</Button>&nbsp; &nbsp;
                <Button variant="info" onClick={this.sortbyRating} >Order by Rating</Button>
                <br></br>
                <br></br>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date of Joining</th>
                            <th>Job Type</th>
                            <th>Job Title</th>
                            <th>Rating</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.zip(this.state.applicants, this.state.jobs).map((x, i) => {
                                let dict = { 0: "Full-time", 1: "Part-time", 2: "WFH" }
                                console.log(x)
                                return (
                                    <tr key={i}>
                                        <td>{x[0].name}</td>
                                        <td>{x[1].dateOfJoining}</td>
                                        <td>{dict[x[1].jobType]}</td>
                                        <td>{x[1].title}</td>
                                        <td>{x[0].numRating != 0 ? x[0].totalRating / x[0].numRating : 0}</td>
                                        {this.rateapplicant(x[0],i)}
                                        {/* { x[1].status != 2 &&  */}
                                        {/* <td><Button variant="success" value={i} onClick={this.notreject}>{x[1].status == 0 ? "Shortlist Application" : "Accept Application"}</Button></td> } */}
                                        {/* <td><Button variant="danger" value={i} onClick={this.reject}>Reject Application</Button></td> */}
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