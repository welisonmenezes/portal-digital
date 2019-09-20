import React, { Component } from 'react';

class Pagination extends Component {

    render() {
        return (
            <nav className="Pagination blog-pagination justify-content-center d-flex">
                <ul className="pagination">
                    <li className="page-item">
                        <a href="#" className="page-link" aria-label="Previous">
                            <span aria-hidden="true">
                                <span className="ti-arrow-left"></span>
                            </span>
                        </a>
                    </li>
                    <li className="page-item">
                        <a href="#" className="page-link">1</a>
                    </li>
                    <li className="page-item active">
                        <a href="#" className="page-link">2</a>
                    </li>
                    <li className="page-item">
                        <a href="#" className="page-link" aria-label="Next">
                            <span aria-hidden="true">
                                <span className="ti-arrow-right"></span>
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Pagination;
