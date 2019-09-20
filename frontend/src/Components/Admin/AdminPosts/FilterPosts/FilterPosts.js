import React, { Component } from "react";

import './FilterPosts.css';

class FilterPosts extends Component {
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
                                    className="form-control form-control-sm"
                                    placeholder="Palavra chave"
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <select className="form-control form-control-sm">
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
                            <button type="button" className="btn btn-primary btn-sm btn-block">
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
