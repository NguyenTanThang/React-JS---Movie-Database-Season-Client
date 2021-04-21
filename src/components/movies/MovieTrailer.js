import React, { Component } from 'react';
import Plyr from 'plyr';
import {
    playerControls,
    playerSettings,
} from "../../config/jqueryCode";
import {
    measureDeviceWidth
} from "../../utils/utils";

export default class MovieVideo extends Component {
    async componentDidMount() {
        new Plyr('.player-modified', {
            controls: playerControls,
            //controls: playerControlsSeries,
            settings: playerSettings
        });
    }

    renderVideo = () => {
        const {videoSRC} = this.props;
        const deviceWidth = measureDeviceWidth();

        if (deviceWidth === "desktop" || deviceWidth === "tablet") {
            return (<video
                controls={true} src={videoSRC} playsInline={true} id="player" className="player-modified" height="100%" width="100%">

                    {/*
                        <source src={videoSRC} type="video/mp4"/>
                        <source src={videoBlobURL} type="video/mp4"/>
                    */}
            </video>)
        } else {
            return (<video
                controls={true} src={videoSRC} playsInline={true} height="100%" width="100%" controlsList="nodownload" id="player" className="basic-video">
                    {/*
                        <source src={videoSRC} type="video/mp4"/>
                        <source src={videoBlobURL} type="video/mp4"/>
                    */}
            </video>)
        }
    }

    render() {
        const {renderVideo} = this;
        //const {videoBlobURL} = this.state;
        //poster={"https://wallpaperaccess.com/full/1512225.jpg"}
        
        return (
            <>
                {renderVideo()}
            </>
        )
    }
}