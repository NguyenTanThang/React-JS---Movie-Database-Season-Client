import React, { Component } from 'react';
//import homeBg from '../../images/home__bg.jpg';
import MovieTrailer from "../movies/MovieTrailer";
import Loading from "../partials/Loading";
import RateMovieModal from "./RateMovieModal";
import {Link} from "react-router-dom";
import { Tooltip } from 'antd';
import {addWatchLater, deleteWatchLater, getWatchLaterByCustomerIDAndMovieID} from "../../requests/watchLaterRequests";
import {isObjectEmpty} from '../../utils/validate';
import {authenticationService} from '../../_services';
import {getSubStatus, getAuthStatus} from "../../requests/authRequests";
import {
    getReviewsByMovieID
} from "../../actions/reviewActions";
import {connect} from "react-redux";

class MovieDetails extends Component {

    state = {
        liked: false,
        subStatus: "",
        loggedIn: "",
        loading: true
    }

    async componentDidMount() {
        const movieID = this.props.movieIDFromPage;
        this.props.getReviewsByMovieID(movieID);
        const subStatus = await getSubStatus();
        const loggedIn = await getAuthStatus();

        let liked = false;
    
        const currentUser = authenticationService.currentUserValue;

        if (currentUser) {
            const customerID = currentUser.customerItem._id;
            const watchLaterItem = await getWatchLaterByCustomerIDAndMovieID(customerID, movieID);

            if (!watchLaterItem || isObjectEmpty(watchLaterItem)) {
                liked = false;
            } else {
                liked = true;
            }
        }
        
        this.setState({
            liked,
            subStatus,
            loggedIn,
            loading: false
        })
    }

    calculateRating = () => {
        const {reviews, loading} = this.props;

        if (!loading && reviews) {
            let meanRating = 0;

            for (let i = 0; i < reviews.length; i++) {
                const reviewItem = reviews[i];
                meanRating += reviewItem.grading;
            }

            if (reviews.length && reviews.length > 0) {
                meanRating = meanRating / reviews.length;
            }
            return meanRating;
        }

        return 0;
    }

    renderWatchButton = () => {
        const {subStatus, loggedIn, loading} = this.state;
        const {movieItem} = this.props;

        if (!movieItem || loading) {
            return (
                <Link to="#" className="section__btn loading__btn">
                    <i style={{paddingRight: "10px"}}>
                        <Loading/>
                    </i>
                    LOADING...
                </Link>
            )
        }

        const {_id} = movieItem;

        if (subStatus === "active") {
            return (
                <Link to={`/watch-movie/${_id}`} className="section__btn">
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
        const {movieItem} = this.props;
        const movieID = movieItem._id;
        const currentUser = authenticationService.currentUserValue;

        if (currentUser) {
            const customerItem = currentUser.customerItem;
            const customerID = customerItem._id;
            if (!this.state.liked === true) {
                await addWatchLater(customerID, movieID)
            } else {
                await deleteWatchLater(customerID, movieID)
            }
        }

        this.setState({
            liked: !this.state.liked
        })
    }

    renderRatingButton = () => {
        const {loggedIn, loading} = this.state;

        if (loading) {
            return (
                <Tooltip title={"Loading"}>
                    <li className="like-button">
                        <Loading/>
                    </li>
                 </Tooltip>
            )
        }

        const {movieItem} = this.props;
        const movieID = movieItem._id;

        if (loggedIn) {
            return (
                <RateMovieModal movieID={movieID}/>
            )
        }
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
                <Tooltip title={liked ? "Remove from Watch Later" : "Add to Watch Later"}>
                    <li className="like-button" onClick={changeLikeStatus} style={liked ? {color: "#ff55a5", border: "1px solid #ff55a5"} : {}}>
                        <i className="fa fa-heart" aria-hidden="true"></i>
                    </li>
                 </Tooltip>
            )
        }
    }

    render() {
        const {renderWatchButton, renderLikeButton, renderRatingButton} = this;
        const {movieItem} = this.props;

        if (!movieItem) {
            return (<></>);
        }

        const {posterURL, name, trailerURL, genres, imdbMovie} = movieItem;
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

        let actors = "N/A";
        if (Actors) {
            actors = Actors.split(", ");
        }

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
                        </div>

                        <div className="col-12 col-sm-8 col-md-8 col-lg-9 col-xl-7">
                            <div className="card__content">
                                <div className="card__wrap">
                                    <span className="card__rate"><i className="fas fa-star" aria-hidden="true"></i> {this.calculateRating().toFixed(1)}/5</span>

                                    <ul className="card__list">
                                        <li>HD</li>
                                        <li>{Rated}</li>
                                        {renderLikeButton()}
                                        {renderRatingButton()}
                                    </ul>
                                </div>

                                <ul className="card__meta">
                                    <li>
                                        <span>Genre:</span> 
                                        {genres.map(genre => {
                                            return <Link key={genre} to={`/browse?g=${genre}`}>{genre}</Link>
                                        })}
                                    </li>
                                    <li><span>Release year:</span> {Year}</li>
                                    <li><span>Running time:</span> {Runtime}</li>
                                    <li><span>Country:</span> {Country}</li>
                                    <li><span>IMDB Rating:</span> {imdbRating}/10 ({imdbVotes} votes)</li>
                                    <li>
                                        <span>Actors:</span>
                                        {!Actors ? actors : actors.map(actor => {
                                            return <Link key={actor} to={`/browse?t=${actor}`}>{actor}</Link>
                                        })}
                                    </li>
                                    <li><span>Director:</span> <Link style={!Director || Director === "N/A" ? {pointerEvents: "none"} : {}} to={`/browse?t=${Director}`}>{Director}</Link></li>
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

            <div className="col-12 col-xl-6 video-player-container video-player-container--trailer">
                <MovieTrailer videoSRC={trailerURL}/>
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

const mapDispatchToProps = (dispatch) => {
    return {
        getReviewsByMovieID: (movieID) => {
            dispatch(getReviewsByMovieID(movieID))
        },
    }
}

const mapStateToProps = (state) => {
    return {
        reviews: state.reviewReducer.reviews,
        loading: state.loadingReducer.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
