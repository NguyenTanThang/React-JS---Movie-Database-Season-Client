import React, { Component } from 'react';
import {getPayURL} from "../requests/momoRequests";
import {getSubStatus, getAuthStatus} from "../requests/authRequests";
import {message} from "antd";
import BigLoading from "../components/partials/BigLoading";
import {authenticationService} from "../_services";

class MomoPaymentPage extends Component {

    async componentWillMount() {
        try {
            const subStatus = await getSubStatus();
            const loggedIn = await getAuthStatus();
            if (!loggedIn) {
                message.error("You need to login to perform payment")
                return this.props.history.push("/sign-in");
            }
            if (subStatus === "active") {
                message.error("Your subscription is still valid")
                return this.props.history.push("/");
            }
            const currentUser = authenticationService.currentUserValue;
            const customerID = currentUser.customerItem._id;
            const amount = parseInt(localStorage.getItem("amount"))
            const planID = localStorage.getItem("planID")
            const payUrl = await getPayURL(customerID, {amount, planID});
            window.location = payUrl;
        } catch (error) {
            this.props.history.push("/error");
        }
    }

    render() {
        return (<>
            <BigLoading/>    
        </>)
    }
}

export default MomoPaymentPage;
