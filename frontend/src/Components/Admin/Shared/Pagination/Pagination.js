import React, { Component } from "react";

class Pagination extends Component {
    render() {
        return (
            <div className="Pagination table-pagination">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary">1</button>
                    <button type="button" className="btn btn-primary">2</button>
                    <button type="button" className="btn btn-primary">3</button>
                </div>
            </div>
        );
    }
}

export default Pagination;
