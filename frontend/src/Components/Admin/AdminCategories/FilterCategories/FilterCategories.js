import React, { Component } from "react";

import './FilterCategories.css';

class FilterCategories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    doFilter = () => {
        this.props.doFilter(this.state.name);
    }

    updateInputValue = (evt) => {
        const name = evt.target.getAttribute('name');
        const value = evt.target.value;
        const obj = {};
        obj[name] = value;
        this.setState(obj);
    }

    render() {
        return (
            <div className="FilterCategories">
                <form className="formm-search">
                    <div className="row">
                        <div className="col-md-1">
                            <p className="btn">Filtro:</p>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <input
                                    name="name"
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Nome"
                                    onChange={this.updateInputValue}
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button type="button" className="btn btn-primary btn-sm btn-block" onClick={() => { this.doFilter() }}>
                                Filtrar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default FilterCategories;
