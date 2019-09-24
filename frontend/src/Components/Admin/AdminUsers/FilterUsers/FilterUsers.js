import React, { Component } from "react";

import './FilterUsers.css';

class FilterUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            role: ''
        };
    }

    componentDidMount() {}

    doFilter = () => {
        this.props.doFilter(this.state.name, this.state.role);
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
            <div className="FilterUsers">
                <form className="formm-search">
                    <div className="row">
                        <div className="col-md-1">
                            <p className="btn">Filtro:</p>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <input name="name" type="text" className="form-control form-control-sm" placeholder="Nome" onChange={this.updateInputValue} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <select name="role" className="form-control form-control-sm" onChange={this.updateInputValue}>
                                    <option value="">Selecione</option>
                                    <option value="admin">Administrador</option>
                                    <option value="editor">Editor</option>
                                    <option value="author">Autor</option>
                                    <option value="user">Usuário</option>
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

export default FilterUsers;
