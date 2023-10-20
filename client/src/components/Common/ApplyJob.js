import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
export default class rateProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            job: this.props.location.state.job,
            SOP: ''
        }
        console.log(this.props, this.state);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onChangeSOP = this.onChangeSOP.bind(this);
    }

    onChangeRating(event) {
        this.setState({ rating: event.target.value });
    }

    onChangeSOP(event) {
        this.setState({ SOP: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        let token = localStorage.getItem('token');
        if (this.state.SOP.split(" ").length > 250) {
            alert("Max 250 words allowed for SOP")
            this.setState({
                SOP : ""
            })
            return;
        }
        console.log(this.state.job._id)
        const Application = {
            jobID: this.state.job._id,
            recruiterID: this.state.job.recruiterID,
            dateOfApplication: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
            SOP: this.state.SOP
        }
        console.log(Application)

        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        axios.post('http://localhost:4000/user/create_application', Application, { headers: headers })
            .then(response => {
                alert("Applied to Job!");
                console.log(response.data)
                window.location.href = "/viewjobs"
            })
            .catch(
                err => {
                    console.log(err)
                    if (err.response.data)
                        alert(err.response.data)
                    window.location.href = "/viewjobs"
                });
    }

    render() {
        let dict = { 0: "Full-time", 1: "Part-time", 2: "WFH" }
        return (
            <div>
                <b>Job Title</b> : {this.state.job.title}<br></br>
                <b>Job Recruiter name</b> : {this.state.job.recruiterName}<br></br>
                <b>Job Rating</b> : {this.state.job.numRating != 0 ? this.state.job.totalRating / this.state.job.numRating : 0}<br></br>
                <b>Job Salary</b> : {this.state.job.salary}<br></br>
                <b>Job Deadline</b> : {this.state.job.deadline}<br></br> 
                <b>Job Type of job</b> : {dict[this.state.job.jobType]}<br></br>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label><b>Cover Letter:</b></label>
                        <textarea type="textarea"
                            className="form-control"
                            value={this.state.SOP}
                            onChange={this.onChangeSOP}
                            rows={10}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit Application" className="btn btn-primary" />
                    </div>
                </form>


            </div>
        )
    }
}