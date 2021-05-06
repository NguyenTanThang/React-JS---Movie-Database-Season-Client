import React, { Component } from 'react';
import SeasonItem from "./SeasonItem";
import { Empty } from 'antd';
import Loading from "../partials/Loading";

class SeasonList extends Component {

    renderSeasonItems = () => {
        const {seasons, loading} = this.props;

        if (loading) {
            return (<Loading/>)
        }

        if (seasons.length === 0) {
            return (
                <div className="col-12 text-center">
                    <Empty
                        description={
                            "No Season"
                        }
                    />
                </div>
            )
        }

        return seasons.map(seasonItem => {
            return <div  key={seasonItem._id} className="col-6 col-sm-4 col-lg-3 col-xl-2 item-container">
                <SeasonItem seasonItem={seasonItem}/>
            </div>
        })
    }

    render() {
        const {renderSeasonItems} = this;

        return (
            <div className="row">
                {renderSeasonItems()}
            </div>
        )
    }
}

export default SeasonList;
