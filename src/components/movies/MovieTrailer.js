import React, { Component } from 'react';
import Plyr from 'plyr';

export default class MovieVideo extends Component {
    async componentDidMount() {
        new Plyr('#player');
    }

    render() {
        const {videoSRC} = this.props;
        //const {videoBlobURL} = this.state;
        //poster={"https://wallpaperaccess.com/full/1512225.jpg"}
        
        return (
            <>
                <video
                controls src={videoSRC} playsInline={true} id="player" height="100%" width="100%">

                    {/*
                        <source src={videoSRC} type="video/mp4"/>
                        <source src={videoBlobURL} type="video/mp4"/>
                    */}

                </video>
            </>
        )
    }
}