import React, { Component } from 'react';
import TabGenerator from "../components/partials/TabGenerator";
import {getMovieByIDAxios} from "../requests/movieRequests";
import FaceBookCommentsTest from "../components/partials/FaceBookCommentsTest";
import MovieDetails from "../components/movies/MovieDetails";
import MovieDescription from "../components/movies/MovieDescription";
import CommentSection from "../components/comments/CommentSection";
import BigLoading from "../components/partials/BigLoading";
import {
    getAllMovies
} from "../actions/movieActions";
import {
    getCommentsByMovieID
} from "../requests/commentRequests";
import {connect} from "react-redux";
import MovieItem from "../components/movies/MovieItem";
import {getRandom} from "../utils/utils";
import {Empty} from "antd";
import Navbar from "../components/partials/Navbar";
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";

class MovieDetailsPage extends Component {

    state = {
        movieItem: "",
        comments: ""
    }

    async componentDidMount() {
        try {
            this.props.getAllMovies();

            const movieID = this.props.match.params.movieID;

            const movieItem = await getMovieByIDAxios(movieID);
            const comments = await getCommentsByMovieID(movieID);

            this.setState({
                movieItem,
                comments
            })
        } catch (error) {
            this.props.history.push("/error");
        }
    }

    addComment = (comment) => {
        this.setState({
            comments: [comment, ...this.state.comments]
        })
    }

    removeComment = (commentID) => {
        this.setState({
            comments: this.state.comments.filter(comment => {
                return comment._id != commentID;
            })
        })
    }

    renderRNGMovieItems = () => {
        const {movies} = this.props;

        if (movies.length > 6) {
            let currentMovies = getRandom(movies, 6);
        
            return currentMovies.map(movieItem => {
                return (
                    <div key={movieItem._id} className="col-6 col-sm-4 col-lg-6">
                        <MovieItem movieItem={movieItem}/>
                    </div>
                )
            })
        } 
        else if (movies.length <= 6) {
            let currentMovies = getRandom(movies, movies.length);
        
            return currentMovies.map(movieItem => {
                return (
                    <div key={movieItem._id} className="col-6 col-sm-4 col-lg-6">
                        <MovieItem movieItem={movieItem}/>
                    </div>
                )
            })
        }
        else {
            return (
                <div className="col-12 text-center pb-4">
                    <Empty description="No Movie"/>
                </div>
            )
        }
        
    }

    renderTabGen = () => {
        const movieID = this.props.match.params.movieID;
        const {addComment, removeComment} = this;
        const {movieItem, comments} = this.state;
        const {description} = movieItem;

        const tabContents = [
            (
                <>
                    <MovieDescription description={description}/>
                </>
            ),
            (
                <>
                    <CommentSection movieSeriesID={movieID} comments={comments} removeComment={removeComment} addComment={addComment}/>
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

        if (movieItem === "") {
            return (<>
                <BigLoading/>
            </>)
        }

        const movieIDFromPage = this.props.match.params.movieID;
        const {name} = movieItem;

        return (
            <motion.div
                style={pageStyle}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
            >
            <React.Fragment key={movieIDFromPage}>
                <Helmet>
                    <title>{`Let's Flix | ${name}`}</title>
                    <meta name="description" content="Helmet application" />
                </Helmet>

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
            </React.Fragment>
            </motion.div>
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
