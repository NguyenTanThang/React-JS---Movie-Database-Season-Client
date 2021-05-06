import React, { Component } from 'react';
import {
    getCurrentVideoTime,
    setCurrentVideoTime,
    getRecord,
    secondsToHms,
    playVideo,
    checkVideoStatus,
    playerControls,
    playerSettings,
    playerControlsSeries
} from "../../config/jqueryCode";
import Plyr from 'plyr';
import {
    blobFromURLStandard,
    measureDeviceWidth
} from "../../utils/utils";

export default class MovieVideo extends Component {

    state = {
        videoBlobURL: "",
        base64SubtitlesURL: [],
        modalActive: false,
        saveCounter: 0
    }

    executeSaveCounter = () => {
        if (!checkVideoStatus()) {
            if (this.state.saveCounter >= 20) {
                return this.setState({
                    saveCounter: 0
                })
            }
            this.setState({
                saveCounter: this.state.saveCounter + 1
            })
        }
    }

    async componentDidMount() {
        new Plyr(".player-modified", {
            controls: playerControls,
            //controls: playerControlsSeries,
            settings: playerSettings
        });
        //const {subtitles, videoSRC} = this.props;
        const {subtitles, movieID} = this.props;
        getCurrentVideoTime(movieID);
        const record = getRecord(movieID);
        let modalActive = record ? true : false;
        let base64SubtitlesURL = [];
        //const videoBlobURL = await blobFromURL(videoSRC);
        if (subtitles) {
            for (let i = 0; i < subtitles.length; i++) {
                const subtitleItem = subtitles[i];
                base64SubtitlesURL.push(
                    await blobFromURLStandard("data:text/vtt;base64,", subtitleItem.subtitleURL)
                    //await blobFromURL(subtitleItem.subtitleURL)
                );
            }
        }
        setInterval(() => {
            this.executeSaveCounter();
        }, 1000);
        this.setState({
            //videoBlobURL,
            base64SubtitlesURL,
            modalActive
        })
    }

    renderSubtitlesTrack = () => {
        const {subtitles} = this.props;
        const {base64SubtitlesURL} = this.state;

        if (!subtitles) {
            return (<></>)
        }

        /*
        
        <track kind="captions" key={_id} label={languageLabel} src={base64SubtitlesURL[index]} default />

        <track kind="captions" key={_id} label={languageLabel} src={base64SubtitlesURL[index]} />

        */

        return subtitles.map((subtitleItem, index) => {
            const {languageLabel, _id, subtitleURL} = subtitleItem;
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

    onContinueWatching = () => {
        const {movieID} = this.props;
        this.setState({
            modalActive: false
        })
        setCurrentVideoTime(movieID)
        playVideo();
    }

    onFormBeginning = () => {
        this.setState({
            modalActive: false
        })
        playVideo();
    }

    renderVideo = () => {
        const {renderSubtitlesTrack} = this;
        const {modalActive} = this.state;
        const {videoSRC} = this.props;
        const deviceWidth = measureDeviceWidth();

        if (deviceWidth === "desktop" || deviceWidth === "tablet") {
            return (<video
                controls={modalActive ? false : true} src={videoSRC} playsInline={true} id="player" className="player-modified" height="100%" width="100%">

                    {/*
                        <source src={videoSRC} type="video/mp4"/>
                        <source src={videoBlobURL} type="video/mp4"/>
                    */}

                    {renderSubtitlesTrack()}
            </video>)
        } else {
            return (<video
                controls={modalActive ? false : true} src={videoSRC} playsInline={true} height="100%" width="100%" controlsList="nodownload" id="player" className="basic-video">

                    {/*
                        <source src={videoSRC} type="video/mp4"/>
                        <source src={videoBlobURL} type="video/mp4"/>
                    */}

                    {renderSubtitlesTrack()}
            </video>)
        }
    }

    render() {
        const {renderVideo, onFormBeginning, onContinueWatching} = this;
        const {modalActive} = this.state;
        const {movieID} = this.props;
        const record = getRecord(movieID);
        //const {videoBlobURL} = this.state;
        //poster={"https://wallpaperaccess.com/full/1512225.jpg"}
        

        return (
            <>
                {renderVideo()}
                {record ? (
                    <>
                    <div className="control-hider" style={{display: modalActive ? "block" : "none"}}></div>
                    <div className="continue-modal" style={{display: modalActive ? "block" : "none"}}>
                        <h4>You were watching at {secondsToHms(record.currentTime)}</h4>
                        <h5>Would like to continue?</h5>
                        <div className="continue-modal-footer">
                            <button className="btn btn-light" onClick={onFormBeginning}>Watch from beginning</button>
                            <button className="price__btn" onClick={onContinueWatching}>Continue watching</button>
                        </div>
                    </div>
                    </>
                ) : (<></>)}
            </>
        )
    }
}