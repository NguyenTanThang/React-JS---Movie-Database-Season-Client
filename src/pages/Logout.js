import React, { Component } from 'react';
import {logout} from "../requests/authRequests";

class Logout extends Component {

    componentDidMount() {
        logout();
        this.props.history.push("/sign-in")
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Logout;
