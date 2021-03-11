import React, { Component } from 'react';
import {
    parseDateMoment
} from "../../utils/dateParser";

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
    render() {
        const {commentItem} = this.props;

        if (!commentItem) {
            return (<></>);
        }

        const {content, created_date, customerID} = commentItem;
        const username = customerID.email.split("@")[0];

        return (
            <li class="comments__item">
                <div class="comments__autor">
                    <img class="comments__avatar" src="https://lh3.googleusercontent.com/proxy/0HYXiOXVVqEJP0SWyOJJgq5AgqyDinkqCKkEZh1IK5gLX6Gzb1om2sZvT_GLgGLxHlVA4aIi-57ONZkvELVm7A2FCH8_jePvEIIDKBEzgjJT7oBSNyXSmiPhnYDAy-6ucgFtG8aiGyPS_Ttm" alt="User Avatar"/>
                    <span class="comments__name">{username}</span>
                    <span class="comments__time">{parseDateMoment(created_date)}</span>
                </div>
                <p class="comments__text">{content}</p>
            </li>
        )
    }
}
