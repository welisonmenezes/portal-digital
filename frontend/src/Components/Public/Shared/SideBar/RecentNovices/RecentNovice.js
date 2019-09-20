import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import image_1 from '../../../../../source/img/blog/main-blog/m-blog-1.jpg';
import image_2 from '../../../../../source/img/blog/main-blog/m-blog-2.jpg';
import image_3 from '../../../../../source/img/blog/main-blog/m-blog-3.jpg';
import image_4 from '../../../../../source/img/blog/main-blog/m-blog-4.jpg';
import image_5 from '../../../../../source/img/blog/main-blog/m-blog-5.jpg';

class RecentNovices extends Component {

    getNovices = () => {
        return [
            {
                id: 1,
                title: 'Ford clever bed stops your sleeping partner hogging the whole',
                image: image_1
            },
            {
                id: 2,
                title: 'Ford clever bed stops your sleeping partner hogging the whole',
                image: image_2
            },
            {
                id: 3,
                title: 'Ford clever bed stops your sleeping partner hogging the whole',
                image: image_3
            },
            {
                id: 4,
                title: 'Ford clever bed stops your sleeping partner hogging the whole',
                image: image_4
            },
            {
                id: 5,
                title: 'Ford clever bed stops your sleeping partner hogging the whole',
                image: image_5
            }
        ];
    }

    render() {
        return (
            <aside className="RecentNovices single_sidebar_widget popular_post_widget">
                <h3 className="widget_title">Avisos Recentes</h3>
                {this.getNovices().map((novice) => {
                    return (
                        <div className="media post_item" key={novice.id}>
                            <img src={novice.image} alt="post" />
                            <div className="media-body">
                                <h3>{novice.title}</h3>
                                <Link to={'/avisos/' + novice.id}>
                                    <span className="blog_btn">
                                        Ver Mais <span className="ml-2 ti-arrow-right"></span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    )
                })}
                <div className="action">
                    <Link to="/avisos">
                        <span className="btn btn-info btn-sm btn-block">Ver todos</span>
                    </Link>
                </div>
            </aside>
        );
    }
}

export default RecentNovices;
