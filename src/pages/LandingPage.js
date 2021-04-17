import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {
    videoBgURL,
    features,
    faqs
} from "../data/landingPageData";
import parse from "html-react-parser";
import { Collapse } from 'antd';
import {getAllPlans} from "../actions/planActions";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";
//import {detectLeavePage, measureDeviceWidth} from "../utils/utils";
import LazyLoad from 'react-lazyload';
import loadable from '@loadable/component';

const { Panel } = Collapse;

const Navbar = loadable(() => import('../components/partials/Navbar'));
const PlanList = loadable(() => import('../components/plans/PlanList'));

class LandingPage extends Component {

    componentWillMount() {
        this.props.getAllPlans();
        //detectLeavePage();
    }

    renderFaqItems = () => {
        return faqs.map((faqItem, index) => {
            const {title, answer} = faqItem;
            if (index === 0) {
                return (
                    <Panel header={title} key={index + 1}>
                        <p>{answer}</p>
                    </Panel>
                )
            }
            return (
                <Panel header={title} key={index + 1}>
                    <p>{answer}</p>
                </Panel>
            )
        })
    }

    renderFeatureItems = () => {
        return features.map((featureItem, index) => {
            const {name, icon, desc} = featureItem;
            return <div className="feature-item" key={index}>
                <div className="face face1">
                    <div className="feature-item__icon">
                        {parse(icon)}
                    </div>
                    <h4 className="feature-item__title">{name}</h4>
                </div>
                
                <div className="face face2">
                <p className="feature-item__desc">{desc}</p>
                </div>
            </div>
        })
    }

    render() {
        const {renderFeatureItems, renderFaqItems} = this;
        const planList = this.props.plans;

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
                    <title>{`Let's Flix | Landing Page`}</title>
                    <meta name="description" content="Helmet application" />
                </Helmet>

                <Navbar/>

                <section id="header" className="landing-header">
                    
                        <div className="landing-header__content">
                            <h1>Watch your favorite movies</h1>
                            <h2>Anytime. Any place</h2>
                            <p>For a reasonable price</p>
                            <div className="landing-header-content__start">
                                <Link to="/sign-up" className="section__btn">
                                    Sign Up Now
                                </Link>
                            </div>
                        </div>

                        {/*
                    <video autoPlay muted loop className="landing-header__bg">
                        <source src={videoBgURL} type="video/mp4" />
                        Your browser does not support HTML5 video.
                    </video>
                    */}
                </section>

                <section id="about" className="section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12 about__image">
                                <img className="img-fluid" src="https://i.imgur.com/hApDHhy.png" alt=""/>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 about__content">
                                <h2>Bring you the best of movies</h2>
                                <h4>As soon as we can</h4>
                                <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu ipsum at lacus varius tristique lacinia ut leo. Fusce faucibus neque orci, ac pellentesque turpis molestie ut. Morbi sit amet nibh non purus volutpat tempus id id neque. Donec finibus bibendum nisl, nec volutpat tellus iaculis sed. Aliquam non arcu eu dui vulputate rhoncus. Praesent et massa ipsum. Suspendisse vulputate, enim quis pretium vehicula, massa quam luctus diam, sed finibus lacus nisi eu sem. Nunc eget lorem justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur in mattis risus. Aliquam accumsan accumsan tristique. Suspendisse mollis est ligula, sed tempus tellus ornare sit amet.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features">
                    <div className="container">
                        <div className="row feature-row">
                            {renderFeatureItems()}
                        </div>
                    </div>
                </section>

                <div className="section" id="pricing">
                    <div className="container">
                        <div className="section-header">
                            <h2>Pricing</h2>
                        </div>
                        <PlanList planList={planList}/>
                    </div>
                </div>

                <section id="faq" className="section-padding">
                    <div className="container">
                        <div className="section-header">
                            <h2>Frequently Asked Questions</h2>
                        </div>
                        <Collapse accordion defaultActiveKey={['1']}>
                            {renderFaqItems()}
                        </Collapse>
                    </div>
                </section>

                <LazyLoad height={200}>
                    <section id="cta" className="section-padding">
                        <div className="cta__content">
                            <h2>Already on board with us</h2>
                            <h3>What are you waiting for?</h3>
                            <div className="cta-content__start">
                                <Link to="/sign-in" className="section__btn">
                                    Sign In Now
                                </Link>
                            </div>
                        </div>
                    </section>
                </LazyLoad>
            </>
            </motion.div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        plans: state.planReducer.plans
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPlans: () => {
            dispatch(getAllPlans())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
