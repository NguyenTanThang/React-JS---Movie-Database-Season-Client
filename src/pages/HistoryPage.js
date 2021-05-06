import React, { Component } from 'react';
import PageTitle from "../components/partials/PageTitle";
import MovieList from "../components/movies/MovieList";
import SeriesList from "../components/series/SeriesList";
import Navbar from "../components/partials/Navbar";
import {connect} from "react-redux";
import {getAllWatchHistoryByCustomerID} from "../actions/historyActions";
import Pagination from "../components/partials/Pagination";
import {paginate} from "../utils/paginate";
import TabGenerator from "../components/partials/TabGenerator";
import BigLoading from "../components/partials/BigLoading";
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";
import { Link } from 'react-router-dom';

const helpBreadcumbs = [
    {
        url: "/",
        text: "Home"
    },
    {
        url: "/history",
        text: "History"
    }
]

class WatchHistory extends Component {

    state = {
        seriesCurrentPage: 1,
        moviesCurrentPage: 1
    }

    componentWillMount() {
        this.props.getAllWatchHistoryByCustomerID();
    }

    changeSeriesPageNumber = (pageNumber) => {
        this.setState({
            seriesCurrentPage: pageNumber
        })
    }

    changeMoviesPageNumber = (pageNumber) => {
        this.setState({
            moviesCurrentPage: pageNumber
        })
    }

    renderWatchHistory = () => {
        const {watchHistory, loading} = this.props;
        const {moviesCurrentPage, seriesCurrentPage} = this.state;
        const {changeSeriesPageNumber, changeMoviesPageNumber} = this;
        let movieList = [];
        let seriesList = [];

        if (!watchHistory.movieList || !watchHistory.seriesList || !watchHistory.seriesDateList || !watchHistory.movieDateList) {
            return <></>;
        }

        watchHistory.movieList.forEach((movieItem, index) => {
            if (movieItem) {
                const movieDateItem = watchHistory.movieDateList[index]
                movieItem.watched_date = movieDateItem;
                movieList.push(movieItem);
            }
        })
        watchHistory.seriesList.forEach((seriesItem, index)  => {
            if (seriesItem) {
                const seriesDateItem = watchHistory.seriesDateList[index]
                seriesItem.watched_date = seriesDateItem;
                seriesList.push(seriesItem);
            }
        })

        let currentMovies = movieList;
        let currentSeries = seriesList;

        currentSeries = currentSeries.map(currentSeriesItem => {
            return {...currentSeriesItem, type: "series"}
        })

        let currentAllList = [...currentMovies, ...currentSeries];
        currentAllList = currentAllList.sort(function(a,b){
            return new Date(b.watched_date) - new Date(a.watched_date);
        });
        const currentAllListPageObject = paginate(currentAllList.length, moviesCurrentPage, 10, 4);
        currentAllList = currentAllList.slice(currentAllListPageObject.startIndex, currentAllListPageObject.endIndex + 1);

        /*
        const seriesPageObject = paginate(currentSeries.length, seriesCurrentPage, 12, 4);
        const moviesPageObject = paginate(currentMovies.length, moviesCurrentPage, 12, 4);

        currentMovies = currentMovies.slice(moviesPageObject.startIndex, moviesPageObject.endIndex + 1);
        currentSeries = currentSeries.slice(seriesPageObject.startIndex, seriesPageObject.endIndex + 1);

        const tabContents = [
            (
                <>
                    <MovieList movies={currentMovies} loading={loading}/>
                    <Pagination pageObject={moviesPageObject} onChangePageNumber={changeMoviesPageNumber}/>
                </>
            ),
            (
                <>
                    <SeriesList series={currentSeries} loading={loading}/>
                    <Pagination pageObject={seriesPageObject} onChangePageNumber={changeSeriesPageNumber}/>
                </>
            )
        ]

        const tabHeaders = [
            "Movies",
            "Series"
        ]

        return <TabGenerator tabContents={tabContents} tabHeaders={tabHeaders}/>
        */

        if (currentAllList.length === 0) {
            return <div className="empty-message-container">
                <h4>Currently you don't have any movies in your watch history list</h4>
                <p>You can browse to find the one you like</p>
                <Link to="/browse" className="section__btn">Browse Now</Link>
            </div>
        }

        return (
            <>
                <MovieList movies={currentAllList} loading={loading}/>
                <Pagination pageObject={currentAllListPageObject} onChangePageNumber={changeMoviesPageNumber}/>
            </>
        )
    }

    render() {
        const {renderWatchHistory} = this;
        const {loading} = this.props;

        if (loading) {
            return (
                <BigLoading/>
            )
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
                    <title>{`Let's Flix | History`}</title>
                    <meta name="description" content="Helmet application" />
                </Helmet>

                <Navbar/>

                <div>
                <PageTitle title="Watch History" breadcumbs={helpBreadcumbs}/>

                    <section className="section" id="watch-history-section">
                        <div className="container">
                            {renderWatchHistory()}
                        </div>
                    </section>
                </div>
            </>
            </motion.div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getAllWatchHistoryByCustomerID: () => {
            dispatch(getAllWatchHistoryByCustomerID())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        watchHistory: state.watchHistoryReducer.watchHistory,
        loading: state.loadingReducer.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchHistory);
