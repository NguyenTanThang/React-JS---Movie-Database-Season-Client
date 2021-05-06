import React, { Component } from 'react';
import TabGenerator from "../components/partials/TabGenerator";
import {getSeasonByIDAxios} from "../requests/seasonRequests";
//import CommentSection from "../components/comments/CommentSection";
import SyncCommentSection from "../components/comments/SyncCommentSection";
import SeasonDetails from "../components/seasons/SeasonDetails";
import MovieDescription from "../components/movies/MovieDescription";
import BigLoading from "../components/partials/BigLoading";
import PhotoViewer from "../components/partials/PhotoViewer";
import {
    getSeasonsBySeriesID
} from "../actions/seasonActions";
import {
    getCommentsByMovieID
} from "../requests/commentRequests";
import {
    getPhotosBySeasonID
} from "../requests/photoRequests";
import {connect} from "react-redux";
import SeasonItem from "../components/seasons/SeasonItem";
import {getRandom} from "../utils/utils";
import Navbar from "../components/partials/Navbar";
import {getSeriesByIDAxios} from "../requests/seriesRequests";
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";

class SeasonDetailsPage extends Component {

    state = {
        seasonItem: "",
        currentSeries: "",
        //comments: "",
        photos: ""
    }

    async componentWillMount() {
        try {
            const seriesID = localStorage.getItem("currentSeriesID");

            this.props.getSeasonsBySeriesID(seriesID);

            const seasonID = this.props.match.params.seasonID;
            const seasonItem = await getSeasonByIDAxios(seasonID);
            const currentSeries = await getSeriesByIDAxios(seriesID);
            //const comments = await getCommentsByMovieID(seasonID);
            const photos = await getPhotosBySeasonID(seasonID);

            this.setState({
                seasonItem,
                currentSeries,
                //comments,
                photos
            })
        } catch (error) {
            this.props.history.push("/error");
        }
    }

    renderRNGSeasonItems = () => {
        const {seasons} = this.props;

        if (seasons.length >= 6) {
            let currentSeason = getRandom(seasons, 6);
        
            return currentSeason.map(seasonItem => {
                return (
                    <div key={seasonItem._id} className="col-6 col-sm-4 col-lg-6">
                        <SeasonItem seasonItem={seasonItem}/>
                    </div>
                )
            })
        } else {
            let currentSeason = seasons;

            return currentSeason.map(seasonItem => {
                return (
                    <div key={seasonItem._id} className="col-6 col-sm-4 col-lg-6">
                        <SeasonItem seasonItem={seasonItem}/>
                    </div>
                )
            })
        }
    }

    /*
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
    */

    renderTabGen = () => {
        const seasonID = this.props.match.params.seasonID;
        const {seasonItem, 
            //comments, 
            photos} = this.state;
        //const {addComment, removeComment} = this;
        const {description} = seasonItem;

        const tabContents = [
            (
                <>
                    <MovieDescription description={description}/>
                </>
            ),
            /*
            (
                <>
                    <CommentSection movieSeriesID={seasonID} comments={comments} removeComment={removeComment} addComment={addComment}/>
                </>
            ),
            */
            (
                <>
                    <SyncCommentSection movieSeriesID={seasonID}/>
                </>
            ),
            (
                <>
                    {/*<PhotoViewer visible={visible} setVisible={setVisible}/>*/}
                    <PhotoViewer photos={photos}/>
                </>
            )
        ]

        const tabHeaders = [
            "Description",
            "Comments",
            "Photos"
        ]

        return <TabGenerator tabContents={tabContents} tabHeaders={tabHeaders}/>
    }

    render() {
        const {renderTabGen, renderRNGSeasonItems} = this;
        const {seasonItem, currentSeries} = this.state;
        const seasonIDFromPage = this.props.match.params.seasonID;

        if (seasonItem === "") {
            return (<>
                <BigLoading/>
            </>)
        }

        return (
            <motion.div
                style={pageStyle}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
            >
            <React.Fragment key={seasonIDFromPage}>
                <Helmet>
                    <title>{`Let's Flix | ${seasonItem.name}`}</title>
                    <meta name="description" content="Helmet application" />
                </Helmet>

                <Navbar/>

                <div>
                <SeasonDetails seasonIDFromPage={seasonIDFromPage} seasonItem={seasonItem} currentSeries={currentSeries}/>
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

                                {renderRNGSeasonItems()}
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

export default connect(mapStateToProps, mapDispatchToProps)(SeasonDetailsPage);
