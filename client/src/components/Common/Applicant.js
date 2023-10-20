import React, {Component} from 'react';
import axios from 'axios';

export default class Applicant extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:''
        }
    }

    componentDidMount() {
        this.setState({
            name: 'Vikrant'
        })
    }

    componentDidUpdate() {
        if(this.state.name != 'Ludo')
        this.setState({
            name: 'Ludo'
        })
    }

    // render -> constructor -> (1st called) ComponentDidMount -> ComponentDidUpdate -> ComponentWillUnmount

    render() {
        return (
            <div>
                Welcome to your dashboard!
           </div>
        )
    }
}