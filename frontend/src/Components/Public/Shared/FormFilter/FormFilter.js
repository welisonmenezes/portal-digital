import React, { Component } from 'react';

class FormFilter extends Component {

    render() {
        return (
            <div className="FormFilter search-form">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>O que você deseja encontrar?</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Pesquisar..." />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <select className="form-control">
                                    <option defaultValue>Tipo</option>
                                    <option>Notícias</option>
                                    <option>Anúncios</option>
                                    <option>Avisos</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <select className="form-control">
                                    <option defaultValue>Categoria</option>
                                    <option>Sistemas de Informação</option>
                                    <option>Engenharia</option>
                                    <option>Esportes</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button type="button" className="btn btn-primary btn-block">Filtrar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormFilter;
