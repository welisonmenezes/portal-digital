import React, { Component } from "react";

import './FilterUsers.css';

class FilterUsers extends Component {
    render() {
        return (
            <div className="FilterUsers">
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
                                    placeholder="Nome"
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <select className="form-control form-control-sm">
                                    <option value="">Permissão</option>
                                    <option value="1">Usuário</option>
                                    <option value="2">Administrador</option>
                                    <option value="3">Editor</option>
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

export default FilterUsers;
