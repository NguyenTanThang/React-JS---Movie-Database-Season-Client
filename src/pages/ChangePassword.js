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
import {validatePassword} from "../utils/validate";

export default class SignIn extends Component {

    state = {
        email: "",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
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
            const {email, oldPassword, newPassword, confirmNewPassword} = this.state;
            if (newPassword != confirmNewPassword) {
                return message.error("Confirm new password must be equal to new password");
            }
            const currentUser = authenticationService.currentUserValue;
            const userID = currentUser.customerItem._id;
            if (validatePassword(newPassword)) {
                const data = await changePassword(userID, {
                    email,
                    oldPassword,
                    newPassword
                });
                if (data.success) {
                    this.props.history.push("/");
                }
            }
        } catch (error) {
            console.log(error);
            this.props.history.push("/error");
        }
    }

    render() {
        const {onSubmit, onChange} = this;
        const {email, oldPassword, newPassword, confirmNewPassword} = this.state;

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
                                    <input type="email" className="sign__input" placeholder="Email" name="email" onChange={onChange} value={email} required/>
                                </div>

                                <div className="sign__group">
                                    <input type="password" className="sign__input" placeholder="Current Password" name="oldPassword" onChange={onChange} value={oldPassword} required/>
                                </div>

                                <div className="sign__group">
                                    <input type="password" className="sign__input" placeholder="New Password" name="newPassword"
                                    onChange={onChange} value={newPassword} required/>
                                </div>

                                <div className="sign__group">
                                    <input type="password" className="sign__input" placeholder="Confirm New Password" name="confirmNewPassword"
                                    onChange={onChange} value={confirmNewPassword} required/>
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
