import React, { Component } from 'react';
import axios from 'axios';


export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const User = {
            email: this.state.username,
            password: this.state.password,
        }

        axios.post('http://localhost:4000/user/login', User)
            .then(response => {
                console.log(response)

                if (response.data.error)
                    alert("Error: " + response.data.error)
                else {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('type', response.data.type);
                    localStorage.setItem('id', response.data.id);

                    this.props.history.push("/");
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err)
                if (err)
                    alert(err);
                console.log(err.response);
                this.setState({
                    username: '',
                    password: ''
                });
            });

    }

    componentDidMount() {
        if (localStorage.token != undefined) window.location.href = "/";
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}