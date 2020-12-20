import React, { Component } from 'react';
import Slider from "react-slick";
import SeriesItem from "./SeriesItem";
import { Empty } from 'antd';
import Loading from "../partials/Loading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class SeriesCarousel extends Component {

    renderSeriesItems = () => {
        const {series, loading} = this.props;

        if (loading) {
            return (<Loading/>)
        }

        if (series.length === 0) {
            return (
                <div className="col-12 text-center">
                    <Empty
                        description={
                            "No Series"
                        }
                    />
                </div>
            )
        }

        return series.map(seriesItem => {
            return (
                <div key={seriesItem._id} className="card-carousel-item">
                    <SeriesItem seriesItem={seriesItem}/>
                </div>
            )
        })
    }

    render() {
        const {renderSeriesItems} = this;
        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 2,
            responsive: [
                {
                  breakpoint: 1025,
                  settings: {
                    slidesToShow: 6,
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
                    slidesToScroll: 2,
                  }
                },
                {
                  breakpoint: 380,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                  }
                }
              ]
        };

        return (
            <>
                <Slider {...settings}>
                    {renderSeriesItems()}
                </Slider>
            </>
        )
    }
}

export default SeriesCarousel;


