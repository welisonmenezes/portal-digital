import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Breadcrumb extends Component {

    render() {
        return (
            <section className="Breadcrumb banner_area">
                <div className="banner_inner d-flex align-items-center">
                    <div className="container">
                        <div className="banner_content d-md-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-md-0">
                                <h2>{this.props.title}</h2>
                            </div>
                            <div className="page_link">
                                <Link to="/">
                                    <span>Home</span>
                                </Link>
                                <strong>{this.props.title}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Breadcrumb;
