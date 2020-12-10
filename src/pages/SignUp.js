import React, { Component } from 'react';
import {sectionBG} from "../config/jqueryCode";
import sectionBgImage from "../images/section.jpg";
import {Link} from "react-router-dom";
import {signup} from "../requests/authRequests";
import Navbar from "../components/partials/Navbar";
import {getAuthStatus} from "../requests/authRequests";
import {message} from "antd";

export default class SignUp extends Component {

    state = {
		username: "",
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
            const {username, email, password} = this.state;
            await signup({username, email, password});
        } catch (error) {
            console.log(error);
        }
    }

    render() {
		const {username, email, password} = this.state;
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
								<input type="text" className="sign__input" placeholder="Name" name="username" value={username} onChange={onChange}/>
							</div>

							<div className="sign__group">
								<input type="email" className="sign__input" placeholder="Email" name="email" value={email} onChange={onChange}/>
							</div>

							<div className="sign__group">
								<input type="password" className="sign__input" placeholder="Password" name="password" value={password} onChange={onChange}/>
							</div>
							
							<button className="sign__btn" type="submit">Sign up</button>

							<span className="sign__text">Already have an account? <Link to="/sign-in">Sign in!</Link></span>
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
