import React, { Component } from "react";

import './FilterPosts.css';

class FilterPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            category: ''
        };
    }

    doFilter = () => {
        this.props.doFilter(this.state.search, this.state.category);
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
            <div className="FilterPosts">
                <form className="formm-search">
                    <div className="row">
                        <div className="col-md-1">
                            <p className="btn">Filtro:</p>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="search"
                                    className="form-control form-control-sm"
                                    placeholder="Palavra chave"
                                    onChange={this.updateInputValue}
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <select name="category" className="form-control form-control-sm" onChange={this.updateInputValue}>
                                    <option value="">Categoria</option>
                                    <option value="1">
                                        Sistemas de Informação
                                    </option>
                                    <option value="2">Engenharia</option>
                                    <option value="3">Esportes</option>
                                </select>
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

export default FilterPosts;
