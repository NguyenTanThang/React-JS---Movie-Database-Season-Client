import React, { Component } from 'react';
//import {logout} from "../requests/authRequests";
import {authenticationService} from "../_services";
import BigLoading from "../components/partials/BigLoading"
 
class Logout extends Component {

    componentWillMount() {
        authenticationService.logout();
    }

    render() {
        return (
            <>
                <BigLoading/>  
            </>
        )
    }
}

export default Logout;
