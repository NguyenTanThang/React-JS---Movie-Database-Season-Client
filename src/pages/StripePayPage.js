import React, { Component } from 'react';
import StripeApp from "../components/stripe/StripeApp";
import Navbar from "../components/partials/Navbar";
import {getSubStatus, getAuthStatus} from "../requests/authRequests";
import {message} from "antd";
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";

class StripePayPage extends Component {

    async componentDidMount() {
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
        } catch (error) {
            this.props.history.push("/error");
        }
    }

    render() {
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
                <StripeApp/>
            </>
            </motion.div>
        )
    }
}

export default StripePayPage;
