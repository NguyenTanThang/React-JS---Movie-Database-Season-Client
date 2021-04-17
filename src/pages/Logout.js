import React, { Component } from 'react';
//import {logout} from "../requests/authRequests";
import {authenticationService} from "../_services";
 
class Logout extends Component {

    componentWillMount() {
        authenticationService.logout();
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
