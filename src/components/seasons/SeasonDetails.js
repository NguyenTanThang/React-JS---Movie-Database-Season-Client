import React, { Component } from 'react';
import homeBg from '../../images/home__bg.jpg';
import {sectionBG} from "../../config/jqueryCode";
import RateMovieModal from "../movies/RateMovieModal";
import {Link} from "react-router-dom";
import { Tooltip } from 'antd';
import {getSubStatus, getAuthStatus} from "../../requests/authRequests";
import MovieTrailer from "../movies/MovieTrailer";
import Loading from "../partials/Loading";
import {
    getReviewsByMovieID
} from "../../actions/reviewActions";
import {connect} from "react-redux";

class SeasonDetails extends Component {

    state = {
        subStatus: "",
        loggedIn: "",
        loading: true
    }

    async componentDidMount() {
        sectionBG();
        const seasonID = this.props.seasonIDFromPage;
        this.props.getReviewsByMovieID(seasonID);
        const subStatus = await getSubStatus();
        const loggedIn = await getAuthStatus();

        this.setState({
            subStatus,
            loggedIn,
            loading: false
        })
    }

    renderWatchButton = () => {
        const {subStatus, loggedIn, loading} = this.state;
        const {seasonItem} = this.props;

        if (!seasonItem || loading) {
            return (
                <Link to="#" className="section__btn loading__btn">
                    <i style={{paddingRight: "10px"}}>
                        <Loading/>
                    </i>
                    LOADING...
                </Link>
            )
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

        const {seasonItem} = this.props;
        const seasonID = seasonItem._id;

        if (loggedIn) {
            return (
                <RateMovieModal movieID={seasonID}/>
            )
        }
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

    render() {
        const {renderWatchButton, renderRatingButton} = this;
        const {seasonItem, currentSeries} = this.props;

        if (!seasonItem || !currentSeries) {
            return (<></>);
        }

        const {posterURL, name, trailerURL} = seasonItem;
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
	<section className="section details">
    <div className="details__bg" data-bg={homeBg}></div>

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
                                    <li>
                                        <span>Actors:</span>
                                        {!Actors ? actors : actors.map(actor => {
                                            return <Link key={actor} to={`/browse?t=${actor}`}>{actor}</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(SeasonDetails);
