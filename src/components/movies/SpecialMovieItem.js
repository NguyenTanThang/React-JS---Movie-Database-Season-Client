import React, { Component } from 'react';
import {Link} from "react-router-dom";

class SpecialMovieItem extends Component {
    render() {
        const {movieItem} = this.props;
        const {posterURL, name, genres, _id, rating, imdbMovie} = movieItem;
        const {Rated, Plot} = imdbMovie;

        return (
        <div className="card card--list">
            <div className="row">
                <div className="col-12 col-sm-4">
                    <div className="card__cover">
                        <img src={posterURL} alt=""/>
                        <Link to={`/movies-details/${_id}`} 
                                    className="card__play">
                                    <i className="fas fa-play" aria-hidden="true"></i>
                        </Link>
                    </div>
                </div>

                <div className="col-12 col-sm-8">
                    <div className="card__content">
                        <h3 className="card__title">
                        <Link to={`/movies-details/${_id}`}>{name}</Link>
                        </h3>
                        <span className="card__category">
                            {genres.map(genre => {
                                return <Link key={genre} to="/">{genre}</Link>
                            })}
                        </span>

                        <div className="card__wrap">
                            <span className="card__rate"><i className="fas fa-star" aria-hidden="true"></i> {rating.toFixed(1)}/5</span>

                            <ul className="card__list">
                                <li>HD</li>
                                <li>{Rated}</li>
                            </ul>
                        </div>

                        <div className="card__description">
                            <p>{Plot}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default SpecialMovieItem;
