import React from "react";

export default class FaceBookCommentsTest extends React.Component {

    componentDidMount() {

        // Facebook comment SDK
        const fbSDK = (d, s, id) => {
          let js;
          const fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v8.0&appId=763684077493968&autoLogAppEvents=1';
          fjs.parentNode.insertBefore(js, fjs);
        };
        fbSDK(document, 'script', 'facebook-jssdk');

        window.FB.XFBML.parse();
      }

  render() {
    const {movieID} = this.props; 

    return (
        <div className="facebook-comment-container">
            <div id="fb-root"></div>
            <div className="fb-comments" data-href={`https://developers.facebook.com/docs/plugins/comments#movies-${movieID}`}
            data-colorscheme="light" data-width="100%" data-numposts="5" data-order-by="reverse_time"></div>
        </div>
    );
  }
}