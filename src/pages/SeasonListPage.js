import React, { Component } from 'react';
import PageTitle from "../components/partials/PageTitle";
import Navbar from "../components/partials/Navbar";
import SeasonList from "../components/seasons/SeasonList";
import Pagination from "../components/partials/Pagination";
import {paginate} from "../utils/paginate";
import {getSeasonsBySeriesID} from "../actions/seasonActions";
import {connect} from "react-redux";

let seasonListBreadcumbs = [
    {
        url: "/",
        text: "Home"
    },
    {
        url: "/",
        text: "Home"
    },
    {
        url: "/season-list",
        text: "Season List"
    }
]

class SeasonListPage extends Component {

    state = {
        seasonCurrentPage: 1
    }

    async componentDidMount() {
        const seriesID = this.props.match.params.seriesID;
        localStorage.setItem("currentSeriesID", seriesID);
        this.props.getSeasonsBySeriesID(seriesID);
        seasonListBreadcumbs = [
            {
                url: "/",
                text: "Home"
            },
            {
                url: `/series-details/${seriesID}`,
                text: "Series"
            },
            {
                url: "/season-list",
                text: "Season List"
            }
        ]
        
    }

    changeSeasonPageNumber = (pageNumber) => {
        this.setState({
            seasonCurrentPage: pageNumber
        })
    }

    renderSeasonList = () => {
        const {seasons, loading} = this.props;
        const {seasonCurrentPage} = this.state;
        const {changeSeasonPageNumber} = this;
        let currentSeasons = seasons;

        const seriesPageObject = paginate(currentSeasons.length, seasonCurrentPage, 12, 4);

        currentSeasons = currentSeasons.slice(seriesPageObject.startIndex, seriesPageObject.endIndex + 1);

        return (
            <>
                <SeasonList seasons={currentSeasons} loading={loading}/>
                <Pagination pageObject={seriesPageObject} onChangePageNumber={changeSeasonPageNumber}/>
            </>
        )
    }

    render() {
        const {renderSeasonList} = this;

        return (
            <>
                <Navbar/>

                <div>
                <PageTitle title="Seasons" breadcumbs={seasonListBreadcumbs}/>

                <section className="content section-padding">
                    <div className="content__head">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    {renderSeasonList()}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            </>

            
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSeasonsBySeriesID: (seasonID) => {
            dispatch(getSeasonsBySeriesID(seasonID))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        seasons: state.seasonReducer.seasons
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonListPage);