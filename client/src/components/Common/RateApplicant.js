import React, {Component} from 'react';
import axios from 'axios';

export default class rateProduct extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            rating:0,
            applicantID:this.props.location.state.applicantID,
        }
        console.log(this.props.location.state , this.state)
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
    }

    onChangeRating(event){
        this.setState({rating:event.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.rating > 5 || this.state.rating < 0) {
            alert('Invalid Rating');
            this.setState({
                rating:0
            })
                return ;
        }
        const newReview = {
            applicantID: this.state.applicantID,
            rating: this.state.rating
        }
        console.log(newReview);
        const headers = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
          }
        axios.post('http://localhost:4000/user/rate_applicant', newReview , { headers: headers })
            .then(res => {
                console.log(res.data);
                this.setState({ jobs: res.data });
                window.location.href = "employees"

            })
            .catch(err => {
                if (err.response.data)
                    alert(err.response.data);
                console.log(err)
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Enter Rating (Between 0 and 5): </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.rating}
                               onChange={this.onChangeRating}
                               />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit Rating" className="btn btn-primary"/>
                    </div>
                </form>

                
                </div>
        )
    }
}