import React, { Component } from 'react';
import {sectionBG} from "../config/jqueryCode";
import sectionBgImage from "../images/section.jpg";
import {Link} from "react-router-dom";
import {login} from "../requests/authRequests";
import Navbar from "../components/partials/Navbar";
import {getAuthStatus} from "../requests/authRequests";
import {message} from "antd";

export default class SignIn extends Component {

    state = {
        email: "",
        password: ""
    }

    async componentDidMount() {
        sectionBG();
        const loggedIn = await getAuthStatus();
        if (loggedIn) {
            this.props.history.push("/");
            message.error("You are already logged in");
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
            const data = await login({email, password});
            if (data.success) {
                this.props.history.push("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {onSubmit, onChange} = this;

        return (
            <>
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
                                    <input type="email" className="sign__input" placeholder="Email" name="email" onChange={onChange}/>
                                </div>

                                <div className="sign__group">
                                    <input type="password" className="sign__input" placeholder="Password" name="password"
                                    onChange={onChange}/>
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
            
        )
    }
}
