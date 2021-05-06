import React, { Component } from 'react';
import Slider from "react-slick";
import MovieItem from "./MovieItem";
import { Empty } from 'antd';
import Loading from "../partials/Loading";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style}}
      onClick={onClick}
    />
  );
}

class MovieCarousel extends Component {

    renderMovieItems = () => {
        const {movies, loading} = this.props;

        if (loading) {
            return (<Loading/>)
        }

        if (movies.length === 0) {
            return (
                <div className="col-12 text-center">
                    <Empty
                        description={
                            "No Movies"
                        }
                    />
                </div>
            )
        }

        return movies.map(movieItem => {
            return (
                <div key={movieItem._id} className="card-carousel-item">
                    <MovieItem  type={movieItem.type} movieItem={movieItem}/>
                </div>
            )
        })
    }

    render() {
        const {renderMovieItems} = this;
        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 2,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            responsive: [
                {
                  breakpoint: 1025,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2
                  }
                },
                {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: 4,
                      slidesToScroll: 2
                    }
                  },
                {
                  breakpoint: 800,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 380,
                  infinite: true,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        };

        return (
            <>
                <Slider {...settings}>
                    {renderMovieItems()}
                </Slider>
            </>
        )
    }
}

export default MovieCarousel;


