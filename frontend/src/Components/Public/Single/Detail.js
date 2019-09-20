import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import image_1 from '../../../source/img/blog/main-blog/m-blog-1.jpg';

class Detail extends Component {

    render() {
        return (
            <div className="Detail">
                <div className="single-post">
                    <div className="feature-img">
                        <img className="img-fluid" src={image_1} alt="" />
                    </div>
                    <div className="blog_details">
                        <h2>Second divided from form fish beast made every of seas
                                    all gathered us saying he our</h2>
                        <ul className="blog-info-link mt-3 mb-4">
                            <li>
                                <span><i className="ti-user"></i> Por Admin</span>
                            </li>
                            <li>
                                <Link to="/noticias">
                                    <span>Categoria</span>
                                </Link>
                            </li>
                        </ul>
                        <p className="excert">
                            MCSE boot camps have its supporters and its detractors. Some people do not
                            understand
                            why you should
                            have to spend money on boot camp when you can get the MCSE study materials yourself
                            at a
                            fraction of the
                            camp price. However, who has the willpower

                                </p>
                        <p>
                            MCSE boot camps have its supporters and its detractors. Some people do not
                            understand
                            why you should
                            have to spend money on boot camp when you can get the MCSE study materials yourself
                            at a
                            fraction of the
                            camp price. However, who has the willpower to actually sit through a self-imposed
                            MCSE
                            training. who has
                            the willpower to actually
                                </p>
                        <div className="quote-wrapper">
                            <div className="quotes">
                                MCSE boot camps have its supporters and its detractors. Some people do not
                                understand why you should
                                have to spend money on boot camp when you can get the MCSE study materials
                                yourself
                                at a fraction of
                                the camp price. However, who has the willpower to actually sit through a
                                self-imposed MCSE training.
                                    </div>
                        </div>
                        <p>
                            MCSE boot camps have its supporters and its detractors. Some people do not
                            understand
                            why you should
                            have to spend money on boot camp when you can get the MCSE study materials yourself
                            at a
                            fraction of the
                            camp price. However, who has the willpower

                                </p>
                        <p>
                            MCSE boot camps have its supporters and its detractors. Some people do not
                            understand
                            why you should
                            have to spend money on boot camp when you can get the MCSE study materials yourself
                            at a
                            fraction of the
                            camp price. However, who has the willpower to actually sit through a self-imposed
                            MCSE
                            training. who has
                            the willpower to actually
                                </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Detail;
