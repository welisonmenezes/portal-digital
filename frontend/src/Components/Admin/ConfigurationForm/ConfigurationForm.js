import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Spinner from '../../Shared/Spinner/Spinner';

import './ConfigurationForm.css';
import UploadButton from '../Shared/UploadButton/UploadButton';

class ConfigurationForm extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isLoadingData: false,
            errorMessage: '',
            successMessage: '',
            loadDataError: '',
            configuration_id: '',
            name: '',
            phone: '',
            email: '',
            new_images: [],
            old_images: [],
            redirect: false
        };
    }

    componentDidMount() {
        this._isMounted = true;
        window.scrollTo(0, 0);
        this.getConfiguration();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getConfiguration() {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/configuration`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (this._isMounted) {
                    return res.json();
                }
            })
            .then(data => {
                if (this._isMounted) {
                    if (data.id) {
                        this.fillFormData(data);
                        if (data.images) {
                            data.images.map(image => {
                                this.state.new_images.push(image.id);
                                this.state.old_images.push(image.id);
                                return image;
                            });
                        }
                    } else {
                        this.setState({ loadDataError: data.message });
                    }
                    this.setState({ isLoadingData: false });
                }
            })
            .catch(error => {
                if (this._isMounted) {
                    console.log('getConfiguration: ', error);
                    this.setState({
                        loadDataError: 'Ocorreu um problema ao conectar com o servidor',
                        isLoadingData: false
                    });
                }
            });
    }

    fillFormData(data) {
        this.setState({
            name: data.name,
            phone: data.phone,
            email: data.email
        });
    }

    getRequestInfos() {
        return {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('Token')
            },
            body: JSON.stringify({
                'name': this.state.name,
                'phone': this.state.phone,
                'email': this.state.email,
                'new_images': this.state.new_images,
                'old_images': this.state.old_images
            })
        };
    }

    saveConfiguration = () => {
        this.setState({
            isLoading: true,
            errorMessage: null,
            successMessage: null
        });
        fetch(`${process.env.REACT_APP_BASE_URL}/api/configuration`, this.getRequestInfos())
            .then(res => {
                if (this._isMounted) {
                    if (res.status === 403) {
                        sessionStorage.removeItem('Token');
                        setTimeout(() => {
                            this.setState({ redirect: true });
                        }, 250);
                    }
                    return res.json();
                }
            })
            .then(data => {
                if (this._isMounted) {
                    window.scrollTo(0, 0);
                    if (data.configuration) {
                        this.setState({ successMessage: 'Configurações salvas com sucesso' });
                    } else if (data.message) {
                        this.setState({ errorMessage: data.message });
                    }
                    this.setState({ isLoading: false });
                }
            })
            .catch(error => {
                if (this._isMounted) {
                    console.log('saveConfiguration: ', error);
                    window.scrollTo(0, 0);
                    this.setState({
                        errorMessage: 'Ocorreu um problema ao conectar com o servidor',
                        isLoading: false
                    });
                }
            });
    }

    updateInputValue = (evt) => {
        const name = evt.target.getAttribute('name');
        const value = evt.target.value;
        const obj = {};
        obj[name] = value;
        this.setState(obj);
    }

    getUploadButtonState = (uploadButtonState) => {
        if (uploadButtonState && uploadButtonState.imageId) {
            const newImages = [...this.state.new_images];
            newImages.push(uploadButtonState.imageId);
            this.setState({ new_images: newImages });
        }
    }

    removeImage = (imageId) => {
        const newImages = [...this.state.new_images];
        const index = newImages.indexOf(imageId);
        if (index > -1) {
            newImages.splice(index, 1);
            this.setState({ new_images: newImages });
        }
    }

    render() {
        return (
            <div className="ConfigurationForm">
                {this.state.redirect && <Redirect to='/login' />}
                {this.state.isLoadingData && <Spinner />}
                {this.state.loadDataError &&
                    <div className="row">
                        <div className="col-md-12">
                            <div className="alert alert-danger" role="alert">{this.state.loadDataError}</div>
                            <button type="button" className="btn btn-primary" onClick={() => { history.back() }}>Voltar</button>
                        </div>
                    </div>
                }
                {(!this.state.isLoadingData && !this.state.loadDataError) &&
                    <div>
                        <div className="row">

                            <div className="col-md-6 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Configurações do Site</h4>
                                        {this.state.errorMessage &&
                                            <div className="alert alert-danger" role="alert">{this.state.errorMessage}</div>
                                        }
                                        {this.state.successMessage &&
                                            <div className="alert alert-success" role="alert">{this.state.successMessage}</div>
                                        }
                                        <form className="forms-sample">
                                            <div className="form-group">
                                                <label>Título do Site</label>
                                                <input type="text" name="name" className="form-control" placeholder="Título do Site" onChange={this.updateInputValue} value={this.state.name} />
                                            </div>
                                            <div className="form-group">
                                                <label>Descrição do Site</label>
                                                <input type="text" className="form-control" placeholder="Descrição do Site" />
                                            </div>
                                            <div className="form-group">
                                                <label>Telefone</label>
                                                <input type="text" name="phone" className="form-control" placeholder="Telefone" onChange={this.updateInputValue} value={this.state.phone} />
                                            </div>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="email" name="email" className="form-control" placeholder="Email" onChange={this.updateInputValue} value={this.state.email} />
                                            </div>
                                            <div className="form-group">
                                                <label>Endereço</label>
                                                <input type="text" className="form-control" placeholder="Endereço" />
                                            </div>
                                            <div className="form-group">
                                                <label>Horários</label>
                                                <input type="password" className="form-control" placeholder="Horários" />
                                            </div>
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
                                                <UploadButton getUploadButtonState={this.getUploadButtonState} />
                                            </div>
                                        </form>
                                        <ul className="ul-fig-banner">
                                            {this.state.new_images.map(image => {
                                                return (<li key={image}>
                                                    <figure className="fig-banner">
                                                        <i className="mdi mdi-close-circle" onClick={() => { this.removeImage(image) }}></i>
                                                        <img src={process.env.REACT_APP_BASE_URL + '/api/media/' + image} alt="banner" />
                                                    </figure>
                                                </li>)
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-md-12 grid-margin stretch-card text-center">
                                <div className="card">
                                    <div className="card-body">
                                        {!this.state.isLoading &&
                                            <button type="submit" className="btn btn-primary mr-2" onClick={(evt) => this.saveConfiguration(evt)}>Salvar</button>
                                        }
                                        {this.state.isLoading && <Spinner />}
                                        <button type="button" className="btn btn-light" onClick={() => { history.back() }}>Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </div>
        );
    }
}


export default ConfigurationForm;
