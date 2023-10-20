import React, { Component } from 'react';
import axios from 'axios';

export default class EditJob extends Component {

    constructor(props) {
        super(props);
        this.state = {
            job: this.props.location.state.job,
            availablePos: this.props.location.state.job.availablePos,
            maxapplicants: this.props.location.state.job.maxApplications,
            deadline: this.formatDate(this.props.location.state.job.deadline)
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeRemainingPos = this.onChangeRemainingPos.bind(this);
        this.onChangeMaxApplicants = this.onChangeMaxApplicants.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    onChangeMaxApplicants(event) {
        this.setState({ maxapplicants: event.target.value });
    }
    onChangeRemainingPos(event) {
        this.setState({ availablePos: event.target.value });
    }
    onChangeDeadline(event) {
        console.log(event.target.value);
        this.setState({ deadline: event.target.value }, () => {
            console.log(this.state)
        });
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        console.log(year,month,day, date)
        return [year, month, day].join('-');
    }

    onSubmit(e) {
        e.preventDefault();
        const editData = {
            jobID: this.state.job._id,
            maxApplications: this.state.maxapplicants,
            availablePos: this.state.availablePos,
            deadline: this.state.deadline
        }
        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
        }
        // return;
        axios.post('http://localhost:4000/user/edit_job', editData, { headers: headers })
            .then(res => {
                axios.post('http://localhost:4000/user/edit_job', editData, { headers: headers })
                    .then(res => {
                        alert(res.data)
                        window.location.href = "/mylistings"
                    })
                    .catch(err => {
                        if (err.response.data)
                            alert(err.response.data);
                        console.log(err)
                        window.location.href = "/mylistings"

                    });
            })
            .catch(err => {
                if (err.response.data)
                    alert(err.response.data);
                console.log(err)
                window.location.href = "/mylistings"

            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Max Number of Applicants </label>
                        <input type="number"
                            className="form-control"
                            value={this.state.maxapplicants}
                            onChange={this.onChangeMaxApplicants}
                        />
                    </div>
                    <div className="form-group">
                        <label>Remaining Positions </label>
                        <input type="number"
                            className="form-control"
                            value={this.state.availablePos}
                            onChange={this.onChangeRemainingPos}
                        />
                    </div>
                    <div className="form-group">
                        <label>Deadline </label>
                        <input type="date"
                            className="form-control"
                            value={this.state.deadline}
                            onChange={this.onChangeDeadline}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit Rating" className="btn btn-primary" />
                    </div>
                </form>


            </div>
        )
    }
}