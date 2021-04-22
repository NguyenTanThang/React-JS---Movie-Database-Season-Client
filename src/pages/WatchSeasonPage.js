import React, { Component } from 'react';
import {getEpisodesBySeasonIDAxios} from "../requests/episodeRequests";
import {getSeasonByIDAxios} from "../requests/seasonRequests";
import MovieVideo from '../components/movies/MovieVideo';
import TabGenerator from '../components/partials/TabGenerator';
import BigLoading from "../components/partials/BigLoading";
import Navbar from "../components/partials/Navbar";
import {getSubStatus} from "../requests/authRequests";
import {
    authenticationService
} from "../_services";
import {addWatchHistory, deleteWatchHistory} from "../requests/watchHistoryRequests";
import {getSubtitlesByEpisodeID} from "../requests/subtitleRequests";
import {message} from "antd";
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";
import RateMovieModal from "../components/movies/RateMovieModal";
import MovieDescription from "../components/movies/MovieDescription";
import Loading from "../components/partials/Loading";
import {
    getReviewsByMovieID
} from "../actions/reviewActions";
import {connect} from "react-redux";

class WatchSeasonPage extends Component {

    state = {
        episodeList: [],
        seasonItem: "",
        currentEpisode: "",
        currentEpisodeNum: 1,
        ratingEpisodeList: [],
        subtitles: [],
        isAboutToEnd: false,
        //episodeLoading: false
    }

    async componentWillMount() {
        try {
            const seasonID = this.props.match.params.seasonID;
            const seriesID = localStorage.getItem("currentSeriesID");
            const currentUser = authenticationService.currentUserValue;
            
            const episodeList = await getEpisodesBySeasonIDAxios(seasonID);
            const currentlyReviewedID = this.state.currentEpisode._id || episodeList[0]._id;
            this.props.getReviewsByMovieID(currentlyReviewedID);
            const seasonItem = await getSeasonByIDAxios(seasonID);
            const subStatus = await getSubStatus();

            if (subStatus !== "active") {
                this.props.history.push("/pricing");
                message.error("You need to subscribe before watching");
            }

            let ratingEpisodeList = [];

            const userID = currentUser.customerItem._id;
            await deleteWatchHistory(userID, seriesID);
            await addWatchHistory(userID, seriesID);

            //const reviews = await getReviewByCustomerID(userID);
            for (let i = 0; i < episodeList.length; i++) {
                const episodeItem = episodeList[i];
                
                /*
                let review = {};
                let filterReviews = reviews.filter(reviewItem => {
                    return reviewItem.movieID === episodeItem._id
                });
                if (filterReviews.length === 0) {
                    review = null;
                } else {
                    review = filterReviews[0];
                }
                */

                ratingEpisodeList.push(
                    {
                        episodeNum: episodeItem.episodeNum,
                        content: (
                            <div key={episodeItem._id}className="episode-details__rating">
                                <RateMovieModal isButton movieID={episodeItem._id} />
                            </div>
                        )
                    }
                   /*
                    {
                        episodeNum: episodeItem.episodeNum,
                        content: (
                            <div key={episodeItem._id}className="episode-details__rating">
                                <RateMovieModal movieID={episodeItem._id} />
                            </div>
                        )
                    }
                    */
                )
            }

            const currentEpsiodeID = episodeList.filter(episodeItem => {
                return episodeItem.episodeNum === this.state.currentEpisodeNum
            })[0]._id;
            const subtitles = await getSubtitlesByEpisodeID(currentEpsiodeID);

            this.setState({
                episodeList,
                seasonItem,
                currentEpisode: episodeList[0],
                ratingEpisodeList,
                subtitles
            });

        } catch (error) {
            this.props.history.push("/error");
        }
    }

    changeCurrentEpisode = async (currentEpisode) => {
        /*
        this.setState({
            //episodeLoading: true,
        })
        */
        localStorage.setItem("ratingMovieID", currentEpisode._id);
        this.props.getReviewsByMovieID(currentEpisode._id);
        const subtitles = await getSubtitlesByEpisodeID(currentEpisode._id);
        this.setState({
            subtitles,
            currentEpisode,
            currentEpisodeNum: currentEpisode.episodeNum,
            //episodeLoading: false,
        })
    }

    renderEpisodeContainerTabs = () => {
        const {episodeList, currentEpisodeNum, 
            //episodeLoading
        } = this.state;
        const {changeCurrentEpisode} = this;
        const numberOfEp = episodeList.length;
        const numberOfTabs = Math.ceil(numberOfEp / 10);
        let tabHeaders = [];
        let tabContents = [];
        
        if (!episodeList || numberOfEp === 0) {
            return(<></>);
        }

        for (let i = 0; i < numberOfTabs; i++) {
            let epCounter = i * 10;
            let maxEp = (i + 1) * 10;
            let beginEp = maxEp - 9;
            let episodeTabs = [];
            if (maxEp > numberOfEp) {
                maxEp = numberOfEp;
            }
            for (let j = epCounter; j < maxEp; j++) {
                const currentEpisode = episodeList[j];
                if (currentEpisodeNum === currentEpisode.episodeNum) {
                    /*
                    if (episodeLoading) {
                        episodeTabs.push(
                            <div key={currentEpisode._id} className="episode-tab loading__btn active" onClick={() => changeCurrentEpisode(currentEpisode)}>
                                <div className="episode-tab__icon">
                                    <Loading/>
                                </div>
                                <p>Episode {currentEpisode.episodeNum}</p>
                            </div>
                        )
                    } else {
                        episodeTabs.push(
                            <div key={currentEpisode._id} className="episode-tab active" onClick={() => changeCurrentEpisode(currentEpisode)}>
                                <div className="episode-tab__icon">
                                    <i class="fas fa-play-circle"></i>
                                </div>
                                <p>Episode {currentEpisode.episodeNum}</p>
                            </div>
                        )
                    }
                    */
                    episodeTabs.push(
                        <div key={currentEpisode._id} className="episode-tab active" onClick={() => changeCurrentEpisode(currentEpisode)}>
                            <div className="episode-tab__icon">
                                <i class="fas fa-play-circle"></i>
                            </div>
                            <p>Episode {currentEpisode.episodeNum}</p>
                        </div>
                    )
                } else {
                    episodeTabs.push(
                        <div className="episode-tab" key={currentEpisode._id} onClick={() => changeCurrentEpisode(currentEpisode)}>
                            <div className="episode-tab__icon">
                                <i class="fas fa-play-circle"></i>
                            </div>
                            <p>Episode {currentEpisode.episodeNum}</p>
                        </div>
                    )
                }
            }
            tabContents.push(
                <div className="episode-row">
                    {episodeTabs}
                </div>
            );
            episodeTabs = [];
            if (maxEp === numberOfEp && numberOfEp < 11) {
                tabHeaders.push(`Ep. ${beginEp} - Ep. ${maxEp}`);
            } 
            else if (maxEp === numberOfEp) {
                tabHeaders.push(`Ep. ${beginEp} - Ep. ${maxEp}`);
            }
            else {
                tabHeaders.push(`Ep. ${beginEp} - Ep. ${maxEp}`);
            }
        }

        /*
        const tabContents = episodeList.map(episodeItem => {
            const {_id, episodeURL} = episodeItem;
            return (
                <div key={_id} className="series-watch-container">
                    <MovieVideo videoSRC={episodeURL}/>
                </div>
            )
        })

        */

        /*
        const tabHeaders = episodeList.map(episodeItem => {
            const {episodeNum} = episodeItem;
            return (
                `Ep. ${episodeNum}`
            )
        })

        */

        return <TabGenerator tabContents={tabContents} tabHeaders={tabHeaders}/>
    }

    renderEpisodeListWatchItems = () => {
        const {episodeList, subtitles} = this.state;
        
        if (!episodeList || episodeList.length === 0) {
            return(<></>);
        }

        const tabContents = episodeList.map(episodeItem => {
            const {_id, episodeURL} = episodeItem;
            return (
                <div key={_id} className="series-watch-container">
                    <MovieVideo videoSRC={episodeURL} subtitles={subtitles} movieID={_id}/>
                </div>
            )
        })

        const tabHeaders = episodeList.map(episodeItem => {
            const {episodeNum} = episodeItem;
            return (
                `Ep. ${episodeNum}`
            )
        })

        return <TabGenerator tabContents={tabContents} tabHeaders={tabHeaders}/>
    }

    calculateRating = () => {
        const {reviews, loading} = this.props;

        if (!loading && reviews) {
            let meanRating = 0;

            for (let i = 0; i < reviews.length; i++) {
                const reviewItem = reviews[i];
                meanRating += reviewItem.grading;
            }

            if (reviews.length && reviews.length > 0) {
                meanRating = meanRating / reviews.length;
            }
            return meanRating;
        }

        return 0;
    }

    render() {
        const {renderEpisodeContainerTabs} = this;
        const {seasonItem, currentEpisode, ratingEpisodeList, subtitles} = this.state;
        const ratingEpisodeItem = ratingEpisodeList.filter(item => {
            return item.episodeNum === currentEpisode.episodeNum
        })[0];

        if (!currentEpisode) {
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
                    <title>{`Let's Flix | Watch ${seasonItem.name}`}</title>
                    <meta name="description" content="Helmet application" />
                </Helmet>
                <Navbar/>

                <section className="section details watch-section">
                <div className="details__bg"></div>
                    <div className="container episode-watch-tab-container">
                        <div className="row">
                            <div className="col-12">
                                <div key={currentEpisode._id}className="series-watch-container">
                                    <MovieVideo videoSRC={currentEpisode.episodeURL} subtitles={subtitles} movieID={currentEpisode._id}/>
                                </div>
                                <div className="episode-details">
                                    <div className="episode-details__content">
                                    <div className="episode-details-content__header">
                                        <h1 className="details__title">
                                            {currentEpisode.name}
                                        </h1>
                                        <span className="card__rate"><i className="fas fa-star" aria-hidden="true"></i> {this.calculateRating().toFixed(1)}/5</span>
                                    </div>

                                    <div className="episode-details-content__sub-header">
                                        <h6>Episode {currentEpisode.episodeNum}</h6>
                                    </div>
                                        
                                        {ratingEpisodeItem.content}

                                        <div>
                                            <MovieDescription description={currentEpisode.description} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 episode-tabs-container">
                                {renderEpisodeContainerTabs()}
                            </div>
                        </div>
                    </div>

                </section>
            </>
            </motion.div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getReviewsByMovieID: (movieID) => {
            dispatch(getReviewsByMovieID(movieID))
        },
    }
}

const mapStateToProps = (state) => {
    return {
        reviews: state.reviewReducer.reviews,
        loading: state.loadingReducer.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchSeasonPage);
