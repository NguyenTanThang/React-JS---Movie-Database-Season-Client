import React, { Component } from 'react';
import {menuNav} from "../../config/jqueryCode";
import {Link} from "react-router-dom";

export default class Navbar extends Component {

    state = {
        customerID: ""
    }

    componentDidMount() {
        menuNav();
        this.setState({
            customerID: localStorage.getItem("userID")
        })
    }

    renderAuthButton = () => {
        const {customerID} = this.state;

        if (customerID) {
            return (
                <Link to="/logout" className="header__sign-in">
                    <i className="fas fa-sign-out-alt"></i>
                    <span>logout</span>
                </Link>
            )
        } else {
            return (
                <Link to="/sign-in" className="header__sign-in">
                    <i className="fas fa-sign-in-alt"></i>
                    <span>sign in</span>
                </Link>
            )
        }
    }

    renderNavBarItems = () => {
        const {customerID} = this.state;

        if (customerID) {
            return (
                <>
                    <li className="header__nav-item">
                        <Link to="/history" className="header__nav-link">History</Link>
                    </li>

                    <li className="header__nav-item">
                        <Link to="/watch-later" className="header__nav-link">Watch Later</Link>
                    </li>
                </>
            )
        } else {
            return (
                <></>
            )
        }
    }

    render() {
        const {renderAuthButton, renderNavBarItems} = this;

        return (
	<header className="header">
    <div className="header__wrap">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="header__content">

                        <Link to="/" className="header__logo">
                            <h1><span>{"LET'S"}</span>FLIX</h1>
                        </Link>

                        <ul className="header__nav">
                            <li className="header__nav-item">
                                <Link to="/home" className="header__nav-link">Home</Link>
                            </li>

                            <li className="header__nav-item">
                                <Link to="/browse" className="header__nav-link">Browse</Link>
                            </li>

                            <li className="header__nav-item">
                                <Link to="/pricing" className="header__nav-link">Pricing</Link>
                            </li>

                            {renderNavBarItems()}

                            <li className="header__nav-item">
                                <Link to="/help" className="header__nav-link">Help</Link>
                            </li>

                        </ul>

                        <div className="header__auth">
                            {renderAuthButton()}
                        </div>

                        <button className="header__btn" type="button">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</header>
        )
    }
}
