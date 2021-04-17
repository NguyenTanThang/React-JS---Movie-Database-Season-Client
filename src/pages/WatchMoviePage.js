import React, { Component } from 'react';
import {getMovieByIDAxios} from "../requests/movieRequests";
import MovieVideo from '../components/movies/MovieVideo';
import Navbar from "../components/partials/Navbar";
import {getSubStatus} from "../requests/authRequests";
import {
    authenticationService
} from "../_services";
import {addWatchHistory, deleteWatchHistory} from "../requests/watchHistoryRequests";
import {getSubtitlesByMovieID} from "../requests/subtitleRequests";
import {message} from "antd";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";
import {Helmet} from "react-helmet";
import BigLoading from "../components/partials/BigLoading";

class WatchMoviePage extends Component {

    state = {
        movieItem: "",
        subtitles: []
    }

    async componentWillMount() {
        try {
            const movieID = this.props.match.params.movieID;

            const movieItem = await getMovieByIDAxios(movieID);
            const subStatus = await getSubStatus();

            if (subStatus !== "active") {
                this.props.history.push("/pricing");
                message.error("You need to subscribe before watching");
            }

            const currentUser = authenticationService.currentUserValue;
            const userID = currentUser.customerItem._id;
            const subtitles = await getSubtitlesByMovieID(movieID);
            await deleteWatchHistory(userID, movieID);
            await addWatchHistory(userID, movieID);

            this.setState({
                movieItem,
                subtitles
            })
        } catch (error) {
            console.log(error);
            this.props.history.push("/error");
        }
    }

    render() {
        const {movieItem, subtitles} = this.state;

        if (!movieItem) {
            return(<>
                <BigLoading/>    
            </>);
        }

        const {movieURL} = movieItem;

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
