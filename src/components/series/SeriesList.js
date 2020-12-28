import React, { Component } from 'react';
import SeriesItem from "./SeriesItem";
import { Empty } from 'antd';
import Loading from "../partials/Loading";

class SeriesList extends Component {

    renderSeriesItems = () => {
        const {series, loading} = this.props;

        if (loading) {
            return (<Loading/>)
        }

        if (series.length === 0) {
            return (
                <div className="col-12 text-center empty-container">
                    <Empty
                        description={
                            "No Series"
                        }
                    />
                </div>
            )
        }

        return series.map(seriesItem => {
            return <div key={seriesItem._id} className="col-6 col-sm-4 col-lg-3 col-xl-2">
                <SeriesItem seriesItem={seriesItem}/>
            </div>
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

export default SeriesList;
