import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
export default class rateProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recruiter: '',
            name: '',
            email: '',
            contactNumber: '',
            bio: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangebio = this.onChangebio.bind(this);
        this.onChangename = this.onChangename.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangecontactno = this.onChangecontactno.bind(this);
    }

    onChangebio(event) {
        this.setState({ bio: event.target.value });
    }
    onChangename(event) {
        this.setState({ name: event.target.value });
    }
    onChangeemail(event) {
        this.setState({ email: event.target.value });
    }

    onChangecontactno(event) {
        this.setState({ contactNumber: event.target.value });
    }


    onSubmit(e) {
        e.preventDefault();
        let token = localStorage.getItem('token');
        if (this.state.bio.split(" ").length > 250) {
            alert("Max 250 words allowed for SOP")
            this.setState({
                SOP: ""
            })
            return;
        }
        const Update = {
            id: localStorage.getItem('id'),
            name: this.state.name,
            email: this.state.email,
            contactNumber: this.state.contactNumber,
            bio: this.state.bio
        }
        console.log(Update)
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        axios.post('http://localhost:4000/user/profile_applicant_update', Update, { headers: headers })
            .then(response => {
                alert("Applicant Details Updated!");
                console.log(response.data)
                window.location.reload()
            })
            .catch(
                err => {
                    console.log(err)
                    if (err.response.data)
                        alert(err.response.data)
                });
    }

    componentDidMount(e) {
        let token = localStorage.getItem('token');
        const body = {
            id: localStorage.getItem('id')
        }
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        }
        axios.post('http://localhost:4000/user/profile_applicant', body, { headers: headers })
            .then(response => {
                console.log(response.data[0])
                this.setState({
                    name: response.data[0].name,
                    email: response.data[0].email,
                    numRating: response.data[0].numRating,
                    totalRating: response.data[0].totalRating
                })
            })
            .catch(
                err => {
                    console.log(err)
                    if (err.response.data)
                        alert(err.response.data)
                });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label><b>Name :</b></label>
                        <textarea type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangename}
                        />
                    </div>
                    <div className="form-group">
                        <label><b>Email Id:</b></label>
                        <textarea type="email"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeemail}
                        />
                    </div>
                    {/* <div className="form-group">
                        <label><b>Contact Number:</b></label>
                        <textarea type="text" pattern="[0-9]*"
                            className="form-control"
                            value={this.state.contactNumber}
                            onChange={this.onChangecontactno}
                        />
                    </div>
                    <div className="form-group">
                        <label><b>Bio (Max 250 Words):</b></label>
                        <textarea type="textarea"
                            className="form-control"
                            value={this.state.bio}
                            onChange={this.onChangebio}
                            rows={10}
                        />
                    </div> */}
                    Rating : {this.state.numRating == 0 ? 0 : this.state.totalRating / this.state.numRating}
                    <br></br>
                    <br></br>
                    <div className="form-group">
                        <input type="submit" value="Edit Profile" className="btn btn-primary" />
                    </div>
                </form>


            </div>
        )
    }
}