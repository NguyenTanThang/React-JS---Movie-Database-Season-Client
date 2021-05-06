import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Loading from "./Loading";

export default class LoadingButton extends Component {
    render() {
        const variation = this.props.variation ? this.props.variation : "section__btn";

        return (
            <Link to="#" className={`${variation} loading__btn`}>
                <i style={{paddingRight: "10px"}}>
                    <Loading/>
                </i>
                LOADING...
            </Link>
        )
    }
}
