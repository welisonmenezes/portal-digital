import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import image_1 from '../../../../source/img/blog/main-blog/m-blog-1.jpg';
import image_2 from '../../../../source/img/blog/main-blog/m-blog-2.jpg';
import image_3 from '../../../../source/img/blog/main-blog/m-blog-3.jpg';
import image_4 from '../../../../source/img/blog/main-blog/m-blog-4.jpg';
import image_5 from '../../../../source/img/blog/main-blog/m-blog-5.jpg';

class NewsHome extends Component {

    getNews = () => {
        return [
            {
                id: 1,
                title: 'Ford clever bed stops your sleeping partner hogging the whole',
                description: 'Let one fifth i bring fly to divided face for bearing the divide unto seed winged divided light Forth.',
                image: image_1
            },
            {
                id: 2,
                title: 'Ford clever bed stops your sleeping partner hogging the whole',
                description: 'Let one fifth i bring fly to divided face for bearing the divide unto seed winged divided light Forth.',
                image: image_2
            },
            {
                id: 3,
                title: 'Ford clever bed stops your sleeping partner hogging the whole',
                description: 'Let one fifth i bring fly to divided face for bearing the divide unto seed winged divided light Forth.',
                image: image_3
            },
            {
                id: 4,
                title: 'Ford clever bed stops your sleeping partner hogging the whole',
                description: 'Let one fifth i bring fly to divided face for bearing the divide unto seed winged divided light Forth.',
                image: image_4
            },
            {
                id: 5,
                title: 'Ford clever bed stops your sleeping partner hogging the whole',
                description: 'Let one fifth i bring fly to divided face for bearing the divide unto seed winged divided light Forth.',
                image: image_5
            }
        ];
    }

    render() {
        return (
            <div className="NewsHome">
                <div className="row">
                    <div className="col">
                        <h2>Últimas Notícias</h2>
                    </div>
                </div>
                {this.getNews().map((news) => {
                    return (
                        <div className="row" key={news.id}>
                            <div className="col-md-12">
                                <div className="single-blog">
                                    <div className="thumb">
                                        <img className="img-fluid" src={news.image} alt="" />
                                    </div>
                                    <div className="short_details">
                                        <div className="d-block">
                                            <h3>{news.title}</h3>
                                        </div>
                                        <div className="text-wrap">
                                            <p>{news.description}</p>
                                        </div>
                                        <Link to={'/noticias/' + news.id}>
                                            <span className="blog_btn">
                                                Ver Mais <span className="ml-2 ti-arrow-right"></span>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/noticias">
                            <span className="btn btn-info btn-block">Ver Todas a Notícias</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsHome;
