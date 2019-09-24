import React, { Component } from "react";

class Pagination extends Component {

    componentDidMount() { }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.currentPage !== this.props.currentPage) { }
    }

    doPaginate = (page) => {
        if (page === parseInt(this.props.currentPage, 10)) {
            return false;
        }
        this.props.doPaginate(page);
    }

    render() {
        return (
            <div className="Pagination table-pagination">
                {(this.props.pagination && this.props.pagination != null) &&
                    <div className="btn-group" role="group" aria-label="Basic example">
                        {this.props.pagination.pages.map(page => {
                            if (page) {
                                return (
                                    <button key={page} type="button" className={(parseInt(this.props.currentPage, 10) === page) ? "btn btn-primary active" : "btn btn-primary"} onClick={() => { this.doPaginate(page) }}>{page}</button>
                                );
                            } else {
                                return <span className="btn" key={Math.random()}>...</span>;
                            }
                        })}
                    </div>
                }
            </div>
        );
    }
}

export default Pagination;
