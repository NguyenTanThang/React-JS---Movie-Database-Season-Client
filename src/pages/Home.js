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
import {
    filterRecommendationSection
} from "../utils/utils";
import {connect} from "react-redux";
import MovieList from "../components/movies/MovieList";
import SeriesList from "../components/series/SeriesList";
import HomeHeader from "../components/partials/HomeHeader";
import TabGenerator from "../components/partials/TabGenerator";
import {Link} from "react-router-dom";
import Navbar from "../components/partials/Navbar";
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";
import {Reveal, Tween} from "react-gsap";

class Home extends Component {

    componentDidMount() {
        this.props.getAllMovies();
        this.props.getAllSeries();
        this.props.getAllGenres();
    }

    renderRecommendationSec = () => {
        const {generateRecommendationSection} = this;
        const {movies, series, genres} = this.props;

        // ["Action", "Crime", "Drama", "Thriller", "Science Fiction", "Adventure"]

        const recommendedGenres = genres.map(genreItem => {
            return genreItem.name;
        });

        let recMovieList = filterRecommendationSection(recommendedGenres, movies);
        let recSeriesList = filterRecommendationSection(recommendedGenres, series);

        return generateRecommendationSection(recMovieList, recSeriesList);
    }

    generateRecommendationSection = (recMovieList, recSeriesList) => {
        const {generateTabs} = this;

        return recMovieList.map((recMovieItem, index) => {
            const recSeriesItem = recSeriesList[index];

            return (
                <Reveal key={index}>
                    <Tween from={{ opacity: 0 }} duration={0.8}>
                        <div className="row home-sec">
                            <div className="col-12">
                                <h2 className="content__title">{recMovieItem.currentGenre}</h2>

                                {generateTabs(recMovieItem.movieList, recSeriesItem.movieList)}
                            </div>
                        </div>
                    </Tween>
                </Reveal>
            )
        })
    }

    generateTabs = (currentMovies, currentSeries) => {
        const {loading} = this.props;

        const tabContents = [
            (
                <>
                    <MovieList movies={currentMovies} loading={loading}/>
                    {/*
                    <Link to="/browse" className="section__btn">
                        Browse More
                    </Link>
                    */}
                </>
            ),
            (
                <>
                    <SeriesList series={currentSeries} loading={loading}/>
                    {/*
                    <Link to="/browse" className="section__btn">
                        Browse More
                    </Link>
                    */}
                </>
            )
        ]

        const tabHeaders = [
            "Movies",
            "Series"
        ]

        return <TabGenerator tabContents={tabContents} tabHeaders={tabHeaders}/>
    }

    renderTabGen = () => {
        const {movies, series} = this.props;
        const {generateTabs} = this;
        let currentMovies = movies;
        let currentSeries = series;

        currentMovies = currentMovies.slice(0, 6);
        currentSeries = currentSeries.slice(0, 6);

        return generateTabs(currentMovies, currentSeries)
    }

    render() {
        const {renderTabGen, renderRecommendationSec} = this;

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
                    <title>{`Let's Flix | Home`}</title>
                    <meta name="description" content="Helmet application" />
                </Helmet>

                <Navbar/>

                <HomeHeader/>

                <section className="content section-padding">
                    <div className="content__head">
                        <div className="container">

                            <div className="row home-sec">
                            <Reveal key={"New Releases"}>
                                <Tween from={{ opacity: 0 }} duration={0.8}>
                                    <div className="col-12">
                                        <h2 className="content__title">New Releases</h2>

                                        {renderTabGen()}
                                    </div>
                                </Tween>
                            </Reveal>
                            </div>

                            {renderRecommendationSec()}
                        </div>
                    </div>
                </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
