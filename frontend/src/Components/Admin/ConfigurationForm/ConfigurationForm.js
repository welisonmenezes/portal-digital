import React, { Component } from 'react';

import image from '../../../source/img/banner-1.jpg'

class ConfigurationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="ConfigurationForm">
                <div className="row">
                        
                        <div className="col-md-6 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Configurações do Site</h4>
                                    <form className="forms-sample">
                                        <div className="form-group">
                                            <label>Título do Site</label>
                                            <input type="text" className="form-control" placeholder="Título do Site" />
                                        </div>
                                        <div className="form-group">
                                            <label>Descrição do Site</label>
                                            <input type="text" className="form-control" placeholder="Descrição do Site" />
                                        </div>
                                        <div className="form-group">
                                            <label>Telefone</label>
                                            <input type="text" className="form-control" placeholder="Telefone" />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email" className="form-control" placeholder="Email" />
                                        </div>
                                        <div className="form-group">
                                            <label>Endereço</label>
                                            <input type="text" className="form-control" placeholder="Endereço" />
                                        </div>
                                        <div className="form-group">
                                            <label>Horários</label>
                                            <input type="password" className="form-control" placeholder="Horários" />
                                        </div>
                                        <button type="submit" className="btn btn-primary mr-2">Enviar</button>
                                        <button type="button" className="btn btn-light">Cancelar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Imagens do banner</h4>
                                    <form className="forms-sample">
                                        <div className="form-group">
                                            <label>Adicionar Imagem</label>
                                            <input type="file" name="img[]" className="file-upload-default" />
                                            <div className="input-group">
                                                <input type="text" className="form-control file-upload-info"
                                                    placeholder="Upload Image" />
                                                <span className="input-group-append">
                                                    <button className="file-upload-browse btn btn-primary"
                                                        type="button">Upload</button>
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                    <ul className="ul-fig-banner">
                                        <li>
                                            <figure className="fig-banner">
                                                <i className="mdi mdi-close-circle"></i>
                                                <img src={image} alt="banner 1" />
                                            </figure>
                                        </li>
                                        <li>
                                            <figure className="fig-banner">
                                                <i className="mdi mdi-close-circle"></i>
                                                <img src={image}  alt="banner 2" />
                                            </figure>
                                        </li>
                                        <li>
                                            <figure className="fig-banner">
                                                <i className="mdi mdi-close-circle"></i>
                                                <img src={image}  alt="banner 3" />
                                            </figure>
                                        </li>
                                        <li>
                                            <figure className="fig-banner">
                                                <i className="mdi mdi-close-circle"></i>
                                                <img src={image}  alt="banner 4" />
                                            </figure>
                                        </li>
                                        <li>
                                            <figure className="fig-banner">
                                                <i className="mdi mdi-close-circle"></i>
                                                <img src={image}  alt="banner 5" />
                                            </figure>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                    </div>
            </div>
        );
    }
}


export default ConfigurationForm;
