import React, { Component } from 'react';
import MovieItem from "./MovieItem";
import { Empty } from 'antd';
import Loading from "../partials/Loading";
//import {connect} from "react-redux";

class MovieList extends Component {

    componentDidMount() {
    }

    renderMovieItems = () => {
        const {movies, loading} = this.props;

        if (loading) {
            return (
                <Loading/>)
        }

        if (movies.length === 0) {
            return (
                <div className="col-12 text-center empty-container">
                    <Empty
                        description={
                            "No Movies"
                        }
                    />
                </div>
            )
        }

        return movies.map(movieItem => {
            return (
                <div key={movieItem._id} className="col-6 col-sm-4 col-lg-3 col-xl-2 item-container">
                    <MovieItem movieItem={movieItem} type={movieItem.type}/>
                </div>
            )
        })
    }

    render() {
        const {renderMovieItems} = this;

        return (
            <div className="row">
                {renderMovieItems()}
            </div>
        )
    }
}

/*
const mapStateToProps = (state) => {
    return {
        loading: state.loadingReducer.loading,
    }
}

export default connect(mapStateToProps, null)(MovieList);
*/

export default MovieList;
