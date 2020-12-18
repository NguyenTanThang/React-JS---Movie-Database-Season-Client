import React, { Component } from 'react';
import {getEpisodesBySeasonIDAxios} from "../requests/episodeRequests";
import {getSeasonByIDAxios} from "../requests/seasonRequests";
import MovieVideo from '../components/movies/MovieVideo';
import TabGenerator from '../components/partials/TabGenerator';
import Navbar from "../components/partials/Navbar";
import {getSubStatus, getCurrentUser, getAuthStatus} from "../requests/authRequests";
import {addWatchHistory, deleteWatchHistory} from "../requests/watchHistoryRequests";
import {getSubtitlesByEpisodeID} from "../requests/subtitleRequests";
import {message} from "antd";
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";
import RateMovieModalSync from "../components/movies/RateMovieModalSync";
import MovieDescription from "../components/movies/MovieDescription";
import {
    getReviewByCustomerID,
} from "../requests/reviewRequests";

const customerID = localStorage.getItem("userID")

class WatchSeasonPage extends Component {

    state = {
        episodeList: [],
        seasonItem: "",
        currentEpisode: "",
        currentEpisodeNum: 1,
        ratingEpisodeList: [],
        subtitles: []
    }

    async componentDidMount() {
        const seasonID = this.props.match.params.seasonID;
        const seriesID = localStorage.getItem("currentSeriesID");
        
        const loggedIn = await getAuthStatus();
        const episodeList = await getEpisodesBySeasonIDAxios(seasonID);
        const seasonItem = await getSeasonByIDAxios(seasonID);
        const subStatus = await getSubStatus();

        if (subStatus !== "active") {
            this.props.history.push("/pricing");
            message.error("You need to subscribe before watching");
        }

        let ratingEpisodeList = [];

        const userID = getCurrentUser();
        await deleteWatchHistory(userID, seriesID);
        await addWatchHistory(userID, seriesID);

        const reviews = await getReviewByCustomerID(customerID);
        console.log("reviews");
        console.log(reviews);

        for (let i = 0; i < episodeList.length; i++) {
            const episodeItem = episodeList[i];
            
            let review = {};
            let filterReviews = reviews.filter(reviewItem => {
                return reviewItem.movieID === episodeItem._id
            });
            if (filterReviews.length === 0) {
                review = null;
            } else {
                review = filterReviews[0];
            }

            ratingEpisodeList.push(
                {
                    episodeNum: episodeItem.episodeNum,
                    content: (
                        <div key={episodeItem._id}className="episode-details__rating">
                            <RateMovieModalSync movieID={episodeItem._id} loggedIn={loggedIn} review={review} />
                        </div>
                    )
                }
            )
        }

        const subtitles = await getSubtitlesByEpisodeID(episodeList.filter(episodeItem => {
            console.log(episodeItem.episodeNum === this.state.currentEpisodeNum)
            return episodeItem.episodeNum === this.state.currentEpisodeNum
        })[0]._id);
        console.log(episodeList.filter(episodeItem => {
            console.log(episodeItem.episodeNum === this.state.currentEpisodeNum)
            return episodeItem.episodeNum === this.state.currentEpisodeNum
        })[0]._id);
        console.log(subtitles)
      
        this.setState({
            episodeList,
            seasonItem,
            currentEpisode: episodeList[0],
            ratingEpisodeList,
            subtitles
        })
    }

    changeCurrentEpisode = (currentEpisode) => {
        localStorage.setItem("ratingMovieID", currentEpisode._id);
        this.setState({
            currentEpisode,
            currentEpisodeNum: currentEpisode.episodeNum
        })
    }

    renderEpisodeContainerTabs = () => {
        const {episodeList, currentEpisodeNum} = this.state;
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
                    episodeTabs.push(
                        <div key={currentEpisode._id} className="episode-tab active" onClick={() => changeCurrentEpisode(currentEpisode)}>
                            <p>Episode {currentEpisode.episodeNum}</p>
                        </div>
                    )
                } else {
                    episodeTabs.push(
                        <div className="episode-tab" key={currentEpisode._id} onClick={() => changeCurrentEpisode(currentEpisode)}>
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
            console.log("episodeTabs");
            console.log(episodeTabs);
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

       console.log(tabContents);

        /*
        const tabHeaders = episodeList.map(episodeItem => {
            const {episodeNum} = episodeItem;
            return (
                `Ep. ${episodeNum}`
            )
        })

        */

       console.log(tabHeaders);

        return <TabGenerator tabContents={tabContents} tabHeaders={tabHeaders}/>
    }

    renderEpisodeListWatchItems = () => {
        const {episodeList, subtitles} = this.state;
        console.log(episodeList);
        console.log(subtitles);
        
        if (!episodeList || episodeList.length === 0) {
            return(<></>);
        }

        const tabContents = episodeList.map(episodeItem => {
            const {_id, episodeURL} = episodeItem;
            return (
                <div key={_id} className="series-watch-container">
                    <MovieVideo videoSRC={episodeURL} subtitles={subtitles}/>
                </div>
            )
        })

        console.log(tabContents);

        const tabHeaders = episodeList.map(episodeItem => {
            const {episodeNum} = episodeItem;
            return (
                `Ep. ${episodeNum}`
            )
        })

        console.log(tabHeaders);

        return <TabGenerator tabContents={tabContents} tabHeaders={tabHeaders}/>
    }

    render() {
        const {renderEpisodeListWatchItems, renderEpisodeContainerTabs} = this;
        const {seasonItem, currentEpisode, ratingEpisodeList, subtitles} = this.state;
        const {rating} = currentEpisode;
        const ratingEpisodeItem = ratingEpisodeList.filter(item => {
            return item.episodeNum === currentEpisode.episodeNum
        })[0];

        if (!currentEpisode) {
            return (<></>)
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
                                    <MovieVideo videoSRC={currentEpisode.episodeURL} subtitles={subtitles}/>
                                </div>
                                <div className="episode-details">
                                    <div className="episode-details__content">
                                    <div className="episode-details-content__header">
                                        <h1 className="details__title">
                                            {currentEpisode.name}
                                        </h1>
                                        <span className="card__rate"><i className="fas fa-star" aria-hidden="true"></i> {rating.toFixed(1)}/10</span>
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
                            <div className="col-12">
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

export default WatchSeasonPage;
