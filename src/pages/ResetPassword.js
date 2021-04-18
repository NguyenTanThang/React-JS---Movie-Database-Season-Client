import React, { Component } from 'react';
import {sectionBG} from "../config/jqueryCode";
import sectionBgImage from "../images/section.jpg";
import {Link} from "react-router-dom";
import {resetPassword} from "../requests/authRequests";
import {getResetPasswordToken} from "../requests/resetPasswordTokenRequests";
import {message} from "antd";
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";
import {validatePassword} from "../utils/validate";

export default class SignIn extends Component {

    state = {
        newPassword: "",
        confirmNewPassword: ""
    }

    async componentWillMount() {
        sectionBG();
        const token = this.props.match.params.token;
        const customer = await getResetPasswordToken(token);
        if (!token || !customer) {
            return this.props.history.push("/sign-in");
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
            const token = this.props.match.params.token;
            const {newPassword, confirmNewPassword} = this.state;
            if (confirmNewPassword !== newPassword) {
                return message.error("The confirm password must be macthed with the new password");
            } 
            if (validatePassword(newPassword)) {
                const data = await resetPassword(token, newPassword);
                if (data.success) {
                    this.props.history.push("/sign-in");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {onSubmit, onChange} = this;
        const {confirmNewPassword, newPassword} = this.state;

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
                    <title>{`Let's Flix | Reset Password`}</title>
                    <meta name="description" content="Helmet application" />
                </Helmet>

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
                                    <input type="password" className="sign__input" placeholder="New Password" name="newPassword"
                                    onChange={onChange} value={newPassword}/>
                                </div>
                                
                                <div className="sign__group">
                                    <input type="password" className="sign__input" placeholder="Confirm Password" name="confirmNewPassword" onChange={onChange} value={confirmNewPassword}/>
                                </div>

                                <button className="sign__btn" type="submit">Reset Password</button>

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
