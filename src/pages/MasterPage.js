import React, { Component } from 'react';
import {getAuthStatus} from "../requests/authRequests";
import Home from "./Home";
import LandingPage from "./LandingPage";
import BigLoading from "../components/partials/BigLoading";

class MasterPage extends Component {

    state = {
        loggedIn: ""
    }

    async componentWillMount() {
        try {
            const loggedIn = await getAuthStatus();
            this.setState({
                loggedIn
            })
        } catch (error) {
            this.props.history.push("/error");
        }
    }

    render() {
        const {loggedIn} = this.state;

        if (loggedIn === "") {
            return (<>
                <BigLoading/>    
            </>)
        }

        return (
            <>
                {loggedIn ? <Home/> : <LandingPage/>}
            </>
        )
    }
}

export default MasterPage;
