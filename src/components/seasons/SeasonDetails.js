import React, { Component } from 'react';
import homeBg from '../../images/home__bg.jpg';
import {sectionBG} from "../../config/jqueryCode";
import RateMovieModal from "../movies/RateMovieModal";
import {Link} from "react-router-dom";
import { Tooltip } from 'antd';
import {addWatchLater, deleteWatchLater, getWatchLaterByCustomerIDAndMovieID} from "../../requests/watchLaterRequests";
import {isObjectEmpty} from '../../utils/validate';
import {getSubStatus, getAuthStatus} from "../../requests/authRequests";
import MovieTrailer from "../movies/MovieTrailer";

const customerID = localStorage.getItem("userID")

class SeasonDetails extends Component {

    state = {
        liked: false,
        subStatus: "",
        loggedIn: ""
    }

    async componentDidMount() {
        sectionBG();

        const subStatus = await getSubStatus();
        const loggedIn = await getAuthStatus();

        const seasonID = this.props.seasonIDFromPage;

        let liked = false;
    
        const watchLaterItem = await getWatchLaterByCustomerIDAndMovieID(customerID, seasonID);
    
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
        const {subStatus, loggedIn} = this.state;
        const {seasonItem} = this.props;
        if (!seasonItem || !subStatus) {
            return (<></>);
        }
        const {_id} = seasonItem;
        if (subStatus === "active") {
            return (
                <Link to={`/watch-season/${_id}`} className="section__btn">
                    <i className="fas fa-play-circle fa-2x" aria-hidden="true" style={{paddingRight: "10px"}}></i>
                    WATCH NOW
                </Link>
            )
        } 
        else if (!loggedIn) {
            return (
                <Link to={`/sign-in`} className="section__btn">
                    <i className="fas fa-sign-in-alt fa-2x" style={{paddingRight: "10px"}} aria-hidden="true"></i>
                    SIGN IN
                </Link>
            )
        }
        else {
            return (
                <Link to={`/pricing`} className="section__btn">
                    <i className="fas fa-money-bill fa-2x" aria-hidden="true" style={{paddingRight: "10px"}}></i>
                    SUBSCRIBE
                </Link>
            )
        }
    }

    changeLikeStatus = async () => {
        const {seasonItem} = this.props;
        const seasonID = seasonItem._id;

        if (!this.state.liked === true) {
            await addWatchLater(customerID, seasonID)
        } else {
            await deleteWatchLater(customerID, seasonID)
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
        const {seasonItem, currentSeries} = this.props;

        if (!seasonItem || !currentSeries) {
            return (<></>);
        }

        const {posterURL, name, trailerURL, _id, rating} = seasonItem;
        const {imdbSeries, genres} = currentSeries;
        const {
            Year,
            Rated,
            Runtime,
            Actors,
            Plot,
            Country,
            Director
        } = imdbSeries;

        const actors = Actors.split(", ");

        return (
            <div>
	<section class="section details">
    <div class="details__bg" data-bg={homeBg}></div>

    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1 class="details__title">
                    {name}
                </h1>
                
            </div>

            <div class="col-12 col-xl-6">
                <div class="card card--details">
                    <div class="row">
                        <div class="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-5">
                            <div class="card__cover">
                                <img src={posterURL} alt=""/>
                            </div>
                            {renderWatchButton()}
                            <RateMovieModal movieID={_id}/>
                        </div>

                        <div class="col-12 col-sm-8 col-md-8 col-lg-9 col-xl-7">
                            <div class="card__content">
                                <div class="card__wrap">
                                    <span class="card__rate"><i class="fas fa-star" aria-hidden="true"></i> {rating.toFixed(1)}/10</span>

                                    <ul class="card__list">
                                        <li>HD</li>
                                        <li>{Rated}</li>
                                        {renderLikeButton()}
                                    </ul>
                                </div>

                                <ul class="card__meta">
                                    <li>
                                        <span>Genre:</span> 
                                        {genres.map(genre => {
                                            return <Link key={genre} to="/">{genre}</Link>
                                        })}
                                    </li>
                                    <li><span>Release year:</span> {Year}</li>
                                    <li><span>Running time:</span> {Runtime}</li>
                                    <li><span>Country:</span> {Country}</li>
                                    <li>
                                        <span>Actors:</span>
                                        {actors.map(actor => {
                                            return <Link key={actor} to="/">{actor}</Link>
                                        })}
                                    </li>
                                    {Director !== "N/A" ? (<li><span>Director:</span> <Link to="/">{Director}</Link></li>) : <></>}
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

            <div class="col-12 col-xl-6 video-player-container">
                <MovieTrailer videoSRC={trailerURL}/>
            </div>

            <div class="col-12" style={{marginTop: "50px"}}>
                    <div class="details__share">
                        <span class="details__share-title">Share with friends:</span>

                        <ul class="details__share-list">
                            <li class="facebook">
                                <a href={`https://www.facebook.com/sharer/sharer.php?app_id=${763684077493968}&sdk=joey&u=${encodeURIComponent(document.URL)}&display=popup&ref=plugin&src=share_button`} target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-facebook-square" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li class="twitter">
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

export default SeasonDetails;
