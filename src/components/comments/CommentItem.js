import React, { Component } from 'react';
import {
    parseDateMomentWithTime
} from "../../utils/dateParser";
import {
    authenticationService
} from "../../_services";
import {
    deleteComment
} from "../../requests/commentRequests";

/*
<div class="comments__actions">
    <div class="comments__rate">
        <button type="button"><i class="icon ion-md-thumbs-up"></i>12</button>

        <button type="button">7<i class="icon ion-md-thumbs-down"></i></button>
    </div>

    <button type="button"><i class="icon ion-ios-share-alt"></i>Reply</button>
    <button type="button"><i class="icon ion-ios-quote"></i>Quote</button>
</div>
*/

export default class CommentItem extends Component {

    onDeleteComment = async (commentID) => {
        try {
            const comment = await deleteComment(commentID);
            if (comment) {
                this.props.removeComment(commentID);
            }
        } catch (error) {
            
        }
        
    }

    renderCommentActions = () => {
        const currentUser = authenticationService.currentUserValue;
        const {commentItem} = this.props;
        
        if (!currentUser || currentUser.customerItem._id != commentItem.customerID._id) {
            return <></>
        }

        return (
            <div class="comments__actions">
                <div class="comments__rate">
                    
                </div>

                {this.renderDeleteComment()}
            </div>
        )
    }

    renderDeleteComment = () => {
        const {onDeleteComment} = this;
        const {commentItem} = this.props;
        const currentUser = authenticationService.currentUserValue;
        const {customerID} = commentItem;

        if (!currentUser) {
            return <></>
        }

        if (customerID._id === currentUser.customerItem._id) {
            return <button onClick={() => onDeleteComment(commentItem._id)} type="button"><i class="far fa-trash-alt"></i>Delete</button>
        }
    }

    render() {
        const {commentItem} = this.props;

        if (!commentItem) {
            return (<></>);
        }

        const {content, created_date, customerID} = commentItem;
        const {username, avatar} = customerID;

        return (
            <li class="comments__item">
                <div class="comments__autor">
                    <img class="comments__avatar" src={avatar} alt="User Avatar"/>
                    <span class="comments__name">{username}</span>
                    <span class="comments__time">{parseDateMomentWithTime(created_date)}</span>
                </div>
                <p class="comments__text">{content}</p>
                {this.renderCommentActions()}
            </li>
        )
    }
}
