import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import image_1 from '../../../../source/img/blog/main-blog/m-blog-1.jpg';
import image_2 from '../../../../source/img/blog/main-blog/m-blog-2.jpg';
import image_3 from '../../../../source/img/blog/main-blog/m-blog-3.jpg';
import image_4 from '../../../../source/img/blog/main-blog/m-blog-4.jpg';
import image_5 from '../../../../source/img/blog/main-blog/m-blog-5.jpg';


class AdsHome extends Component {

    getAds = () => {
        return [
            {
                id: 1,
                title: 'New york fashion week\'s continued the evolution',
                image: image_1
            },
            {
                id: 2,
                title: 'New york fashion week\'s continued the evolution',
                image: image_2
            },
            {
                id: 3,
                title: 'New york fashion week\'s continued the evolution',
                image: image_3
            },
            {
                id: 4,
                title: 'New york fashion week\'s continued the evolution',
                image: image_4
            },
            {
                id: 5,
                title: 'New york fashion week\'s continued the evolution',
                image: image_5
            }
        ];
    }

    render() {
        const settings = {
            lazyLoad: 'ondemand',
            autoplay: true,
            autoplaySpeed: 4000,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            pauseOnHover: false,
            pauseOnFocus: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <div className="carouse">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row justify-content-between">
                                <div className="col">
                                    <h2>Anúncios</h2>
                                </div>
                                <div className="col text-right">
                                    <Link to="/anuncios">
                                        <span className="btn btn-info btn-sm">Ver Todos</span>
                                    </Link>
                                </div>
                            </div>
                            <Slider {...settings} className="carousel">
                                {this.getAds().map((ads) => {
                                    return (
                                        <div key={ads.id}>
                                            <div className="card blog__slide text-center">
                                                <div className="blog__slide__img">
                                                    <img className="card-img rounded-0"
                                                        src={ads.image} alt="" />
                                                </div>
                                                <div className="blog__slide__content">
                                                    <h3>
                                                        <Link to={'/anuncios/' + ads.id}>
                                                            <span>New york fashion week's continued the evolution</span>
                                                        </Link>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdsHome;
