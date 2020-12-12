import React, { Component } from 'react';
import PageTitle from "../components/partials/PageTitle";
import MovieList from "../components/movies/MovieList";
import SeriesList from "../components/series/SeriesList";
import Navbar from "../components/partials/Navbar";
import {connect} from "react-redux";
import {getAllWatchLaterByCustomerID} from "../actions/watchLaterActions";
import Pagination from "../components/partials/Pagination";
import {paginate} from "../utils/paginate";
import TabGenerator from "../components/partials/TabGenerator";
import {Helmet} from "react-helmet";

const helpBreadcumbs = [
    {
        url: "/",
        text: "Home"
    },
    {
        url: "/watch-later",
        text: "Watch Later"
    }
]

class WatchLater extends Component {

    state = {
        seriesCurrentPage: 1,
        moviesCurrentPage: 1
    }

    componentDidMount() {
        this.props.getAllWatchLaterByCustomerID();
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

    renderWatchLater = () => {
        const {watchLater, loading} = this.props;
        const {moviesCurrentPage, seriesCurrentPage} = this.state;
        const {changeSeriesPageNumber, changeMoviesPageNumber} = this;
        let movieList = [];
        let seriesList = [];

        console.log(watchLater);

        if (!watchLater.movieList || !watchLater.seriesList) {
            return <></>;
        }

        watchLater.movieList.forEach(movieItem => {
            movieList.push(movieItem);
        })
        watchLater.seriesList.forEach(movieItem => {
            seriesList.push(movieItem);
        })

        let currentMovies = movieList;
        let currentSeries = seriesList;

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
    }

    render() {
        const {renderWatchLater} = this;

        return (
            <>
                <Helmet>
                    <title>{`Let's Flix | Watch Later`}</title>
                    <meta name="description" content="Helmet application" />
                </Helmet>

                <Navbar/>

                <div>
                <PageTitle title="Watch Later" breadcumbs={helpBreadcumbs}/>

                    <section className="section" id="watch-later-section">
                        <div className="container">
                            {renderWatchLater()}
                        </div>
                    </section>
                </div>
            </>

            
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getAllWatchLaterByCustomerID: () => {
            dispatch(getAllWatchLaterByCustomerID())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        watchLater: state.watchLaterReducer.watchLater,
        loading: state.loadingReducer.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchLater);
