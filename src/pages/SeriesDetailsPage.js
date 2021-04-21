import React, { Component } from 'react';
import TabGenerator from "../components/partials/TabGenerator";
import {getSeriesByIDAxios} from "../requests/seriesRequests";
//import CommentSection from "../components/comments/CommentSection";
import SyncCommentSection from "../components/comments/SyncCommentSection";
import SeriesDetails from "../components/series/SeriesDetails";
import MovieDescription from "../components/movies/MovieDescription";
import PhotoViewer from "../components/partials/PhotoViewer";
import BigLoading from "../components/partials/BigLoading";
import {
    getAllSeries
} from "../actions/seriesActions";
import {
    getCommentsByMovieID
} from "../requests/commentRequests";
import {
    getPhotosBySeriesID
} from "../requests/photoRequests";
import {connect} from "react-redux";
import SeriesItem from "../components/series/SeriesItem";
import {getRandom} from "../utils/utils";
import {Empty} from "antd";
import Navbar from "../components/partials/Navbar";
import {Helmet} from "react-helmet";
import { motion } from "framer-motion";
import {pageStyle, pageTransition, pageVariants} from "../config/animation";

class SeriesDetailsPage extends Component {

    state = {
        seriesItem: "",
        //comments: "",
        photos: ""
    }

    async componentWillMount() {
        try {
            this.props.getAllSeries();

            const seriesID = this.props.match.params.seriesID;

            const seriesItem = await getSeriesByIDAxios(seriesID);
            //const comments = await getCommentsByMovieID(seriesID);
            const photos = await getPhotosBySeriesID(seriesID);

            this.setState({
                seriesItem,
                //comments,
                photos
            })
        } catch (error) {
            this.props.history.push("/error");
        }
    }

    renderRNGSeriesItems = () => {
        const {series} = this.props;

        if (series.length > 6) {
            let currentSeries = getRandom(series, 6);
        
            return currentSeries.map(seriesItem => {
                return (
                    <div key={seriesItem._id} className="col-6 col-sm-4 col-lg-6">
                        <SeriesItem seriesItem={seriesItem}/>
                    </div>
                )
            })
        } 
        else if (series.length <= 6) {
            let currentSeries = getRandom(series, series.length);
        
            return currentSeries.map(seriesItem => {
                return (
                    <div key={seriesItem._id} className="col-6 col-sm-4 col-lg-6">
                        <SeriesItem seriesItem={seriesItem}/>
                    </div>
                )
            })
        }
        else {
            return (
                <div className="col-12 text-center pb-4">
                    <Empty description="No Series"/>
                </div>
            )
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
        const seriesID = this.props.match.params.seriesID;
        const {seriesItem, 
            //comments, 
            photos} = this.state;
        //const {addComment, removeComment} = this;
        const {description} = seriesItem;

        const tabContents = [
            (
                <>
                    <MovieDescription description={description}/>
                </>
            ),
            /*
            (
                <>
                    <CommentSection movieSeriesID={seriesID} comments={comments} removeComment={removeComment} addComment={addComment}/>
                </>
            ),
            */
            (
                <>
                    <SyncCommentSection movieSeriesID={seriesID}/>
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
        const {renderTabGen, renderRNGSeriesItems} = this;
        const {seriesItem} = this.state;
        const seriesIDFromPage = this.props.match.params.seriesID;

        if (seriesItem === "") {
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
            <React.Fragment key={seriesIDFromPage}>
                <Helmet>
                    <title>{`Let's Flix | ${seriesItem.name}`}</title>
                    <meta name="description" content="Helmet application" />
                </Helmet>

                <Navbar/>

                <div>
                <SeriesDetails seriesIDFromPage={seriesIDFromPage} seriesItem={seriesItem}/>
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

                                {renderRNGSeriesItems()}
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
        getAllSeries: () => {
            dispatch(getAllSeries())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        series: state.seriesReducer.series
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeriesDetailsPage);
