import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class HomeHeader extends Component {
    render() {
        return (
            <div className="home-header">
                <div className="header-content">
                    <div className="container">
                        <h1>Find your favourite movies</h1>
                        <h4>Watch them and find out what happened</h4>
                        <Link to="/browse" className="section__btn">LOOK FOR THEM NOW</Link>
                    </div>
                </div>
            </div>
        )
    }
}
