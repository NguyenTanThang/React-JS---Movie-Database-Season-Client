import React, { Component} from 'react';
import { FacebookProvider, Comments } from 'react-facebook';
 
export default class FacebookComments extends Component {
  render() {
    const {movieID} = this.props; 

    return (
        <div className="facebook-comment-container">
        <FacebookProvider appId="763684077493968">
            <Comments href={`https://developers.facebook.com/docs/plugins/comments#movies-${movieID}`} data-width="100%" />
        </FacebookProvider>
      </div>
    );
  }
}