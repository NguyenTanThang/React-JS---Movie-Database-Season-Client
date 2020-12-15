import React, { Component } from 'react';
import { 
    Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
 } from 'video-react';
import {
    getScreenshot
} from "../../config/jqueryCode";
import ReactPlayer from 'react-player';
import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay, Subtitles } from 'react-html5video';
import sampleSub from "../../data/subtitles/sample.vtt";
import Plyr from 'plyr';

/*
export default class MovieVideo extends Component {
    render() {
        const {videoSRC} = this.props;

        return (
            <Player height="100%" poster={"https://wallpaperaccess.com/full/1512225.jpg"} width="100%" fluid={false} id="player">
                <source src={videoSRC} />

                <ControlBar>
                    <ReplayControl seconds={10} order={1.1} />
                    <ForwardControl seconds={10} order={1.2} />
                    <CurrentTimeDisplay order={4.1} />
                    <TimeDivider order={4.2} />
                    <PlaybackRateMenuButton rates={[5, 2, 1.5, 1, 0.5, 0.1]} order={7.1} />
                    <VolumeMenuButton />
                </ControlBar>
            </Player>
        )
    }
}
*/

export default class MovieVideo extends Component {

    componentDidMount() {
        const player = new Plyr('#player');
    }

    render() {
        const {videoSRC} = this.props;
        // poster={"https://wallpaperaccess.com/full/1512225.jpg"}

        return (
                <video controls playsInline={true} id="player" height="100%" width="100%">

                    <source src={videoSRC} type="video/mp4"/>

                    <track kind="captions" label="English" src={sampleSub} srcLang="en" default />
                    <track kind="captions" label="Français" src={sampleSub} srcLang="fr" />

                    <a href={videoSRC} download>Download</a>
                </video>
        )
    }
}