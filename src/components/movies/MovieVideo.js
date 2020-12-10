import React, { Component } from 'react';
import { Player } from 'video-react';

export default class MovieVideo extends Component {
    render() {
        const {videoSRC} = this.props;

        return (
            <Player
                poster={"https://thesecondtake.com/wp-content/uploads/2016/05/wzjag9bahpstesuyz995.jpg"}
                src={videoSRC}
                height="100%"
                width="100%"
                fluid={false}
            />
        )
    }
}
