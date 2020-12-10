import React, { Component } from 'react';
import PageTitle from "../components/partials/PageTitle";
import Navbar from "../components/partials/Navbar";
import {connect} from "react-redux";
import {getAllPlans} from "../actions/planActions";
import PlanList from "../components/plans/PlanList";
import {getSubStatus} from "../requests/authRequests";
import {message} from "antd";

const pricingBreadcumbs = [
    {
        url: "/",
        text: "Home"
    },
    {
        url: "/pricing",
        text: "Pricing"
    }
]

class PricingPlan extends Component {

    async componentDidMount() {
        const subStatus = await getSubStatus();

        if (subStatus === "active") {
            message.error("Your subscription is still valid");
            this.props.history.goBack();
        }

        this.props.getAllPlans();
    }

    render() {
        const planList = this.props.plans;

        return (
            <>
                <Navbar/>

                <div>
                <PageTitle title="Pricing" breadcumbs={pricingBreadcumbs}/>

                <div className="section">
                    <div className="container">
                        <PlanList planList={planList}/>
                    </div>
                </div>

                <section className="section section--dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="section__title section__title--no-margin">Our Features</h2>
                            </div>

                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="feature">
                                    <i className="fas fa-tv feature__icon"></i>
                                    <h3 className="feature__title">Ultra HD</h3>
                                    <p className="feature__text">If you are going to use a passage of Lorem Ipsum, you need to be sure there {"isn't"} anything embarrassing hidden in the middle of text.</p>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="feature">
                                    <i className="fas fa-film feature__icon" aria-hidden="true"></i>
                                    <h3 className="feature__title">Film</h3>
                                    <p className="feature__text">All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first.</p>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="feature">
                                    <i className="fas fa-trophy feature__icon" aria-hidden="true"></i>
                                    <h3 className="feature__title">Awards</h3>
                                    <p className="feature__text">It to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining.</p>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="feature">
                                    <i className="fas fa-bell feature__icon" aria-hidden="true"></i>
                                    <h3 className="feature__title">Notifications</h3>
                                    <p className="feature__text">Various versions have evolved over the years, sometimes by accident, sometimes on purpose.</p>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="feature">
                                    <i className="fas fa-rocket feature__icon" aria-hidden="true"></i>
                                    <h3 className="feature__title">Rocket</h3>
                                    <p className="feature__text">It to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.</p>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="feature">
                                    <i className="fas fa-globe feature__icon" aria-hidden="true"></i>
                                    <h3 className="feature__title">Multi Language Subtitles </h3>
                                    <p className="feature__text">Various versions have evolved over the years, sometimes by accident, sometimes on purpose.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(PricingPlan);