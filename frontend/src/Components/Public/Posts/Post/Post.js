import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="Post blog_left_sidebar">
                <article className="blog_item">
                    <div className="blog_item_img">
                        <img className="card-img rounded-0" src={this.props.post.image} alt="" />
                    </div>
                    <div className="blog_details">
                        <div className="d-inline-block">
                            <h2>{this.props.post.title}</h2>
                        </div>
                        <p>{this.props.post.description}</p>
                        <Link to={'/' + this.props.type + '/' + this.props.post.id}>
                            <span className="blog_btn">
                                Ver Mais <span className="ml-2 ti-arrow-right"></span>
                            </span>
                        </Link>
                    </div>
                </article>
            </div>
        );
    }
}


export default Post;
