import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import logo from "/Users/ivanapina/Desktop/Career-Cruise/client/src/assets/images/career-cruise-logo.png"

export default class RecruiterNavbar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a href="/"><img src={logo} alt="logo" width="100px"/></a>
                    <Link to="/" className="navbar-brand">Career Cruise</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">

                            <li className="navbar-item">
                                <Link to="/createjob" className="nav-link">Create Job Listing</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/mylistings" className="nav-link">View Job Listings</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/employees" className="nav-link">View Employees</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/profile_recruiter" className="nav-link">My Profile</Link>
                            </li>
                            <li className="navbar-item">
                                <Link className="nav-link" to="/" onClick={() => {
                                    localStorage.clear();
                                    window.location.href = "/";
                                }}>Logout</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}