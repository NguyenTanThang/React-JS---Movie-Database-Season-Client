import React, { Component } from 'react';
import TabGenerator from "../components/partials/TabGenerator";
import {getMovieByIDAxios} from "../requests/movieRequests";
import FaceBookCommentsTest from "../components/partials/FaceBookCommentsTest";
import MovieDetails from "../components/movies/MovieDetails";
import MovieDescription from "../components/movies/MovieDescription";
import {
    getAllMovies
} from "../actions/movieActions";
import {connect} from "react-redux";
import MovieItem from "../components/movies/MovieItem";
import {getRandom} from "../utils/utils";
import {Empty} from "antd";
import Navbar from "../components/partials/Navbar";

class MovieDetailsPage extends Component {

    state = {
        movieItem: ""
    }

    async componentDidMount() {
        this.props.getAllMovies();

        const movieID = this.props.match.params.movieID;

        const movieItem = await getMovieByIDAxios(movieID);

        this.setState({
            movieItem
        })
    }

    renderRNGMovieItems = () => {
        const {movies} = this.props;

        if (movies.length > 0) {
            let currentMovies = getRandom(movies, 6);
        
            return currentMovies.map(movieItem => {
                return (
                    <div className="col-6 col-sm-4 col-lg-6">
                        <MovieItem movieItem={movieItem} key={movieItem._Id}/>
                    </div>
                )
            })
        } else {
            return (
                <div className="col-12 text-center pb-4">
                    <Empty description="No Movie"/>
                </div>
            )
        }
        
    }

    renderTabGen = () => {
        const movieID = this.props.match.params.movieID;
        const {movieItem} = this.state;
        const {description} = movieItem;

        const tabContents = [
            (
                <>
                    <MovieDescription description={description}/>
                </>
            ),
            (
                <>
                    <FaceBookCommentsTest movieID={movieID}/>
                </>
            )
        ]

        const tabHeaders = [
            "Description",
            "Comments"
        ]

        return <TabGenerator tabContents={tabContents} tabHeaders={tabHeaders}/>
    }

    render() {
        const {renderTabGen, renderRNGMovieItems} = this;
        const {movieItem} = this.state;
        const movieIDFromPage = this.props.match.params.movieID;

        return (
            <>
                <Navbar/>

                <div>
                <MovieDetails movieIDFromPage={movieIDFromPage} movieItem={movieItem}/>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-8 col-xl-8 movie-details-tab">
                            {renderTabGen()}
                        </div>
                        <div className="col-12 col-lg-4 col-xl-4">
                            <div className="row">
                                <div className="col-12">
                                    <h2 className="section__title section__title--sidebar">Watch more...</h2>
                                </div>

                                {renderRNGMovieItems()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllMovies: () => {
            dispatch(getAllMovies())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movieReducer.movies
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsPage);
