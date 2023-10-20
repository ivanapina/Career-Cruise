import React, { Component, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'
import Modal from 'react-modal';

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
            salaryType: 1,
            ratingType: 1,
            durationType: 1,
            showModal: false,
            SOP: '',
            res: [],
            fullTime: false,
            partTime: false,
            WFH: false,
            lowerSalary: 0,
            higherSalary: 999999999,
            duration: 7
        }
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.sortbyRating = this.sortbyRating.bind(this);
        this.sortbySalary = this.sortbySalary.bind(this);
        this.sortbyDuration = this.sortbyDuration.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.applyJob = this.applyJob.bind(this);
        this.onChangeLowerSalary = this.onChangeLowerSalary.bind(this);
        this.onChangeHigherSalary = this.onChangeHigherSalary.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
    }

    onChangeSearch(event) {
        this.setState({ search: event.target.value });
    }
    onChangeLowerSalary(event) {
        this.setState({ lowerSalary: Number(event.target.value) });
    }
    onChangeHigherSalary(event) {
        this.setState({ higherSalary: Number(event.target.value) });
    }
    onChangeDuration(event) {
        this.setState({ duration: event.target.value });
    }


    componentDidMount() {
        let token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        const body = {
            search: this.state.search
        }
        axios.post('http://localhost:4000/user/all_jobs', body, { headers: headers })
            .then(res => {
                this.setState({ applicant : res.data.applicant , jobs: res.data.jobs.filter(job => {
                    // console.log(job.deadline)
                    return new Date(job.deadline) >= new Date()
                    // console.log(new Date(job.deadline) > new Date())
                }) }, () => {
                    axios.post('http://localhost:4000/user/my_applications', { "x": "x" }, { headers: headers })
                        .then(res => {
                            console.log(res.data);
                            this.setState({ applications: res.data });
                        })
                        .catch(err => {
                            if (err.response.data)
                                alert(err.response.data);
                            console.log(err)
                        });
                });
            })
            .catch(err => {
                if (err.response.data)
                    alert(err.response.data);
                console.log(err)
            });
    }

    onSubmit(e) {
        e.preventDefault();
        const Search = {
            name: this.state.search
        }

        let token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        const body = {
            search: this.state.search
        }
        axios.post('http://localhost:4000/user/all_jobs', body, { headers: headers })
            .then(async (res) => {
                this.setState({ jobs: res.data.jobs }, async () => {
                    console.log(this.state.fullTime)
                    await this.filterByJobType();
                    await this.filterBySalary();
                    await this.filterByDuration();
                    console.log(this.state.jobs)
                    this.setState({
                        search: '',
                        // jobs: [],
                        salaryType: 1,
                        ratingType: 1,
                        durationType: 1,
                        res: []
                    });
                });
            })
            .catch(err => {
                if (err.response.data)
                    alert(err.response.data);
                console.log(err)
            });
    }

    applyJob(Job, i) {
        console.log(this.state.applicant[0] , this.state.applicant.accepted==true)
        let flag = false;
        for (var ind in this.state.applications){
            if (this.state.applications[ind]._id == Job._id )
                flag = true;
        }
        if (this.state.applicant[0].accepted == true) {
            return (
                <td>
                    Accepted in Another Job
                </td>
            )
        }
        if (flag) {
            return (
                <td>
                    Already Applied
                </td>
            )
        } 
        if (Job.availablePos <= 0 || (Job.maxApplications <= Job.currentApplications) ) {
            return (
                <td>
                    Job Full
                </td>
            )
        }
        // if ()
        return (
            <td>
                <Link to={{ pathname: '/applyjob', state: { 'job': this.state.jobs[i] } }}>Apply to Job</Link>
            </td>
        )
    }

    filterBySalary = () => {
        var res = []
        let jobs = this.state.jobs, n = jobs.length;
        console.log(this.state.lowerSalary, this.state.higherSalary)
        for (var i = 0; i < n; i++) {
            console.log(jobs[i].salary)
            if (jobs[i].salary <= this.state.higherSalary && jobs[i].salary >= this.state.lowerSalary)
                res.push(jobs[i])
        }
        console.log(res)
        this.setState({ jobs: res });
    }

    filterByJobType = () => {
        if (!this.state.fullTime && !this.state.partTime && !this.state.WFH) return
        var res = []
        let jobs = this.state.jobs, n = jobs.length;
        for (var i = 0; i < n; i++) {
            if (this.state.fullTime)
                if (jobs[i].jobType == 0)
                    res.push(jobs[i]);
            if (this.state.partTime)
                if (jobs[i].jobType == 1)
                    res.push(jobs[i]);
            if (this.state.WFH)
                if (jobs[i].jobType == 2)
                    res.push(jobs[i]);
        }

        this.setState({ jobs: res });
    }

    filterByDuration = () => {
        var res = []
        let jobs = this.state.jobs, n = jobs.length;
        for (var i = 0; i < n; i++)
            if (jobs[i].duration < this.state.duration)
                res.push(jobs[i]);

        this.setState({ jobs: res });
    }

    sortbySalary = () => {
        let jobs = this.state.jobs, n = jobs.length;
        if (this.salaryType) {
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - 1; j++) {
                    let left = jobs[j].salary;
                    let left2 = jobs[j + 1].salary;
                    if (left < left2)
                        jobs[j] = [jobs[j + 1], jobs[j + 1] = jobs[j]][0];
                }
            }
        }
        else {
            let jobs = this.state.jobs, n = jobs.length;
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - 1; j++) {
                    let left = jobs[j].salary;
                    let left2 = jobs[j + 1].salary;
                    if (left > left2)
                        jobs[j] = [jobs[j + 1], jobs[j + 1] = jobs[j]][0];
                }
            }
        }
        this.salaryType = !this.salaryType;
        this.setState({ jobs: jobs });
    }

    sortbyRating = () => {
        let jobs = this.state.jobs, n = jobs.length;
        if (this.ratingType) {
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - 1; j++) {
                    let left = jobs[j].numRating != 0 ? jobs[j].totalRating / jobs[j].numRating : 0;
                    let left2 = jobs[j + 1].numRating != 0 ? jobs[j + 1].totalRating / jobs[j + 1].numRating : 0;
                    if (left < left2)
                        jobs[j] = [jobs[j + 1], jobs[j + 1] = jobs[j]][0];
                }
            }
        }
        else {
            let jobs = this.state.jobs, n = jobs.length;
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - 1; j++) {
                    let left = jobs[j].numRating != 0 ? jobs[j].totalRating / jobs[j].numRating : 0;
                    let left2 = jobs[j + 1].numRating != 0 ? jobs[j + 1].totalRating / jobs[j + 1].numRating : 0;
                    if (left > left2)
                        jobs[j] = [jobs[j + 1], jobs[j + 1] = jobs[j]][0];
                }
            }
        }
        this.ratingType = !this.ratingType;
        this.setState({ jobs: jobs });
    }

    sortbyDuration = () => {
        let jobs = this.state.jobs, n = jobs.length;
        if (this.durationType) {
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - 1; j++) {
                    let left = jobs[j].duration;
                    let left2 = jobs[j + 1].duration;
                    if (left < left2)
                        jobs[j] = [jobs[j + 1], jobs[j + 1] = jobs[j]][0];
                }
            }
        }
        else {
            let jobs = this.state.jobs, n = jobs.length;
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - 1; j++) {
                    let left = jobs[j].duration;
                    let left2 = jobs[j + 1].duration;
                    if (left > left2)
                        jobs[j] = [jobs[j + 1], jobs[j + 1] = jobs[j]][0];
                }
            }
        }
        this.durationType = !this.durationType;
        this.setState({ jobs: jobs });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Job title: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.search}
                            onChange={this.onChangeSearch}
                        />
                        <label>
                            <input
                                type="checkbox"
                                value="Full-time"
                                onClick={() => { this.setState({ fullTime: !this.state.fullTime }) }}
                            />
                            Full-time
                        </label> &nbsp;
                        <label>
                            <input
                                type="checkbox"
                                value="Part-time"
                                onClick={() => { this.setState({ partTime: !this.state.partTime }) }}
                            />
                            Part-time
                        </label> &nbsp;
                        <label>
                            <input
                                type="checkbox"
                                value="WFH"
                                onClick={() => { this.setState({ WFH: !this.state.WFH }) }}
                            />
                            WFH
                        </label> &nbsp;
                        <br></br>
                        <label>Salary lower bound: &nbsp; </label>
                        <input type="text"
                            value={this.state.lowerSalary}
                            onChange={this.onChangeLowerSalary}
                        />
                        <br></br>
                        <label>Salary upper bound: &nbsp; </label>
                        <input type="text"
                            value={this.state.higherSalary}
                            onChange={this.onChangeHigherSalary}
                        />
                        <br></br>
                        <label>Duration: &nbsp; </label>
                        <select className="form-select" id="syear" name="year" value={this.state.duration} onChange={this.onChangeDuration}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Search" className="btn btn-primary" />
                    </div>
                </form>
                <Button variant="info" onClick={this.sortbySalary} >Order by salary</Button> &nbsp; &nbsp;
                <Button variant="info" onClick={this.sortbyDuration} >Order by duration</Button>&nbsp; &nbsp;
                <Button variant="info" onClick={this.sortbyRating} >Order by rating</Button>
                <br></br>
                <br></br>

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
                            this.state.jobs.map((Job, i) => {
                                let dict = { 0: "Full-time", 1: "Part-time", 2: "WFH" }
                                return (
                                    <tr key={i}>
                                        {/* <td>{Job._id}</td> */}
                                        <td>{Job.title}</td>
                                        <td>{Job.recruiterName} </td>
                                        <td>{Job.numRating != 0 ? Job.totalRating / Job.numRating : 0} </td>
                                        <td>{Job.salary} </td>
                                        <td>{Job.duration} </td>
                                        <td>{Job.deadline} </td>
                                        <td>{dict[Job.jobType]} </td>
                                        {this.applyJob(Job, i)}
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