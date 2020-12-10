import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {parseDateMoment} from "../../utils/dateParser";

export default class MovieItem extends Component {

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
                    {rating.toFixed(1)}/10
                </span>
            )
        }
    }

    render() {
        const {renderWatchedDate} = this;
        const {movieItem} = this.props;
        const {posterURL, name, genres, _id} = movieItem;

        return (
							<div className="card">
								<div className="card__cover">
									<img src={posterURL} alt=""/>
									<Link target={"_blank"} to={`/movies-details/${_id}`} className="card__play">
										<i className="fas fa-play" aria-hidden="true"></i>
									</Link>
								</div>
								<div className="card__content">
                                    <h3 className="card__title">
                                        <Link target={"_blank"} to={`/movies-details/${_id}`}>{name}</Link>
                                    </h3>
                                    <span className="card__category">
                                        {genres.map(genre => {
                                            return (
										        <Link to="/" key={genre}>{genre}</Link>
                                            )
                                        })}
									</span>
                                    {renderWatchedDate()}
								</div>
							</div>
        )
    }
}
