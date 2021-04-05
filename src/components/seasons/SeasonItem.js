import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { Tooltip } from 'antd';

export default class SeasonItem extends Component {

    renderWatchedDate = () => {
        const {seasonItem} = this.props;
        const {rating} = seasonItem;

        /*
        if (watched_date) {
            return (
                <span className="card__date">
                    <p><b>Watched:</b> {parseDateMoment(watched_date)}</p>
                </span>
            )
        } else {
            */
            return (
                <span className="card__rate">
                    <i className="fas fa-star" aria-hidden="true"></i>
                    {rating.toFixed(1)}/5
                </span>
            )
    }

    render() {
        const {renderWatchedDate} = this;
        const {seasonItem} = this.props;
        const {posterURL, seasonNum, name, _id} = seasonItem;

        return (
            <div className="card">
                <Tooltip title={name}>
                    <div className="card__cover">
                        <img src={posterURL} alt=""/>
                        <Link to={`/season-details/${_id}`} className="card__play">
                            <i className="fas fa-play" aria-hidden="true"></i>
                        </Link>
                    </div>
                    <div className="card__content">
                        <h3 className="card__title">
                            <Link to={`/season-details/${_id}`}>
                                {name}
                            </Link>
                        </h3>
                        <span className="card__category">
                            <Link to="/">Season {seasonNum}</Link>
                        </span>
                        {renderWatchedDate()}
                    </div>
                </Tooltip>
            </div>
        )
    }
}
