import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Dashboard extends Component {

    render() {
        return (
            <div className="Dashboard">
                <div className="row">
                    <div className="col-md-12 grid-margin">
                        <div className="d-flex justify-content-between flex-wrap">
                            <div className="d-flex align-items-end flex-wrap">
                                <div className="mr-md-3 mr-xl-5">
                                    <h2>Bem Vindo de Volta Biel</h2>
                                    <p className="mb-md-0">
                                        Confira as Atualizações abaixo{" "}
                                    </p>
                                </div>
                                <div className="d-flex">
                                    <p className="text-primary mb-0 hover-cursor">
                                        <Link to="/" target="_blank">
                                            <i className="mdi mdi-home text-muted hover-cursor" />
                                            Ver Site
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">
                                    Cadastrar Notícia
                                </h4>
                                <div className="media">
                                    <div className="media-body">
                                        <Link to="/admin/noticias/add">
                                            <button type="button" className="btn btn-primary btn-icon-text" >
                                                Cadastrar Noticia
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Cadastrar Aviso</h4>
                                <div className="media">
                                    <div className="media-body">
                                        <Link to="/admin/avisos/add">
                                            <button type="button" className="btn btn-primary btn-icon-text" >
                                                Cadastrar Aviso
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">
                                    Cadastrar Anuncio
                                </h4>
                                <div className="media">
                                    <div className="media-body">
                                        <Link to="/admin/anuncios/add">
                                            <button type="button" className="btn btn-primary btn-icon-text" >
                                                Cadastrar Anúncio
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
