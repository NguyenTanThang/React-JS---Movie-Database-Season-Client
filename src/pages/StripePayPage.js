import React, { Component } from 'react';
import StripeApp from "../components/stripe/StripeApp";
import Navbar from "../components/partials/Navbar";
import {getSubStatus, getAuthStatus} from "../requests/authRequests";
import {message} from "antd";
import {Helmet} from "react-helmet";

class StripePayPage extends Component {

    async componentDidMount() {
        const subStatus = await getSubStatus();
        const loggedIn = await getAuthStatus();
        if (!loggedIn) {
            message.error("You need to login to perform payment")
            return this.props.history.push("/sign-in");
        }
        if (subStatus === "active") {
            return this.props.history.push("/");
        }
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>{`Let's Flix | Stripe Payment`}</title>
                    <meta name="description" content="Helmet application" />
                </Helmet>
                <Navbar/>
                <StripeApp/>
            </>
        )
    }
}

export default StripePayPage;
