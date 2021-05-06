import React, { Component } from 'react';
import {
    addComment
} from "../../requests/commentRequests";
import {
    authenticationService
} from "../../_services";
import {message} from "antd";

export default class AddCommentForm extends Component {

    state = {
        content: ""
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onAddComment = async (e) => {
        try {
            e.preventDefault();
            const {content} = this.state;
            const {movieSeriesID} = this.props;
            const insertComment = this.props.addComment;
            const currentUser = authenticationService.currentUserValue;

            if (!content || !currentUser || !movieSeriesID) {
                return message.error("Cannot create. Invalid data");
            }

            const comment = await addComment({
                customerID: currentUser.customerItem._id,
                movieSeriesID,
                content
            });

            insertComment(comment);

            this.setState({
                content: ""
            })
        } catch (error) {

        }
    }

    render() {
        const {onAddComment, onChange} = this;
        const {content} = this.state;
        const currentUser = authenticationService.currentUserValue;

        if (!currentUser) {
            return (<></>);
        }

        return (
            <form action="#" onSubmit={onAddComment} class="form">
                <textarea id="content" name="content" class="form__textarea" required placeholder="Add comment" onChange={onChange} value={content}></textarea>
                <button type="submit" class="form__btn">Send</button>
            </form>
        )
    }
}
