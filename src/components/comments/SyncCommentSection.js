import React, { Component } from 'react';
import CommentItem from "./CommentItem";
import AddCommentForm from "./AddCommentForm";
import {
    getCommentsByMovieID
} from "../../requests/commentRequests";
import {
    withRouter
} from "react-router-dom";

class CommentSection extends Component {

    state = {
        comments: "",
    }

    async componentWillMount() {
        try {
            const movieSeriesID = this.props.movieSeriesID;

            const comments = await getCommentsByMovieID(movieSeriesID);

            this.setState({
                comments,
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

    renderCommentItems = () => {
        const {comments} = this.state;
        const {removeComment} = this;

        if (!comments) {
            return (<></>)
        }

        if (comments.length === 0) {
            return (<div className="text-center">
                <h5>Currently there is no comment</h5>
            </div>)
        }

        return comments.map((comment, index) => {
            return <CommentItem removeComment={removeComment} commentItem={comment}/>
        })
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