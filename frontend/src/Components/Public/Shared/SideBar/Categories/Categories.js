import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Categories extends Component {

    render() {
        return (
            <aside className="Categories single_sidebar_widget post_category_widget">
                <h4 className="widget_title">Categoria</h4>
                <ul className="list cat-list">
                    <li>
                        <Link to="/noticias" className="d-flex">
                            <p>Notícias</p>
                            <p>(43)</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/anuncios" className="d-flex">
                            <p>Anúncios</p>
                            <p>(27)</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/avisos" className="d-flex">
                            <p>Avisos</p>
                            <p>(111)</p>
                        </Link>
                    </li>
                </ul>
            </aside>
        );
    }
}

export default Categories;
