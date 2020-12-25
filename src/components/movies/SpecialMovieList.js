import React, { Component } from 'react';
import SpecialMovieItem from "./SpecialMovieItem";
import { Empty } from 'antd';
import Loading from "../partials/Loading";
//import {connect} from "react-redux";

class SpecialMovieList extends Component {

    componentDidMount() {
    }

    renderMovieItems = () => {
        const {movies, loading} = this.props;

        if (loading) {
            return (<Loading/>)
        }

        if (movies.length === 0) {
            return (
                <div className="col-12 text-center">
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
                <div key={movieItem._id} className="col-6 col-sm-12 col-lg-6">
                    <SpecialMovieItem movieItem={movieItem}/>
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

export default SpecialMovieList;
