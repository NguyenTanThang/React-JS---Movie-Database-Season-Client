import React, { Component } from 'react';
import {getMovieByIDAxios} from "../requests/movieRequests";
import MovieVideo from '../components/movies/MovieVideo';
import Navbar from "../components/partials/Navbar";
import {getSubStatus, getCurrentUser} from "../requests/authRequests";
import {addWatchHistory, deleteWatchHistory} from "../requests/watchHistoryRequests";
import {getSubtitlesByMovieID} from "../requests/subtitleRequests";
import {message} from "antd";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";
import {Helmet} from "react-helmet";

class WatchMoviePage extends Component {

    state = {
        movieItem: "",
        subtitles: []
    }

    async componentDidMount() {
        const movieID = this.props.match.params.movieID;

        const movieItem = await getMovieByIDAxios(movieID);
        const subStatus = await getSubStatus();

        if (subStatus !== "active") {
            this.props.history.push("/pricing");
            message.error("You need to subscribe before watching");
        }

        const userID = getCurrentUser();
        const subtitles = await getSubtitlesByMovieID(movieID);
        await deleteWatchHistory(userID, movieID);
        await addWatchHistory(userID, movieID);

        console.log("subtitles-WatchMoviePage")
        console.log(subtitles)

        this.setState({
            movieItem,
            subtitles
        })
    }

    render() {
        const {movieItem, subtitles} = this.state;
        const {movieURL} = movieItem;

        if (!movieItem) {
            return(<></>);
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
                    <title>{`Let's Flix | Watch ${movieItem.name}`}</title>
                    <meta name="description" content="Helmet application" />
                </Helmet>

                <Navbar/>

                <section className="section details watch-section">
                    <div className="details__bg"></div>
                    <div className="container movie-watch-container">
                        <MovieVideo subtitles={subtitles} videoSRC={movieURL} movieID={movieItem._id}/>
                    </div>
                </section>
            </>
            </motion.div>
        )
    }
}

export default WatchMoviePage;
