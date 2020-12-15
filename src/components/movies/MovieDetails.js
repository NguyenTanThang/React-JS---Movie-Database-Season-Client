import React, { Component } from 'react';
//import homeBg from '../../images/home__bg.jpg';
import {sectionBG, detailBg} from "../../config/jqueryCode";
import MovieVideo from "./MovieVideo";
import RateMovieModal from "./RateMovieModal";
import {Link} from "react-router-dom";
import { Tooltip } from 'antd';
import {addWatchLater, deleteWatchLater, getWatchLaterByCustomerIDAndMovieID} from "../../requests/watchLaterRequests";
import {isObjectEmpty} from '../../utils/validate';
import {getSubStatus, getAuthStatus} from "../../requests/authRequests";

const customerID = localStorage.getItem("userID");

class MovieDetails extends Component {

    state = {
        liked: false,
        subStatus: "",
        loggedIn: ""
    }

    async componentDidMount() {
        const subStatus = await getSubStatus();
        const loggedIn = await getAuthStatus();

        const movieID = this.props.movieIDFromPage;

        let liked = false;
    
        const watchLaterItem = await getWatchLaterByCustomerIDAndMovieID(customerID, movieID);
    
        if (!watchLaterItem || isObjectEmpty(watchLaterItem)) {
            liked = false;
        } else {
            liked = true;
        }
    
        this.setState({
            liked,
            subStatus,
            loggedIn
        })
        
    }

    renderWatchButton = () => {
        const {subStatus} = this.state;
        const {movieItem} = this.props;
        if (!movieItem || !subStatus) {
            return (<></>);
        }
        const {_id} = movieItem;
        if (subStatus === "active") {
            return (
                <Link to={`/watch-movie/${_id}`} className="section__btn">
                    <i className="fas fa-play-circle fa-2x" aria-hidden="true" style={{paddingRight: "10px"}}></i>
                    WATCH NOW
                </Link>
            )
        } else {
            return (
                <Link to={`/pricing`} className="section__btn">
                    <i className="fas fa-money-bill fa-2x" aria-hidden="true" style={{paddingRight: "10px"}}></i>
                    SUBSCRIBE
                </Link>
            )
        }
    }

    changeLikeStatus = async () => {
        const {movieItem} = this.props;
        const movieID = movieItem._id;

        if (!this.state.liked === true) {
            await addWatchLater(customerID, movieID)
        } else {
            await deleteWatchLater(customerID, movieID)
        }

        this.setState({
            liked: !this.state.liked
        })
    }

    renderLikeButton = () => {
        const {loggedIn, liked} = this.state;
        const {changeLikeStatus} = this;

        if (loggedIn) {
            return (
                <Tooltip title={liked ? "Dislike" : "Like"}>
                    <li className="like-button" onClick={changeLikeStatus} style={liked ? {color: "#ff55a5", border: "1px solid #ff55a5"} : {}}>
                        <i className="fa fa-heart" aria-hidden="true"></i>
                    </li>
                 </Tooltip>
            )
        }
        
    }

    render() {
        const {renderWatchButton, renderLikeButton} = this;
        const {movieItem} = this.props;

        if (!movieItem) {
            return (<></>);
        }

        const {posterURL, name, trailerURL, genres, _id, imdbMovie, rating} = movieItem;
        const {
            Year,
            Rated,
            Runtime,
            Actors,
            Plot,
            imdbRating,
            imdbVotes,
            Country,
            Director
        } = imdbMovie;

        const actors = Actors.split(", ");

        return (
            <div>
	<section className="section details">
    <div className="details__bg"></div>

    <div className="container">
        <div className="row">
            <div className="col-12">
                <h1 className="details__title">
                    {name}
                </h1>
                
            </div>

            <div className="col-12 col-xl-6">
                <div className="card card--details">
                    <div className="row">
                        <div className="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-5">
                            <div className="card__cover">
                                <img src={posterURL} alt=""/>
                            </div>
                            {renderWatchButton()}
                            <RateMovieModal movieID={_id}/>
                        </div>

                        <div className="col-12 col-sm-8 col-md-8 col-lg-9 col-xl-7">
                            <div className="card__content">
                                <div className="card__wrap">
                                    <span className="card__rate"><i className="fas fa-star" aria-hidden="true"></i> {rating.toFixed(1)}/10</span>

                                    <ul className="card__list">
                                        <li>HD</li>
                                        <li>{Rated}</li>
                                        {renderLikeButton()}
                                    </ul>
                                </div>

                                <ul className="card__meta">
                                    <li>
                                        <span>Genre:</span> 
                                        {genres.map(genre => {
                                            return <Link key={genre} to="/">{genre}</Link>
                                        })}
                                    </li>
                                    <li><span>Release year:</span> {Year}</li>
                                    <li><span>Running time:</span> {Runtime}</li>
                                    <li><span>Country:</span> {Country}</li>
                                    <li><span>IMDB Rating:</span> {imdbRating}/10 ({imdbVotes} votes)</li>
                                    <li>
                                        <span>Actors:</span>
                                        {actors.map(actor => {
                                            return <Link key={actor} to="/">{actor}</Link>
                                        })}
                                    </li>
                                    <li><span>Director:</span> <Link to="/">{Director}</Link></li>
                                    <li>
                                        <span>Plot:</span> 
                                        {Plot}
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-xl-6 video-player-container">
                <MovieVideo videoSRC={trailerURL}/>
            </div>

            <div className="col-12" style={{marginTop: "50px"}}>
                    <div className="details__share">
                        <span className="details__share-title">Share with friends:</span>

                        <ul className="details__share-list">
                            <li className="facebook">
                                <a href={`https://www.facebook.com/sharer/sharer.php?app_id=${763684077493968}&sdk=joey&u=${encodeURIComponent(document.URL)}&display=popup&ref=plugin&src=share_button`} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-facebook-square" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li className="twitter">
                                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(document.URL)}`} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-twitter" aria-hidden="true"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
            </div>

        </div>
    </div>
</section>
            </div>
        )
    }
}

export default MovieDetails;
