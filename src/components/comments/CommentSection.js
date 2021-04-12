import React, { Component } from 'react';
import CommentItem from "./CommentItem";
import AddCommentForm from "./AddCommentForm";

/* Comment Item 
<li class="comments__item">
    <div class="comments__autor">
        <img class="comments__avatar" src="img/user.png" alt=""/>
        <span class="comments__name">John Doe</span>
        <span class="comments__time">30.08.2018, 17:53</span>
    </div>
    <p class="comments__text">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
    <div class="comments__actions">
        <div class="comments__rate">
            <button type="button"><i class="icon ion-md-thumbs-up"></i>12</button>

            <button type="button">7<i class="icon ion-md-thumbs-down"></i></button>
        </div>

        <button type="button"><i class="icon ion-ios-share-alt"></i>Reply</button>
        <button type="button"><i class="icon ion-ios-quote"></i>Quote</button>
    </div>
</li>
*/

export default class CommentSection extends Component {

    renderCommentItems = () => {
        const {comments, removeComment} = this.props;

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
        const {renderCommentItems} = this;
        const {movieSeriesID, addComment} = this.props;

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
