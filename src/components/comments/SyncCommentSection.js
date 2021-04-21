import React, { Component } from 'react';
import CommentItem from "./CommentItem";
import AddCommentForm from "./AddCommentForm";
import {
    getCommentsByMovieID
} from "../../requests/commentRequests";
import {
    withRouter
} from "react-router-dom";
import Loading from "../partials/Loading";
import Pagination from "../partials/Pagination";
import {paginate} from "../../utils/paginate";

class CommentSection extends Component {

    state = {
        comments: "",
        loading: true,
        commentCurrentPage: 1,
    }

    async componentWillMount() {
        try {
            const movieSeriesID = this.props.movieSeriesID;

            const comments = await getCommentsByMovieID(movieSeriesID);

            this.setState({
                comments,
                loading: false
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

    changeSeasonPageNumber = (pageNumber) => {
        this.setState({
            commentCurrentPage: pageNumber
        })
    }

    renderCommentItems = () => {
        const {comments, loading} = this.state;
        const {removeComment, changeSeasonPageNumber} = this;
        const {commentCurrentPage} = this.state;
        
        if (!comments || loading) {
            return (<>
                <Loading/>
            </>)
        }

        if (comments.length === 0) {
            return (<div className="text-center">
                <h5>Currently there is no comment</h5>
            </div>)
        }

        let currentComments = comments;

        const seriesPageObject = paginate(currentComments.length, commentCurrentPage, 5, 4);

        currentComments = currentComments.slice(seriesPageObject.startIndex, seriesPageObject.endIndex + 1);

        return (
            <>
                {currentComments.map((comment, index) => {
                    return <CommentItem removeComment={removeComment} commentItem={comment}/>
                })}
                <Pagination isNotToTop pageObject={seriesPageObject} onChangePageNumber={changeSeasonPageNumber}/>
            </>
        )
    }

    render() {
        const {renderCommentItems, addComment} = this;
        const {movieSeriesID} = this.props;

        return (
            <div class="col-12">
                <div class="comments">
                    <AddCommentForm addComment={addComment} movieSeriesID={movieSeriesID}/>
                    <ul class="comments__list">
                        {renderCommentItems()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(CommentSection);