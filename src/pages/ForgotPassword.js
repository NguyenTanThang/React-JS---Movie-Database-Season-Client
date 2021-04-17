import React, { Component } from 'react';
import {sectionBG} from "../config/jqueryCode";
import sectionBgImage from "../images/section.jpg";
import sentImage from "../images/sent.svg";
import {Link} from "react-router-dom";
import {resetPasswordToken} from "../requests/authRequests";
import Navbar from "../components/partials/Navbar";
import {message} from "antd";
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";
import {getAuthStatus} from "../requests/authRequests";

export default class SignIn extends Component {

    state = {
        email: "",
        isSent: false
    }

    async componentDidMount() {
        try {
            sectionBG();
            const loggedIn = await getAuthStatus();
            if (loggedIn) {
                this.props.history.push("/");
                message.error("You are already logged in");
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
            const {email} = this.state;
            const data = await resetPasswordToken(email);
            if (data.success) {
                this.setState({
                    isSent: true
                })
            }
        } catch (error) {
            console.log(error);
            this.props.history.push("/error");
        }
    }

    render() {
        const {onSubmit, onChange} = this;
        const {email, isSent} = this.state;

        const sentContent = (
            <div className="sent-content sign__form">
                <Link to="/" className="sign__logo">
                    <h1><span>{"LET'S"}</span>FLIX</h1>
                </Link>
                <img src={sentImage} alt={"Email Sent"} className="img-fluid"/>
                <p>
                    Check your <span>{email}</span> inbox for instructions from us on how to reset your password.
                </p>
                <Link to="/" className="sign__btn">Go back home</Link>
            </div>
        )

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
                    <title>{`Let's Flix | Forgot Password`}</title>
                    <meta name="description" content="Helmet application" />
                </Helmet>

                <Navbar/>

                <div className="sign section--bg" data-bg={sectionBgImage}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="sign__content">

                            {isSent ? sentContent : (
                                <form action="#" className="sign__form" onSubmit={onSubmit}>
                                <Link to="/" className="sign__logo">
                                    <h1><span>{"LET'S"}</span>FLIX</h1>
                                </Link>

                                <div className="sign__group">
                                    <input type="email" className="sign__input" placeholder="Email Address" name="email"
                                    onChange={onChange} value={email}/>
                                </div>
                                
                                <button className="sign__btn" type="submit">Request Reset Password</button>

                            </form>
                            )}
                            

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
