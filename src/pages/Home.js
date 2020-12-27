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
    filterRecommendationSection,
} from "../utils/utils";
import {
    getHighestRating
} from "../utils/sorters";
import {connect} from "react-redux";
import MovieList from "../components/movies/MovieList";
import SpecialMovieList from "../components/movies/SpecialMovieList";
import SpecialSeriesList from "../components/series/SpecialSeriesList";
//import MovieCarousel from "../components/movies/MovieCarousel";
import SeriesList from "../components/series/SeriesList";
//import SeriesCarousel from "../components/series/SeriesCarousel";
import HomeHeader from "../components/partials/HomeHeader";
import TabGenerator from "../components/partials/TabGenerator";
import Navbar from "../components/partials/Navbar";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";
import {Reveal, Tween} from "react-gsap";
import {shuffleArray, measureDeviceWidth} from "../utils/utils";
import loadable from '@loadable/component';
import LazyLoad from 'react-lazyload';

const MovieCarousel = loadable(() => import('../components/movies/MovieCarousel'));
const SeriesCarousel = loadable(() => import('../components/series/SeriesCarousel'));
/*
const MovieList = loadable(() => import('../components/movies/MovieList'));
const Navbar = loadable(() => import('../components/partials/Navbar'));
const SeriesList = loadable(() => import('../components/series/SeriesList'));
const HomeHeader = loadable(() => import("../components/partials/HomeHeader"));
const TabGenerator = loadable(() => import("../components/partials/TabGenerator"));
*/

const deviceType = measureDeviceWidth();

class Home extends Component {

    componentWillMount() {
        this.props.getAllMovies();
        this.props.getAllSeries();
        this.props.getAllGenres();
    }

    renderTopRatingSec = () => {
        const {movies, series, loading} = this.props;
        let currentMovies = movies;
        let currentSeries = series;
        
        currentMovies = getHighestRating(currentMovies).slice(0, 6);
        currentSeries = getHighestRating(currentSeries).slice(0, 6);

        let movieContent = <SpecialMovieList movies={currentMovies} loading={loading}/>;
        let seriesContent = <SpecialSeriesList series={currentSeries} loading={loading}/>;

        
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

    renderRecommendationSec = () => {
        const {generateRecommendationSection} = this;
        const {movies, series} = this.props;

        const recommendedGenres = ["Action", "Adventure", "Crime", "Drama", "Thriller"];

        /*
        const recommendedGenres = genres.map(genreItem => {
            return genreItem.name;
        });
        */

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
                    <div className="home-sec other-rec-sec">
                        <div className="container">
                            <div className="col-12">
                                <h2 className="content__title">{recMovieItem.currentGenre}</h2>

                                {generateTabs(recMovieItem.movieList, recSeriesItem.movieList)}
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        })
    }

    generateTabs = (currentMovies, currentSeries, isShuffle) => {
        const {loading} = this.props;
        let maxItemNumber = 10;

        if (deviceType === "mobile") {
            maxItemNumber = 6;
        }

        if (isShuffle) {
            currentMovies = shuffleArray(currentMovies);
            currentSeries = shuffleArray(currentSeries);
        }

        let movieContent = [];
        let seriesContent = [];

        if (currentMovies.length > 6) {
            if (currentMovies.length >= maxItemNumber + 1) {
                movieContent = <MovieCarousel movies={currentMovies.slice(0, maxItemNumber)} loading={loading}/>
            } else {
                movieContent = <MovieCarousel movies={currentMovies} loading={loading}/>
            }
        } else {
            movieContent = <MovieList movies={currentMovies} loading={loading}/>
        }

        if (currentSeries.length > 6) {
            if (currentSeries.length >= maxItemNumber + 1) {
                seriesContent = <SeriesCarousel series={currentSeries.slice(0, maxItemNumber)} loading={loading}/>
            } else {
                seriesContent = <SeriesCarousel series={currentSeries} loading={loading}/>
            }
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

        currentMovies = currentMovies.sort((a, b) => {
            return new Date(b.created_date) - new Date(a.created_date);
        })
        currentSeries = currentSeries.sort((a, b) => {
            return new Date(b.created_date) - new Date(a.created_date);
        })

        currentMovies = currentMovies.slice(0, maxItemNumber);
        currentSeries = currentSeries.slice(0, maxItemNumber);

        return generateTabs(currentMovies, currentSeries, false)
    }

    render() {
        const {renderTabGen, renderRecommendationSec, renderTopRatingSec} = this;

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

                <section className="content">
                    <div className="content__head">

                    <div className="top-rating-sec home-sec">
                        <div className="container">
                            <div className="col-12" key={"Top Ratings"}>
                                <h2 className="content__title">Top Ratings</h2>

                                {renderTopRatingSec()}
                            </div>
                        </div>
                    </div>

                            <div className="home-sec new-release-sec">
                                 <div className="container">
                                    <div className="col-12" key={"New Releases"}>
                                        <h2 className="content__title">New Releases</h2>

                                        {renderTabGen(10)}
                                    </div>
                                </div>
                            </div>

                            {/*{renderRecommendationSec()}*/}
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
