import React, { Component } from "react";

class Pagination extends Component {

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.currentPage !== this.props.currentPage) {}
    }

    doPaginate = (page) => {
        this.props.doPaginate(page);
    }
    
    render() {
        return (
            <div className="Pagination table-pagination">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className={(parseInt(this.props.currentPage, 10) === 1) ? "btn btn-primary active": "btn btn-primary"} onClick={() => { this.doPaginate(1) }}>1</button>
                    <button type="button" className={(parseInt(this.props.currentPage, 10) === 2) ? "btn btn-primary active": "btn btn-primary"} onClick={() => { this.doPaginate(2) }}>2</button>
                    <button type="button" className={(parseInt(this.props.currentPage, 10) === 3) ? "btn btn-primary active": "btn btn-primary"} onClick={() => { this.doPaginate(3) }}>3</button>
                </div>
            </div>
        );
    }
}

export default Pagination;
