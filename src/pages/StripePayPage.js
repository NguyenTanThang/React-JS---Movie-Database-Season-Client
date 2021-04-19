import React, { Component } from 'react';
import StripeApp from "../components/stripe/StripeApp";
import Navbar from "../components/partials/Navbar";
import {getSubStatus, getAuthStatus} from "../requests/authRequests";
import {getPlanByID} from "../requests/planRequests";
import {message} from "antd";
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";
import BigLoading from "../components/partials/BigLoading"

class StripePayPage extends Component {

    state = {
        plan: ""
    }

    async componentWillMount() {
        try {
            const planID = localStorage.getItem("planID");
            if (!planID) {
                return this.props.history.push("/pricing");
            }
            const plan = await getPlanByID(planID);
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
            if (!plan) {
                return this.props.history.push("/pricing");
            }
            this.setState({
                plan
            })
        } catch (error) {
            this.props.history.push("/error");
        }
    }

    render() {
        const {plan} = this.state;

        if (!plan) {
            return (
                <>
                    <BigLoading/>    
                </>
            )
        }

        return (
            <motion.div
                style={pageStyle}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
            >
            <>
                <Helmet>
                    <title>{`Let's Flix | Stripe Payment`}</title>
                    <meta name="description" content="Helmet application" />
                </Helmet>
                <Navbar/>
                <div className="stripe-payment-container">
                    {plan ? <p>{plan.name} Plan: ${plan.price}</p> : <p>Loading...</p>}
                    <StripeApp/>
                </div>
            </>
            </motion.div>
        )
    }
}

export default StripePayPage;
