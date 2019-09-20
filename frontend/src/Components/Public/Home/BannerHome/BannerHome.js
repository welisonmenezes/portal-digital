import React, { Component } from 'react';
import Slider from 'react-slick';

import bg_1 from '../../../../source/img/banner-1.jpg';
import bg_2 from '../../../../source/img/banner-2.jpg';

class BannerHome extends Component {

    render() {
        const settings = {
            lazyLoad: 'ondemand',
            arrows: false,
            autoplay: true,
            autoplaySpeed: 4000,
            infinite: true,
            fade: false,
            pauseOnHover: false,
            pauseOnFocus: false
        };
        return (
            <section className="BannerHome">
                <div className="wrapper">
                    <Slider {...settings} className="slideshow">
                        <div className="slideshow-item">
                            <div style={{ backgroundImage: `url(${bg_1})` }}></div>
                        </div>
                        <div className="slideshow-item">
                            <div style={{ backgroundImage: `url(${bg_2})` }}></div>
                        </div>
                    </Slider>
                </div>
            </section>
        );
    }
}

export default BannerHome;
