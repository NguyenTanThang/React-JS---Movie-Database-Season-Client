import React, { Component } from 'react';
import {getZaloPayURL} from "../requests/zaloRequests";
import {getSubStatus, getAuthStatus} from "../requests/authRequests";
import {message} from "antd";

class ZaloPaymentPage extends Component {

    async componentDidMount() {
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
        const customerID = localStorage.getItem("userID")
        const amount = parseInt(localStorage.getItem("amount"))
        const planID = localStorage.getItem("planID")
        const payUrl = await getZaloPayURL(customerID, {amount, planID});
        window.location = payUrl;
    }

    render() {
        return (
            <></>
        )
    }
}

export default ZaloPaymentPage;
