import React, { Component } from 'react';
import {sectionBG} from "../config/jqueryCode";
import sectionBgImage from "../images/section.jpg";
import {Link} from "react-router-dom";
//import {login} from "../requests/authRequests";
import Navbar from "../components/partials/Navbar";
import {message} from "antd";
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";

import { authenticationService } from '../_services';

export default class SignIn extends Component {

    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) { 
            this.props.history.push('/');
            message.error("You are already logged in");
        }
    }

    state = {
        email: "",
        password: ""
    }

    async componentWillMount() {
        try {
            sectionBG();
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
            const {email, password} = this.state;
            authenticationService.login(email, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => {
                    console.log(error);
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {onSubmit, onChange} = this;

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
                    <title>{`Let's Flix | Sign In`}</title>
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
                                    <input type="email" className="sign__input" placeholder="Email" name="email" onChange={onChange} required/>
                                </div>

                                <div className="sign__group">
                                    <input type="password" className="sign__input" placeholder="Password" name="password"
                                    onChange={onChange} required/>
                                </div>

                                <button className="sign__btn" type="submit">Sign in</button>

                                <span className="sign__text">{"Don't"} have an account? <Link to="/sign-up">Sign up!</Link></span>

                                <span className="sign__text">
                                    <Link to="/forgot-password">Forgot password?</Link>
                                </span>
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
