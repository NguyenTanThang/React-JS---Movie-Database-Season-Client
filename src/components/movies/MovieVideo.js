import React, { Component } from 'react';
import {
    getCurrentVideoTime
} from "../../config/jqueryCode";
import Plyr from 'plyr';
import {
    blobFromURL,
    blobFromURLStandard
} from "../../utils/utils";

export default class MovieVideo extends Component {

    state = {
        videoBlobURL: "",
        base64SubtitlesURL: []
    }

    async componentDidMount() {
        new Plyr('#player');
        const {subtitles, videoSRC} = this.props;
        //getCurrentVideoTime();
        let base64SubtitlesURL = [];
        const videoBlobURL = await blobFromURL(videoSRC);
        if (subtitles) {
            for (let i = 0; i < subtitles.length; i++) {
                const subtitleItem = subtitles[i];
                base64SubtitlesURL.push(
                    await blobFromURLStandard("data:text/vtt;base64,", subtitleItem.subtitleURL)
                    //await blobFromURL(subtitleItem.subtitleURL)
                );
            }
        }
        this.setState({
            videoBlobURL,
            base64SubtitlesURL
        })
    }

    renderSubtitlesTrack = () => {
        const {subtitles} = this.props;
        const {base64SubtitlesURL} = this.state;

        if (!subtitles) {
            return (<></>)
        }

        return subtitles.map((subtitleItem, index) => {
            const {languageLabel, _id} = subtitleItem;
            if (index === 0) {
                return (
                    <track kind="captions" key={_id} label={languageLabel} src={base64SubtitlesURL[index]} default />
                )
            }
            return (
                <track kind="captions" key={_id} label={languageLabel} src={base64SubtitlesURL[index]} />
            )
        })
    }

    render() {
        const {renderSubtitlesTrack} = this;
        const {videoBlobURL} = this.state;
        

        return (
                <video 
                poster={"https://wallpaperaccess.com/full/1512225.jpg"}
                controls src={videoBlobURL} playsInline={true} id="player" height="100%" width="100%">

                    {/*
                        <source src={videoSRC} type="video/mp4"/>
                        <source src={videoBlobURL} type="video/mp4"/>
                    */}

                    {renderSubtitlesTrack()}
                </video>
        )
    }
}