import React, { Component } from 'react';
import SpecialSeriesItem from "./SpecialSeriesItem";
import { Empty } from 'antd';
import Loading from "../partials/Loading";
//import {connect} from "react-redux";

class SpecialSeriesList extends Component {

    componentDidMount() {
    }

    renderSeriesItems = () => {
        const {series, loading} = this.props;

        if (loading) {
            return (<Loading/>)
        }

        if (series.length === 0) {
            return (
                <div className="col-12 text-center">
                    <Empty
                        description={
                            "No Series"
                        }
                    />
                </div>
            )
        }

        return series.map(seriesItem => {
            return (
                <div key={seriesItem._id} className="col-6 col-sm-12 col-lg-6">
                    <SpecialSeriesItem seriesItem={seriesItem}/>
                </div>
            )
        })
    }

    render() {
        const {renderSeriesItems} = this;

        return (
                    <div className="row">
                        {renderSeriesItems()}
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

export default SpecialSeriesList;
