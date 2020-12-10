import React, { Component } from 'react';
import {sectionBG} from "../../config/jqueryCode";
import sectionBgImage from "../../images/section.jpg";
import {Link} from "react-router-dom";

export default class PageTitle extends Component {

    componentDidMount() {
        sectionBG();
    }

    renderBreadcrumbItem = () => {
        const {breadcumbs} = this.props;

        return breadcumbs.map((breadcumb, index) => {
            const {url, text} = breadcumb;

            if (index === breadcumbs.length - 1) {
                return (
                    <li className="breadcrumb__item breadcrumb__item--active" key={index}>{text}</li>
                )
            }

            return (
                <li className="breadcrumb__item" key={index}>
                    <Link to={url}>
                        {text}
                    </Link>
                </li>
            )
        })
    }
    
    render() {
        const {title} = this.props;
        const {renderBreadcrumbItem} = this;

        return (
                <section className="section section--first section--bg" data-bg={sectionBgImage}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="section__wrap">
                                    <h2 className="section__title">{title}</h2>

                                    <ul className="breadcrumb">
                                        {renderBreadcrumbItem()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        )
    }
}
