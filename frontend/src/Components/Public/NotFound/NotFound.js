import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FormFilter from '../Shared/FormFilter/FormFilter';
import Breadcrumb from '../Shared/Breadcrumb/Breadcrumb';
import Footer from '../Shared/Footer/Footer';

import './NotFound.css';

class NotFound extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="NotFound">
                <Breadcrumb title="Página não encontrada" />
                <FormFilter />
                <section className="blog_area single-post-area section_gap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1>Página não encontrada.</h1>
                                <Link to="/">
                                    <span className="btn btn-info">Voltar para a home</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}

export default NotFound;
