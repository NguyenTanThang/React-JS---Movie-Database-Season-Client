import React, { Component } from 'react';
import {sectionBG} from "../config/jqueryCode";
import sectionBgImage from "../images/section.jpg";
import {Link} from "react-router-dom";
import {changePassword} from "../requests/authRequests";
import {
    authenticationService
} from "../_services";
import Navbar from "../components/partials/Navbar";
import {getAuthStatus} from "../requests/authRequests";
import {message} from "antd";
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";

export default class SignIn extends Component {

    state = {
        oldPassword: "",
        newPassword: ""
    }

    async componentDidMount() {
        try {
            sectionBG();
            const loggedIn = await getAuthStatus();
            if (!loggedIn) {
                message.error("You need to login to perform payment")
                return this.props.history.push("/sign-in");
            }
        } catch (error) {
            this.props.history.push("/error");
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        try {
            e.preventDefault();
            const {oldPassword, newPassword} = this.state;
            const currentUser = authenticationService.currentUserValue;
            const userID = currentUser.customerItem._id;
            const data = await changePassword(userID, oldPassword, newPassword);
            if (data.success) {
                this.props.history.push("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {onSubmit, onChange} = this;
        const {oldPassword, newPassword} = this.state;

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
                    <title>{`Let's Flix | Change Password`}</title>
                    <meta name="description" content="Helmet application" />
                </Helmet>

                <Navbar/>

                <div className="sign section--bg" data-bg={sectionBgImage}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="sign__content">
                            <form action="#" className="sign__form" onSubmit={onSubmit}>
                                <Link to="/" className="sign__logo">
                                    <h1><span>{"LET'S"}</span>FLIX</h1>
                                </Link>

                                <div className="sign__group">
                                    <input type="password" className="sign__input" placeholder="Current Password" name="oldPassword" onChange={onChange} value={oldPassword}/>
                                </div>

                                <div className="sign__group">
                                    <input type="password" className="sign__input" placeholder="New Password" name="newPassword"
                                    onChange={onChange} value={newPassword}/>
                                </div>

                                <button className="sign__btn" type="submit">Change Password</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </>
            </motion.div>
        )
    }
}
