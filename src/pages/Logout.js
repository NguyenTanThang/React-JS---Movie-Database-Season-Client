import React, { Component } from 'react';
//import {logout} from "../requests/authRequests";
import {authenticationService} from "../_services";
 
class Logout extends Component {

    componentWillMount() {
        authenticationService.logout();
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Logout;
