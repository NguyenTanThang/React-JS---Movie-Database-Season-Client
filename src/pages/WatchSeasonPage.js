import React, { Component } from 'react';
import {getEpisodesBySeasonIDAxios} from "../requests/episodeRequests";
import MovieVideo from '../components/movies/MovieVideo';
import TabGenerator from '../components/partials/TabGenerator';
import Navbar from "../components/partials/Navbar";
import {getSubStatus, getCurrentUser} from "../requests/authRequests";
import {addWatchHistory, deleteWatchHistory} from "../requests/watchHistoryRequests";
import {message} from "antd";

class WatchSeasonPage extends Component {

    state = {
        episodeList: []
    }

    async componentDidMount() {
        const seasonID = this.props.match.params.seasonID;
        const seriesID = localStorage.getItem("currentSeriesID");

        const episodeList = await getEpisodesBySeasonIDAxios(seasonID);
        const subStatus = await getSubStatus();

        if (subStatus !== "active") {
            this.props.history.push("/pricing");
            message.error("You need to subscribe before watching");
        }

        const userID = getCurrentUser();
        await deleteWatchHistory(userID, seriesID);
        await addWatchHistory(userID, seriesID);

        this.setState({
            episodeList
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

        return (
            <>
                <Navbar/>
                <div className="container episode-watch-tab-container">
                    <div className="row">
                        <div className="col-12">
                            {renderEpisodeListWatchItems()}
                        </div>
                    </div>
                </div>
            </>
            
        )
    }
}

export default WatchSeasonPage;
