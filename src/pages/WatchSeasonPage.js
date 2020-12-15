import React, { Component } from 'react';
import {getEpisodesBySeasonIDAxios} from "../requests/episodeRequests";
import {getSeasonByIDAxios} from "../requests/seasonRequests";
import MovieVideo from '../components/movies/MovieVideo';
import TabGenerator from '../components/partials/TabGenerator';
import Navbar from "../components/partials/Navbar";
import {getSubStatus, getCurrentUser} from "../requests/authRequests";
import {addWatchHistory, deleteWatchHistory} from "../requests/watchHistoryRequests";
import {message} from "antd";
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";

class WatchSeasonPage extends Component {

    state = {
        episodeList: [],
        seasonItem: "",
        currentEpisode: "",
        currentEpisodeNum: 1
    }

    async componentDidMount() {
        const seasonID = this.props.match.params.seasonID;
        const seriesID = localStorage.getItem("currentSeriesID");

        const episodeList = await getEpisodesBySeasonIDAxios(seasonID);
        const seasonItem = await getSeasonByIDAxios(seasonID);
        const subStatus = await getSubStatus();

        if (subStatus !== "active") {
            this.props.history.push("/pricing");
            message.error("You need to subscribe before watching");
        }

        const userID = getCurrentUser();
        await deleteWatchHistory(userID, seriesID);
        await addWatchHistory(userID, seriesID);

        this.setState({
            episodeList,
            seasonItem,
            currentEpisode: episodeList[0]
        })
    }

    changeCurrentEpisode = (currentEpisode) => {
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
                        <div className="episode-tab active" onClick={() => changeCurrentEpisode(currentEpisode)}>
                            <p>Episode {currentEpisode.episodeNum}</p>
                        </div>
                    )
                } else {
                    episodeTabs.push(
                        <div className="episode-tab" onClick={() => changeCurrentEpisode(currentEpisode)}>
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
            if (maxEp === numberOfEp) {
                beginEp += 1;
                tabHeaders.push(`Ep. ${beginEp} - Ep. ${maxEp + 1}`);
            } else {
                tabHeaders.push(`Ep. ${beginEp} - Ep. ${maxEp + 1}`);
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
        const {episodeList} = this.state;
        console.log(episodeList);
        
        if (!episodeList || episodeList.length === 0) {
            return(<></>);
        }

        const tabContents = episodeList.map(episodeItem => {
            const {_id, episodeURL} = episodeItem;
            return (
                <div key={_id} className="series-watch-container">
                    <MovieVideo videoSRC={episodeURL}/>
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
        const {seasonItem, currentEpisode} = this.state;

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
                <div className="container episode-watch-tab-container">
                    <div className="row">
                        <div className="col-12">
                            <div key={currentEpisode._id}className="series-watch-container">
                                <MovieVideo videoSRC={currentEpisode.episodeURL}/>
                            </div>
                        </div>
                        <div className="col-12">
                            {renderEpisodeContainerTabs()}
                        </div>
                    </div>
                </div>
            </>
            </motion.div>
        )
    }
}

export default WatchSeasonPage;
