import React, { Component } from 'react';

import StorageService from '../../services/StorageService';

import './Logout.css';



class Logout extends Component {
    state = {

    }

    componentDidMount() {
        this.logout();
        // this.getPerson();
    }

    logout = () => {
        StorageService.removeToken();
        this.props.history.push("/");
    }

    render() {

        return (
            <div id="login">


            </div>
        );
    }
}

export default Logout;