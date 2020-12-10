import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class Footer extends Component {
    render() {
        return (
	<footer className="footer">
    <div className="container">
        <div className="row">
            <div className="col-12 col-md-12 col-lg-3">
                <h6 className="footer__title">About Us</h6>
                <ul className="footer__list">
                    <li>
                        <Link to="/" style={{pointerEvents: "none"}}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="col-6 col-sm-4 col-md-3 col-lg-3">
                <h6 className="footer__title">Resources</h6>
                <ul className="footer__list">
                    <li><Link to="/">About Us</Link></li>
                    <li><Link to="/pricing">Pricing Plan</Link></li>
                    <li><Link to="/help">Help</Link></li>
                </ul>
            </div>

            <div className="col-6 col-sm-4 col-md-3 col-lg-3">
                <h6 className="footer__title">Legal</h6>
                <ul className="footer__list">
                    <li><Link to="/">Terms of Use</Link></li>
                    <li><Link to="/">Privacy Policy</Link></li>
                    <li><Link to="/">Security</Link></li>
                </ul>
            </div>

            <div className="col-12 col-sm-4 col-md-3 col-lg-3">
                <h6 className="footer__title">Contact</h6>
                <ul className="footer__list">
                    <li><a href="tel:+18002345678">+1 (800) 234-5678</a></li>
                    <li><a href="mailto:support@moviego.com">support@letsflix.com</a></li>
                </ul>
            </div>

        </div>
    </div>
</footer>
        )
    }
}
