import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Home from './components/Common/Home'
import Applicant from './components/Common/Applicant'
import Recruiter from './components/Common/Recruiter'
import Register from './components/Common/Register'
import Navbar from './components/Navbar/Navbar'
import CreateJob from './components/Common/CreateJob'
import ViewJobs from './components/Common/ViewJobs'
import RateJob from './components/Common/RateJob'
import RateApplicant from './components/Common/RateApplicant'
import ApplyJob from './components/Common/ApplyJob'
import MyListings from './components/Common/MyListings'
import EditJob from './components/Common/EditJob'
import MyApplications from './components/Common/MyApplications'
import Employees from './components/Common/Employee'
import ViewApplicants from './components/Common/ViewApplicants'
import RecruiterNavbar from './components/Navbar/RecruiterNavbar'
import ApplicantNavbar from './components/Navbar/ApplicantNavbar'
import Login from './components/Common/Login'
import ProfileApplicant from './components/Common/Profile_Applicant'
import ProfileRecruiter from './components/Common/Profile_Recruiter'

class App extends React.Component {
  render() {
    let user_type = localStorage.getItem('type');
    let navbar = null;

    if (user_type === "recruiters")
      navbar = <RecruiterNavbar />;
    else if (user_type === "applicants")
      navbar = <ApplicantNavbar />;
    else
      navbar = <Navbar />;
    return (
      <Router>
        <div className="container">
          {navbar}
          <br />
          <Route exact path="/" render={() => {
            if (user_type === "recruiters") {
              return <Recruiter />
            }
            else if (user_type === "applicants") {

              return <Applicant />
            }

            else return <Home />
          }} />
          <Route path="/createjob" component={CreateJob} />
          <Route path="/viewjobs" component={ViewJobs} />
          <Route path="/myapplications" component={MyApplications} />
          <Route path="/ratejob" component={RateJob} />
          <Route path="/rateapplicant" component={RateApplicant} />
          <Route path="/applyjob" component={ApplyJob} />
          <Route path="/mylistings" component={MyListings} />
          <Route path="/viewapplicants" component={ViewApplicants} />
          <Route path="/employees" component={Employees} />
          <Route path="/editjob" component={EditJob} />
          <Route path="/register" component={Register} />
          <Route path="/profile_applicant" component={ProfileApplicant} />
          <Route path="/profile_recruiter" component={ProfileRecruiter} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
