import React, { Component } from 'react';
import TabGenerator from "../components/partials/TabGenerator";
import {getSeasonByIDAxios} from "../requests/seasonRequests";
import FaceBookCommentsTest from "../components/partials/FaceBookCommentsTest";
import SeasonDetails from "../components/seasons/SeasonDetails";
import MovieDescription from "../components/movies/MovieDescription";
import {
    getSeasonsBySeriesID
} from "../actions/seasonActions";
import {connect} from "react-redux";
import SeasonItem from "../components/seasons/SeasonItem";
import {getRandom} from "../utils/utils";
import Navbar from "../components/partials/Navbar";
import {getSeriesByIDAxios} from "../requests/seriesRequests";
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";

class SeasonDetailsPage extends Component {

    state = {
        seasonItem: "",
        currentSeries: ""
    }

    async componentDidMount() {
        const seriesID = localStorage.getItem("currentSeriesID");

        this.props.getSeasonsBySeriesID(seriesID);

        const seasonID = this.props.match.params.seasonID;
        const seasonItem = await getSeasonByIDAxios(seasonID);
        const currentSeries = await getSeriesByIDAxios(seriesID);

        this.setState({
            seasonItem,
            currentSeries
        })
    }

    renderRNGSeasonItems = () => {
        const {seasons} = this.props;

        if (seasons.length >= 6) {
            let currentSeason = getRandom(seasons, 6);
        
            return currentSeason.map(seasonItem => {
                return (
                    <div key={seasonItem._id} className="col-6 col-sm-4 col-lg-6">
                        <SeasonItem seasonItem={seasonItem}/>
                    </div>
                )
            })
        } else {
            let currentSeason = seasons;

            return currentSeason.map(seasonItem => {
                return (
                    <div key={seasonItem._id} className="col-6 col-sm-4 col-lg-6">
                        <SeasonItem seasonItem={seasonItem}/>
                    </div>
                )
            })
        }
        
    }

    renderTabGen = () => {
        const seasonID = this.props.match.params.seasonID;
        const {seasonItem} = this.state;
        const {description} = seasonItem;

        const tabContents = [
            (
                <>
                    <MovieDescription description={description}/>
                </>
            ),
            (
                <>
                    <FaceBookCommentsTest seasonID={seasonID}/>
                </>
            )
        ]

        const tabHeaders = [
            "Description",
            "Comments"
        ]

        return <TabGenerator tabContents={tabContents} tabHeaders={tabHeaders}/>
    }

    render() {
        const {renderTabGen, renderRNGSeasonItems} = this;
        const {seasonItem, currentSeries} = this.state;
        const seasonIDFromPage = this.props.match.params.seasonID;

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
                    <title>{`Let's Flix | ${seasonItem.name}`}</title>
                    <meta name="description" content="Helmet application" />
                </Helmet>

                <Navbar/>

                <div>
                <SeasonDetails seasonIDFromPage={seasonIDFromPage} seasonItem={seasonItem} currentSeries={currentSeries}/>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-8 col-xl-8 movie-details-tab">
                            {renderTabGen()}
                        </div>
                        <div className="col-12 col-lg-4 col-xl-4">
                            <div className="row">
                                <div className="col-12">
                                    <h2 className="section__title section__title--sidebar">Watch more...</h2>
                                </div>

                                {renderRNGSeasonItems()}
                            </div>
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SeasonDetailsPage);
