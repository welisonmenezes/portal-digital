import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Spinner from '../../../Shared/Spinner/Spinner';
import UploadButton from '../../Shared/UploadButton/UploadButton';

class UserForm extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            currentPath: this.props.location.pathname,
            title: '',
            mode: '',
            isLoading: false,
            isLoadingData: false,
            errorMessage: '',
            successMessage: '',
            loadDataError: '',
            user_id: '',
            first_name: '',
            last_name: '',
            registry: '',
            password: '',
            role: '',
            email: '',
            phone: '',
            image_id: '',
            redirect: false
        };
    }

    componentDidMount() {
        this._isMounted = true;
        window.scrollTo(0, 0);
        this.setState({ currentPath: this.props.location.pathname });
        const regUsers = /admin\/usuarios\/[0-9]/g;
        if (this.props.location.pathname === '/admin/usuarios/add') {
            this.setState({
                title: 'Adicionar Usuário',
                mode: 'add'
            });
        } else if (regUsers.test(this.props.location.pathname)) {
            this.setState({
                title: 'Editar Usuário',
                mode: 'edit',
                user_id: this.props.match.params.id,
                isLoadingData: true
            });
            this.getUser();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getUser() {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/user/${this.props.match.params.id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('Token')
            }
        })
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
                    if (data.id) {
                        this.fillFormData(data);
                    } else {
                        this.setState({ loadDataError: data.message });
                    }
                    this.setState({ isLoadingData: false });
                }
            })
            .catch(error => {
                if (this._isMounted) {
                    console.log('getUser: ', error);
                    this.setState({
                        loadDataError: 'Ocorreu um problema ao conectar com o servidor',
                        isLoadingData: false
                    });
                }
            });
    }

    fillFormData(data) {
        this.setState({
            first_name: data.first_name,
            last_name: data.last_name,
            registry: data.registry,
            role: data.role,
            email: data.email,
            phone: data.phone,
            image_id: (data.image_id !== null) ? data.image_id : ''
        });
    }

    resetUserState() {
        this.setState({
            redirect: false,
            isLoading: false,
            errorMessage: '',
            successMessage: '',
            first_name: '',
            last_name: '',
            registry: '',
            password: '',
            role: '',
            email: '',
            phone: '',
            image_id: ''
        });
    }

    getRequestInfos() {
        const method = (this.state.mode === 'add') ? 'POST' : 'PUT';
        return {
            method,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('Token')
            },
            body: JSON.stringify({
                'first_name': this.state.first_name,
                'last_name': this.state.last_name,
                'registry': this.state.registry,
                'password': this.state.password,
                'role': this.state.role,
                'email': this.state.email,
                'phone': this.state.phone,
                'image_id': this.state.image_id,
            })
        };
    }

    saveUser = () => {
        this.setState({
            isLoading: true,
            errorMessage: null,
            successMessage: null
        });
        const path = (this.state.mode === 'add') ? '/api/user' : '/api/user/' + this.state.user_id;
        fetch(`${process.env.REACT_APP_BASE_URL}${path}`, this.getRequestInfos())
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
                    if (data.id) {
                        if (this.state.mode === 'add') {
                            document.getElementById('userForm').reset();
                            document.querySelector('.file-upload-info').setAttribute('value','');
                            this.resetUserState();
                        }
                        this.setState({ successMessage: 'Usuário salvo com sucesso' });
                    } else if (data.message) {
                        this.setState({ errorMessage: data.message });
                    }
                    this.setState({ isLoading: false });
                }
            })
            .catch(error => {
                if (this._isMounted) {
                    console.log('saveUser: ', error);
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
        this.setState({ image_id: uploadButtonState.imageId });
    }

    removeImage = () => {
        this.setState({ image_id: '' });
    }

    render() {
        return (
            <div className="UserForm">
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
                    <div className="row">
                        <div className="col-md-6 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">{this.state.title}</h4>
                                    {this.state.errorMessage &&
                                        <div className="alert alert-danger" role="alert">{this.state.errorMessage}</div>
                                    }
                                    {this.state.successMessage &&
                                        <div className="alert alert-success" role="alert">{this.state.successMessage}</div>
                                    }
                                    <form className="forms-sample" id="userForm">
                                        <div className="form-group">
                                            <label>Nome</label>
                                            <input type="text" name="first_name" className="form-control" placeholder="Nome" onChange={this.updateInputValue} value={this.state.first_name} />
                                        </div>
                                        <div className="form-group">
                                            <label>Sobrenome</label>
                                            <input type="text" name="last_name" className="form-control" placeholder="Sobrenome" onChange={this.updateInputValue} value={this.state.last_name} />
                                        </div>
                                        <div className="form-group">
                                            <label>Matrícula</label>
                                            <InputMask mask="999999" maskChar="" name="registry" className="form-control" placeholder="Matrícula" onChange={this.updateInputValue} value={this.state.registry} />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email" name="email" className="form-control" placeholder="Email" onChange={this.updateInputValue} value={this.state.email} />
                                        </div>
                                        <div className="form-group">
                                            <label>Telefone</label>
                                            <InputMask mask="(99) 9999-99999" maskChar="" name="phone" className="form-control" placeholder="Telefone" onChange={this.updateInputValue} value={this.state.phone} />
                                        </div>
                                        <div className="form-group">
                                            <label>Senha</label>
                                            <input type="password" name="password" className="form-control" placeholder="Senha" onChange={this.updateInputValue} />
                                        </div>
                                        <div className="form-group">
                                            <label className="">Nível de Permissão</label>
                                            <select className="form-control" name="role" onChange={this.updateInputValue} value={this.state.role}>
                                                <option>Selecione</option>
                                                <option value="admin">Administrador</option>
                                                <option value="editor">Editor</option>
                                                <option value="author">Autor</option>
                                                <option value="user">Usuário</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Avatar</label>
                                            <UploadButton getUploadButtonState={this.getUploadButtonState} />
                                        </div>
                                        {this.state.image_id &&
                                            <div className="form-group">
                                                <figure className="previewImage">
                                                    <i className="mdi mdi-close-circle" onClick={this.removeImage}></i>
                                                    <img src={process.env.REACT_APP_BASE_URL + '/api/media/' + this.state.image_id} alt="User Avatar" />
                                                </figure>
                                            </div>
                                        }
                                        {!this.state.isLoading &&
                                            <div className="d-inline-block">
                                                {this.state.mode === 'add' &&
                                                    <button type="submit" className="btn btn-primary mr-2" onClick={(evt) => this.saveUser(evt)}>Enviar</button>
                                                }
                                                {this.state.mode === 'edit' &&
                                                    <button type="submit" className="btn btn-primary mr-2" onClick={(evt) => this.saveUser(evt)}>Editar</button>
                                                }
                                            </div>
                                        }
                                        {this.state.isLoading && <Spinner />}
                                        <button type="button" className="btn btn-light" onClick={() => { history.back() }}>Cancelar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default UserForm;