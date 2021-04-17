import React, { Component } from 'react';
import PageTitle from "../components/partials/PageTitle";
import Navbar from "../components/partials/Navbar";
import SeasonList from "../components/seasons/SeasonList";
import Pagination from "../components/partials/Pagination";
import BigLoading from "../components/partials/BigLoading";
import {paginate} from "../utils/paginate";
import {getSeasonsBySeriesID} from "../actions/seasonActions";
import {getSeriesByIDAxios} from "../requests/seriesRequests";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";

let seasonListBreadcumbs = [
    {
        url: "/",
        text: "Home"
    },
    {
        url: "/",
        text: "Home"
    },
    {
        url: "/season-list",
        text: "Season List"
    }
]

class SeasonListPage extends Component {

    state = {
        seasonCurrentPage: 1,
        seriesItem: ""
    }

    async componentWillMount() {
        try {
            const seriesID = this.props.match.params.seriesID;
            localStorage.setItem("currentSeriesID", seriesID);
            this.props.getSeasonsBySeriesID(seriesID);
            const seriesItem = await getSeriesByIDAxios(seriesID);
            seasonListBreadcumbs = [
                {
                    url: "/",
                    text: "Home"
                },
                {
                    url: `/series-details/${seriesID}`,
                    text: "Series"
                },
                {
                    url: "/season-list",
                    text: "Season List"
                }
            ]
            this.setState({
                seriesItem
            })
        } catch (error) {
            this.props.history.push("/error");
        }
    }

    changeSeasonPageNumber = (pageNumber) => {
        this.setState({
            seasonCurrentPage: pageNumber
        })
    }

    renderSeasonList = () => {
        const {seasons, loading} = this.props;
        const {seasonCurrentPage} = this.state;
        const {changeSeasonPageNumber} = this;
        let currentSeasons = seasons;

        const seriesPageObject = paginate(currentSeasons.length, seasonCurrentPage, 12, 4);

        currentSeasons = currentSeasons.slice(seriesPageObject.startIndex, seriesPageObject.endIndex + 1);

        return (
            <>
                <SeasonList seasons={currentSeasons} loading={loading}/>
                <Pagination pageObject={seriesPageObject} onChangePageNumber={changeSeasonPageNumber}/>
            </>
        )
    }

    render() {
        const {renderSeasonList} = this;
        const {seriesItem} = this.state;

        if (seriesItem === "") {
            return (<>
                <BigLoading/>
            </>)
        }

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
                    <title>{`Let's Flix | Seasons of ${seriesItem.name}`}</title>
                    <meta name="description" content="Helmet application" />
                </Helmet>

                <Navbar/>

                <div>
                <PageTitle title={`Seasons of ${seriesItem.name}`} breadcumbs={seasonListBreadcumbs}/>

                <section className="content section-padding">
                    <div className="content__head">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    {renderSeasonList()}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            </>
            </motion.div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSeasonsBySeriesID: (seasonID) => {
            dispatch(getSeasonsBySeriesID(seasonID))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        seasons: state.seasonReducer.seasons
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonListPage);