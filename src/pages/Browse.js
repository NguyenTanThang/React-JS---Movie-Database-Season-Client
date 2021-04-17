import React, { Component } from 'react';
import {
    getAllMovies
} from "../actions/movieActions";
import {
    getAllSeries
} from "../actions/seriesActions";
import {
    getAllGenres
} from "../actions/genreActions";
import {connect} from "react-redux";
import MovieList from "../components/movies/MovieList";
import SeriesList from "../components/series/SeriesList";
import PageTitle from "../components/partials/PageTitle";
import BrowseEngine from "../components/partials/BrowseEngine";
import TabGenerator from "../components/partials/TabGenerator";
import Pagination from "../components/partials/Pagination";
import BigLoading from "../components/partials/BigLoading";
import {sortMoviesAndSeries} from "../utils/sorters";
import {paginate} from "../utils/paginate";
import {extractQueryString} from "../utils";
import Navbar from "../components/partials/Navbar";
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";

const browseBreadcumbs = [
    {
        url: "/",
        text: "Home"
    },
    {
        url: "/browse",
        text: "Browse"
    }
]

class Browse extends Component {

    state = {
        searchObject: {
            searchName: "",
            orderBy: "AtoZ",
            sortGenres: []
        },
        seriesCurrentPage: 1,
        moviesCurrentPage: 1
    }

    setSearchObject = (searchObject) => {
        this.setState({
            searchObject
        })
    }

    clearSearchObject = () => {
        this.setState({
            searchObject: {
                searchName: "",
                orderBy: "AtoZ",
                sortGenres: []
            }
        })
    }

    componentWillMount() {
        this.props.getAllMovies();
        this.props.getAllSeries();
        this.props.getAllGenres();
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

    renderTabGen = () => {
        const {movies, series, loading} = this.props;
        const {searchObject, seriesCurrentPage, moviesCurrentPage} = this.state;
        const {changeSeriesPageNumber, changeMoviesPageNumber} = this;
        let currentMovies = movies;
        let currentSeries = series;

        currentSeries = currentSeries.map(currentSeriesItem => {
            return {...currentSeriesItem, type: "series"}
        })

        let currentAllList = [...currentMovies, ...currentSeries];
        currentAllList = sortMoviesAndSeries(currentAllList, searchObject)
        const currentAllListPageObject = paginate(currentAllList.length, moviesCurrentPage, 10, 4);
        currentAllList = currentAllList.slice(currentAllListPageObject.startIndex, currentAllListPageObject.endIndex + 1);

        /*
        const seriesPageObject = paginate(currentSeries.length, seriesCurrentPage, 10, 4);
        const moviesPageObject = paginate(currentMovies.length, moviesCurrentPage, 10, 4);

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

        return (
            <>
                <MovieList movies={currentAllList} loading={loading}/>
                <Pagination pageObject={currentAllListPageObject} onChangePageNumber={changeMoviesPageNumber}/>
            </>
        )
    }

    render() {
        const {renderTabGen, setSearchObject, clearSearchObject} = this;
        const {genres, loading} = this.props;
        const searchQuery = extractQueryString(this.props);

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
                    <title>{`Let's Flix | Browse`}</title>
                    <meta name="description" content="Helmet application" />
                </Helmet>

                <Navbar/>

                <div>
                <PageTitle title="Browse" breadcumbs={browseBreadcumbs}/>

                <section className="content section-padding">
                    <div className="content__head">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 browse-engine">
                                    <BrowseEngine genres={genres} setSearchObject={setSearchObject}
                                    clearSearchObject={clearSearchObject}
                                    searchQuery={searchQuery}/>
                                </div>

                                <div className="col-12">
                                    {renderTabGen()}
                                </div>
                            </div>
                        </div>
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
        getAllMovies: () => {
            dispatch(getAllMovies())
        },
        getAllSeries: () => {
            dispatch(getAllSeries())
        },
        getAllGenres: () => {
            dispatch(getAllGenres())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movieReducer.movies,
        series: state.seriesReducer.series,
        genres: state.genreReducer.genres,
        loading: state.loadingReducer.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Browse);
