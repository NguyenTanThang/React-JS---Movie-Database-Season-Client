import React, { Component } from 'react';
import {getPayURL} from "../requests/momoRequests";
import {getSubStatus, getAuthStatus} from "../requests/authRequests";
import {message} from "antd";

class MomoPaymentPage extends Component {

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
        const customerID = localStorage.getItem("userID")
        const amount = localStorage.getItem("amount")
        const planID = localStorage.getItem("planID")
        const payUrl = await getPayURL(customerID, {amount, planID});
        window.location = payUrl;
    }

    render() {
        return (
            <></>
        )
    }
}

export default MomoPaymentPage;
