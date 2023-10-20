import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
export default class CreateJob extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            availablePos: '',
            maxApplications: '',
            dateOfPosting: [],
            dateOfJoining: [],
            deadline: [],
            requiredSkills: [],
            jobType: 0,
            duration: 0,
            salary: ''
        }
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAvailablePos = this.onChangeAvailablePos.bind(this);
        this.onChangeMaxApplications = this.onChangeMaxApplications.bind(this);
        this.onChangeDateOfPosting = this.onChangeDateOfPosting.bind(this);
        this.onChangeDateOfJoining = this.onChangeDateOfJoining.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onChangeRequiredSkills = this.onChangeRequiredSkills.bind(this);
        this.onChangeJobType = this.onChangeJobType.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeTitle(event) {
        this.setState({ title: event.target.value });
    }

    onChangeAvailablePos(event) {
        this.setState({ availablePos: event.target.value });
    }

    onChangeMaxApplications(event) {
        this.setState({ maxApplications: event.target.value });
    }

    onChangeDateOfPosting(event) {
        this.setState({ dateOfPosting: event.target.value });
    }

    onChangeDateOfJoining(event) {
        this.setState({ dateOfJoining: event.target.value });
    }

    onChangeDeadline(event) {
        this.setState({ deadline: event.target.value });
    }

    onChangeRequiredSkills(event) {
        this.setState({ requiredSkills: event.target.value });
    }

    onChangeJobType(event) {
        this.setState({ jobType: event.target.value });
    }

    onChangeDuration(event) {
        this.setState({ duration: event.target.value });
    }

    onChangeSalary(event) {
        this.setState({ salary: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.state.dateOfJoining = moment(this.state.dateOfJoining).format('YYYY-MM-DD[T00:00:00.000Z]');
        this.state.dateOfPosting = moment(this.state.dateOfPosting).format('YYYY-MM-DD[T00:00:00.000Z]');
        this.state.deadline = moment(this.state.deadline).format('YYYY-MM-DD[T00:00:00.000Z]');

        const newJob = {
            title: this.state.title,
            availablePos: this.state.availablePos,
            maxApplications: this.state.maxApplications,
            dateOfPosting: this.state.dateOfPosting,
            dateOfJoining: this.state.dateOfJoining,
            deadline: this.state.deadline,
            requiredSkills: this.state.requiredSkills,
            jobType: this.state.jobType,
            duration: this.state.duration,
            salary: this.state.salary
        }

        let token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        console.log(newJob);
        axios.post('http://localhost:4000/user/create_job', newJob, { headers: headers })
            .then(res => {
                alert("Job successfully created!");
                console.log(res.data)
            })
            .catch(function (error) {
                if (error.response.data)
                    alert(error.response.data);
                console.log(error);
            })
        this.setState({
            title: '',
            availablePos: '',
            maxApplications: '',
            dateOfPosting: [],
            dateOfJoining: [],
            deadline: [],
            requiredSkills: [],
            jobType: 0,
            duration: 0,
            salary: ''
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Job title: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                        />
                    </div>

                    <div className="form-group">
                        <label>Available Positions: </label>
                        <input type="number" min="1"
                            className="form-control"
                            value={this.state.availablePos}
                            onChange={this.onChangeAvailablePos}
                        />
                    </div>
                    <div className="form-group">
                        <label>Maximum Applications: </label>
                        <input type="number" min="1"
                            className="form-control"
                            value={this.state.maxApplications}
                            onChange={this.onChangeMaxApplications}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date of Posting: </label>
                        <input type="date" min="1"
                            className="form-control"
                            value={this.state.dateOfPosting}
                            onChange={this.onChangeDateOfPosting}
                        />
                    </div>

                    <div className="form-group">
                        <label>Date of Joining: </label>
                        <input type="date" min="1"
                            className="form-control"
                            value={this.state.dateOfJoining}
                            onChange={this.onChangeDateOfJoining}
                        />
                    </div>

                    <div className="form-group">
                        <label>Deadline: </label>
                        <input type="date" min="1"
                            className="form-control"
                            value={this.state.deadline}
                            onChange={this.onChangeDeadline}
                        />
                    </div>
                    <div className="form-group">
                        <label>Required Skills: </label>
                        <input type="text" min="1"
                            className="form-control"
                            value={this.state.requiredSkills}
                            onChange={this.onChangeRequiredSkills}
                        />

                    </div>
                    <div className="form-group">
                        <label>Job Type: &nbsp;</label>
                        <select className="form-select" value={this.state.jobType} onChange={this.onChangeJobType}>
                            <option value="0">Full-time</option>
                            <option value="1">Part-time</option>
                            <option value="2">WFH</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Duration: &nbsp;</label>
                        <select className="form-select" value={this.state.duration} onChange={this.onChangeDuration}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Salary: </label>
                        <input type="number" min="1"
                            className="form-control"
                            value={this.state.salary}
                            onChange={this.onChangeSalary}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add listing" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}