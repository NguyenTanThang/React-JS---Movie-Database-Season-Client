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
        seasonItem: ""
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
            seasonItem
        })
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
        const {renderEpisodeListWatchItems} = this;
        const {seasonItem} = this.state;

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
                            {renderEpisodeListWatchItems()}
                        </div>
                    </div>
                </div>
            </>
            </motion.div>
        )
    }
}

export default WatchSeasonPage;
