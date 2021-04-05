import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {parseDateMoment} from "../../utils/dateParser";
import {getDaysDiff} from "../../utils/utils";
import LazyLoad from 'react-lazyload';
import {withRouter} from "react-router-dom";
import { Tooltip } from 'antd';

class MovieItem extends Component {

    renderWatchedDate = () => {
        const {movieItem} = this.props;
        const {watched_date, rating} = movieItem;

        if (watched_date) {
            return (
                <span className="card__date">
                    <p><b>Watched:</b> {parseDateMoment(watched_date)}</p>
                </span>
            )
        } else {
            return (
                <span className="card__rate">
                    <i className="fas fa-star" aria-hidden="true"></i>
                    {rating.toFixed(1)}/5
                </span>
            )
        }
    }

    render() {
        const {renderWatchedDate} = this;
        const {movieItem, type} = this.props;
        const {posterURL, name, genres, _id, created_date} = movieItem;

        const newTag = getDaysDiff(created_date) <= 14 ? (
            <div className="card__new-tag">
                        NEW
                    </div>
        ) : (<></>);

        const itemLink = type && type === "series" ? `/series-details/${_id}` : `/movies-details/${_id}`;

        return (
            <div className="card">
                <Tooltip title={name}>
                    {newTag}
                    <div className="card__cover">
                    <LazyLoad height={200}>
                        <img src={posterURL} alt=""/>
                    </LazyLoad>
                        <Link to={itemLink} 
                        className="card__play">
                            <i className="fas fa-play" aria-hidden="true"></i>
                        </Link>
                    </div>
                    <div className="card__content">
                        <h3 className="card__title">
                            <Link to={itemLink}>{name}</Link>
                        </h3>
                        <span className="card__category">
                            {/*
                            {genres.map(genre => {
                                return (
                                    <Link to="/" key={genre}>{genre}</Link>
                                )
                            })}
                            */}
                            {
                                <Link to="/" key={genres[0]}>{genres[0]}</Link>
                            }
                        </span>
                        {renderWatchedDate()}
                    </div>
                </Tooltip>
            </div>
        )
    }
}

export default withRouter(MovieItem);
