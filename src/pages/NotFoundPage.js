import React, { Component } from 'react';
import {Link} from "react-router-dom";
import scarecrowImage from "../images/Scarecrow.png";
import Navbar from "../components/partials/Navbar";

export default class NotFoundPage extends Component {
    render() {
        return (
            <>
                <Navbar/>
                <div className="not-found-page section-padding">
                    <div className="wrapper">
                        <div className="image-con">
                            <img src={scarecrowImage} alt="404" className="img-fluid"/>
                        </div>
                        <div className="content">
                            <h2>I have bad news for you</h2>
                            <p>The page you are looking <br/> for might be removed or is <br/> temporary unavailable</p>
                            <Link to="/" className="section__btn">BACK TO HOMEPAGE</Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
