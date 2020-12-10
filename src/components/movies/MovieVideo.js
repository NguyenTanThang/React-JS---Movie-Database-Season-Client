import React, { Component } from 'react';
import { 
    Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton
 } from 'video-react';
import {
    getScreenshot
} from "../../config/jqueryCode";
import ReactPlayer from 'react-player'

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

/*
export default class MovieVideo extends Component {
    render() {
        const {videoSRC} = this.props;

        return (
            <ReactPlayer url={videoSRC} height="100%" width="100%" controls={true} 
            config={{ file: {
                tracks: [
                  {kind: 'subtitles', src: 'subs/subtitles.en.vtt', srcLang: 'en', default: true},
                  {kind: 'subtitles', src: 'subs/subtitles.ja.vtt', srcLang: 'ja'},
                  {kind: 'subtitles', src: 'subs/subtitles.de.vtt', srcLang: 'de'}
                ]
              }}}
            />
        )
    }
}
*/
