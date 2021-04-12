import React, { Component } from 'react';
import {getEpisodesBySeriesIDAxios} from "../requests/episodeRequests";
import MovieVideo from '../components/movies/MovieVideo';
import TabGenerator from '../components/partials/TabGenerator';
import Navbar from "../components/partials/Navbar";
import {getSubStatus, getCurrentUser} from "../requests/authRequests";
import {addWatchHistory, deleteWatchHistory} from "../requests/watchHistoryRequests";
import {message} from "antd";
import {Helmet} from "react-helmet";

class WatchSeriesPage extends Component {

    state = {
        episodeList: []
    }

    async componentDidMount() {
        try {
            const seriesID = this.props.match.params.seriesID;

            const episodeList = await getEpisodesBySeriesIDAxios(seriesID);
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
        } catch (error) {
            this.props.history.push("/error");
        }
    }

    renderEpisodeListWatchItems = () => {
        const {episodeList} = this.state;
        
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

        const tabHeaders = episodeList.map(episodeItem => {
            const {episodeNum} = episodeItem;
            return (
                `Ep. ${episodeNum}`
            )
        })

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

export default WatchSeriesPage;
