import React, { Component } from 'react';
import homeBg from '../../images/home__bg.jpg';
import {sectionBG} from "../../config/jqueryCode";
import MovieTrailer from "../movies/MovieTrailer";
import RateMovieModal from "../movies/RateMovieModal";
import {Link} from "react-router-dom";
import { Tooltip } from 'antd';
import {addWatchLater, deleteWatchLater, getWatchLaterByCustomerIDAndMovieID} from "../../requests/watchLaterRequests";
import {isObjectEmpty} from '../../utils/validate';
import {authenticationService} from '../../_services';
import {getAuthStatus} from "../../requests/authRequests";
import Loading from "../partials/Loading";

class SeriesDetails extends Component {

    state = {
        liked: false,
        loggedIn: "",
        loading: true
    }

    async componentDidMount() {
        sectionBG();
        const loggedIn = await getAuthStatus();

        const seriesID = this.props.seriesIDFromPage;

        let liked = false;
    
        const currentUser = authenticationService.currentUserValue;

        if (currentUser) {
            const customerItem = currentUser.customerItem;
            const customerID = customerItem._id;
            const watchLaterItem = await getWatchLaterByCustomerIDAndMovieID(customerID, seriesID);
        
            if (!watchLaterItem || isObjectEmpty(watchLaterItem)) {
                liked = false;
            } else {
                liked = true;
            }
        }
    
        this.setState({
            liked,
            loggedIn,
            loading: false
        })
    }

    renderWatchButton = () => {
        const {seriesItem} = this.props;
        if (!seriesItem) {
            return (<></>);
        }
        const {_id} = seriesItem;
        /*
        if (subStatus === "active") {
            return (
                <Link to={`/season-list/${_id}`} className="section__btn">
                    <i className="fas fa-play-circle fa-2x" aria-hidden="true" style={{paddingRight: "10px"}}></i>
                    VIEW SEASONS
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
        */

       return (
            <Link to={`/season-list/${_id}`} className="section__btn">
                <i className="fas fa-play-circle fa-2x" aria-hidden="true" style={{paddingRight: "10px"}}></i>
                VIEW SEASONS
            </Link>
        )
    }

    changeLikeStatus = async () => {
        const {seriesItem} = this.props;
        const seriesID = seriesItem._id;

        const currentUser = authenticationService.currentUserValue;

        if (currentUser) {
            const customerItem = currentUser.customerItem;
            const customerID = customerItem._id;
            if (!this.state.liked === true) {
                await addWatchLater(customerID, seriesID)
            } else {
                await deleteWatchLater(customerID, seriesID)
            }
        }

        this.setState({
            liked: !this.state.liked
        })
    }

    renderLikeButton = () => {
        const {loggedIn, liked, loading} = this.state;
        const {changeLikeStatus} = this;

        if (loading) {
            return (
                <Tooltip title={"Loading"}>
                    <li className="like-button">
                        <Loading/>
                    </li>
                 </Tooltip>
            )
        }

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
        const {seriesItem} = this.props;

        if (!seriesItem) {
            return (<></>);
        }

        const {posterURL, name, trailerURL, genres, _id, rating, imdbSeries} = seriesItem;
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
                                    <li><span>IMDB Rating:</span> {imdbRating}/10 ({imdbVotes} votes)</li>
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

            <div class="col-12 col-xl-6 video-player-container video-player-container--trailer">
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

export default SeriesDetails;
