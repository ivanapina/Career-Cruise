import React, { Component } from 'react';
import axios from 'axios';
export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            email: '',
            education: [],
            skills: [],
            bio: '',
            contactNo: '',
            type: "A",
            ed_count: 1,
            institution: "",
            startYear: "",
            endYear: ""
        }
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeEducation = this.onChangeEducation.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onChangeContactNo = this.onChangeContactNo.bind(this);
        this.onChangeInstitution = this.onChangeInstitution.bind(this);
        this.onChangeStartYear = this.onChangeStartYear.bind(this);
        this.onChangeEndYear = this.onChangeEndYear.bind(this);
    }

    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangeType(event) {
        this.setState({ type: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangeEducation(event) {
        this.setState({ education: event.target.value });
    }
    onChangeSkills(event) {
        this.setState({ skills: event.target.value });
    }

    onChangeBio(event) {
        this.setState({ bio: event.target.value });
    }
    onChangeContactNo(event) {
        this.setState({ contactNo: event.target.value });
    }

    onChangeStartYear(event) {
        this.setState({ startYear: event.target.value });
    }

    onChangeEndYear(event) {
        this.setState({ endYear: event.target.value });
        // var add = {
        //     "institution": this.state.institution,
        //     "startYear": this.state.startYear,
        //     "endYear": this.state.endYear
        // }
        // const oldEducation = this.state.education.map(l => Object.assign({} , l))
        // oldEducation.push(add)
        // console.log(oldEducation)
        // this.setState({education : oldEducation} , () => {})
    }
    onChangeInstitution(event) {
        this.setState({ institution: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.username,
            choice: this.state.type,
            password: this.state.password,
            email: this.state.email,
            education: this.state.education,
            skills: this.state.skills,
            bio: this.state.bio,
            contactNo: +this.state.contactNo,
        }
        // console.log(newUser);
        axios.post('http://localhost:4000/user/register', newUser)
            .then(res => {
                if (res.data.error)
                    alert(res.data.error)
                else {
                    let message = "Welcome, " + res.data.name + "!";
                    alert(message);
                    console.log(res.data)
                    window.location.href = "/login";
                }
            })
            .catch(err => {
                alert(err.response.data);
            });

        let state = {
            username: '',
            password: '',
            email: '',
            education: [],
            skills: [],
            bio: '',
            contactNo: '',
            type: "A",
            ed_count: 1,
            institution: "",
            startYear: "",
            endYear: ""
        }
        // this.setState({state})

    }

    componentDidMount() {
        if (localStorage.token != undefined) window.location.href = "/";
    }


    render() {

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Type: </label>
                        <select className="form-control" value={this.state.type} onChange={this.onChangeType}>
                            <option name="A" value="A">Applicant</option>
                            <option name="R" value="R">Recruiter</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Name: </label>
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
                        <label>Email: </label>
                        <input type="email"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div>
                        {(() => {
                            if (this.state.type == "A") {
                                return (
                                    <div>
                                        <div className="form-group">
                                            <label><b>Education {this.state.ed_count}: &nbsp;&nbsp;&nbsp;</b></label>
                                            <div style={{ "display": "inline-block" }} className="form-group" >
                                                <label>Institution Name: </label>
                                                <input type="text"
                                                    className="form-control"
                                                    value={this.state.institution}
                                                    onChange={this.onChangeInstitution}
                                                />
                                            </div>
                                            <div style={{ "display": "inline-block" }} className="form-group">
                                                <label>Start Year: </label>
                                                <select className="form-select" id="syear" name="year" value={this.state.startYear} onChange={this.onChangeStartYear}>
                                                    <option value="0">year</option>
                                                    <option value="1959">1959</option>
                                                    <option value="1960">1960</option>
                                                    <option value="1961">1961</option>
                                                    <option value="1962">1962</option>
                                                    <option value="1963">1963</option>
                                                    <option value="1964">1964</option>
                                                    <option value="1965">1965</option>
                                                    <option value="1966">1966</option>
                                                    <option value="1967">1967</option>
                                                    <option value="1968">1968</option>
                                                    <option value="1969">1969</option>
                                                    <option value="1970">1970</option>
                                                    <option value="1971">1971</option>
                                                    <option value="1972">1972</option>
                                                    <option value="1973">1973</option>
                                                    <option value="1974">1974</option>
                                                    <option value="1975">1975</option>
                                                    <option value="1976">1976</option>
                                                    <option value="1977">1977</option>
                                                    <option value="1978">1978</option>
                                                    <option value="1979">1979</option>
                                                    <option value="1980">1980</option>
                                                    <option value="1981">1981</option>
                                                    <option value="1982">1982</option>
                                                    <option value="1983">1983</option>
                                                    <option value="1984">1984</option>
                                                    <option value="1985">1985</option>
                                                    <option value="1986">1986</option>
                                                    <option value="1987">1987</option>
                                                    <option value="1988">1988</option>
                                                    <option value="1989">1989</option>
                                                    <option value="1990">1990</option>
                                                    <option value="1991">1991</option>
                                                    <option value="1992">1992</option>
                                                    <option value="1993">1993</option>
                                                    <option value="1994">1994</option>
                                                    <option value="1995">1995</option>
                                                    <option value="1996">1996</option>
                                                    <option value="1997">1997</option>
                                                    <option value="1998">1998</option>
                                                    <option value="1999">1999</option>
                                                    <option value="2000">2000</option>
                                                    <option value="2001">2001</option>
                                                    <option value="2002">2002</option>
                                                    <option value="2003">2003</option>
                                                    <option value="2004">2004</option>
                                                    <option value="2005">2005</option>
                                                    <option value="2006">2006</option>
                                                    <option value="2007">2007</option>
                                                    <option value="2008">2008</option>
                                                    <option value="2009">2009</option>
                                                    <option value="2010">2010</option>
                                                    <option value="2011">2011</option>
                                                    <option value="2012">2012</option>
                                                    <option value="2013">2013</option>
                                                    <option value="2014">2014</option>
                                                    <option value="2015">2015</option>
                                                    <option value="2016">2016</option>
                                                    <option value="2017">2017</option>
                                                    <option value="2018">2018</option>
                                                    <option value="2019">2019</option>
                                                    <option value="2020">2020</option>
                                                    <option value="2021">2021</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2023">2023</option>
                                                </select>

                                            </div>
                                            <div style={{ "display": "inline-block" }} className="form-group">
                                                <label>End Year: </label>
                                                <select className="form-select" id="eyear" name="year" value={this.state.endYear} onChange={this.onChangeEndYear}>
                                                    <option value="0">year</option>
                                                    <option value="1959">1959</option>
                                                    <option value="1960">1960</option>
                                                    <option value="1961">1961</option>
                                                    <option value="1962">1962</option>
                                                    <option value="1963">1963</option>
                                                    <option value="1964">1964</option>
                                                    <option value="1965">1965</option>
                                                    <option value="1966">1966</option>
                                                    <option value="1967">1967</option>
                                                    <option value="1968">1968</option>
                                                    <option value="1969">1969</option>
                                                    <option value="1970">1970</option>
                                                    <option value="1971">1971</option>
                                                    <option value="1972">1972</option>
                                                    <option value="1973">1973</option>
                                                    <option value="1974">1974</option>
                                                    <option value="1975">1975</option>
                                                    <option value="1976">1976</option>
                                                    <option value="1977">1977</option>
                                                    <option value="1978">1978</option>
                                                    <option value="1979">1979</option>
                                                    <option value="1980">1980</option>
                                                    <option value="1981">1981</option>
                                                    <option value="1982">1982</option>
                                                    <option value="1983">1983</option>
                                                    <option value="1984">1984</option>
                                                    <option value="1985">1985</option>
                                                    <option value="1986">1986</option>
                                                    <option value="1987">1987</option>
                                                    <option value="1988">1988</option>
                                                    <option value="1989">1989</option>
                                                    <option value="1990">1990</option>
                                                    <option value="1991">1991</option>
                                                    <option value="1992">1992</option>
                                                    <option value="1993">1993</option>
                                                    <option value="1994">1994</option>
                                                    <option value="1995">1995</option>
                                                    <option value="1996">1996</option>
                                                    <option value="1997">1997</option>
                                                    <option value="1998">1998</option>
                                                    <option value="1999">1999</option>
                                                    <option value="2000">2000</option>
                                                    <option value="2001">2001</option>
                                                    <option value="2002">2002</option>
                                                    <option value="2003">2003</option>
                                                    <option value="2004">2004</option>
                                                    <option value="2005">2005</option>
                                                    <option value="2006">2006</option>
                                                    <option value="2007">2007</option>
                                                    <option value="2008">2008</option>
                                                    <option value="2009">2009</option>
                                                    <option value="2010">2010</option>
                                                    <option value="2011">2011</option>
                                                    <option value="2012">2012</option>
                                                    <option value="2013">2013</option>
                                                    <option value="2014">2014</option>
                                                    <option value="2015">2015</option>
                                                    <option value="2016">2016</option>
                                                    <option value="2017">2017</option>
                                                    <option value="2018">2018</option>
                                                    <option value="2019">2019</option>
                                                    <option value="2020">2020</option>
                                                    <option value="2021">2021</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2023">2023</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Skill: </label>
                                            <input type="text"
                                                className="form-control"
                                                value={this.state.skills}
                                                onChange={this.onChangeSkills}
                                            />
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div>
                                        <div className="form-group">
                                            <label>Bio: </label>
                                            <input type="text"
                                                className="form-control"
                                                value={this.state.bio}
                                                onChange={this.onChangeBio}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Contact Number: </label>
                                            <input type="text" pattern="[0-9]*"
                                                className="form-control"
                                                value={this.state.contactNo}
                                                onChange={this.onChangeContactNo}
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        })()}

                    </div>

                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}