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
import MovieCarousel from "../components/movies/MovieCarousel";
import SeriesList from "../components/series/SeriesList";
import SeriesCarousel from "../components/series/SeriesCarousel";
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
                <React.Fragment key={index}>
                {/*
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
                */}
                    <div className="row home-sec">
                        <div className="col-12">
                            <h2 className="content__title">{recMovieItem.currentGenre}</h2>

                            {generateTabs(recMovieItem.movieList, recSeriesItem.movieList)}
                         </div>
                    </div>
                </React.Fragment>
            )
        })
    }

    generateTabs = (currentMovies, currentSeries) => {
        const {loading} = this.props;

        let movieContent = [];
        let seriesContent = [];

        if (currentMovies.length > 6) {
            if (currentMovies.length >= 12) {
                movieContent = <MovieCarousel movies={currentMovies.slice(0, 10)} loading={loading}/>
                return;
            }
            movieContent = <MovieCarousel movies={currentMovies} loading={loading}/>
        } else {
            movieContent = <MovieList movies={currentMovies} loading={loading}/>
        }

        if (currentSeries.length > 6) {
            if (currentSeries.length >= 12) {
                seriesContent = <SeriesCarousel series={currentSeries.slice(0, 10)} loading={loading}/>
                return;
            }
            seriesContent = <SeriesCarousel series={currentSeries} loading={loading}/>
        } else {
            seriesContent = <SeriesList series={currentSeries} loading={loading}/>
        }

        const tabContents = [
            (
                <>
                    {movieContent}
                </>
            ),
            (
                <>
                    {seriesContent}
                </>
            )
        ]

        const tabHeaders = [
            "Movies",
            "Series"
        ]

        return <TabGenerator tabContents={tabContents} tabHeaders={tabHeaders}/>
    }

    renderTabGen = (maxItemNumber) => {
        const {movies, series} = this.props;
        const {generateTabs} = this;
        let currentMovies = movies;
        let currentSeries = series;

        currentMovies = currentMovies.slice(0, maxItemNumber);
        currentSeries = currentSeries.slice(0, maxItemNumber);

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

                                        {renderTabGen(12)}
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
