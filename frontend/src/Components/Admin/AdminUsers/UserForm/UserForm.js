import React, { Component } from 'react';
import Spinner from '../../../Shared/Spinner/Spinner';

class UserForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPath: this.props.location.pathname,
            title: null,
            isLoading: false,
            errorMessage: null,
            successMessage: null,
            first_name: null,
            last_name: null,
            registry: null,
            password: null,
            role: null,
            email: null,
            phone: null,
            image_id: ''
        };
    }

    componentDidMount() {
		window.scrollTo(0, 0);
		this.setState({ currentPath: this.props.location.pathname });
		const regUsers = /admin\/usuarios\/[0-9]/g;
        if (this.props.location.pathname === '/admin/usuarios/add') {
            this.setState({ title: 'Adicionar Usuário' });
        } else if (regUsers.test(this.props.location.pathname)) {
            this.setState({ title: 'Editar Usuário' });
        }
    }

    resetUserState() {
        this.setState({
            isLoading: false,
            errorMessage: null,
            successMessage: null,
            first_name: null,
            last_name: null,
            registry: null,
            password: null,
            role: null,
            email: null,
            phone: null,
            image_id: ''
        });
    }


    saveUser = () => {
        this.setState({ isLoading: true });
        this.setState({errorMessage: null});
        this.setState({successMessage: null});
        fetch(`${process.env.REACT_APP_BASE_URL}/api/user`, {
            method: 'post',
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
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                window.scrollTo(0, 0);
                if (data.id) {
                    document.getElementById('userForm').reset();
                    this.resetUserState();
                    this.setState({successMessage: 'Usuário salvo com sucesso'});
                } else if (data.message) {
                    this.setState({errorMessage: data.message});
                }
                this.setState({ isLoading: false });
            })
            .catch(error => {
                window.scrollTo(0, 0);
                this.setState({errorMessage: 'Ocorreu um problema ao conectar com o servidor'});
                this.setState({ isLoading: false });
            });
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
            <div className="UserForm">
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
                                        <input type="text" name="first_name" className="form-control" placeholder="Nome" onChange={this.updateInputValue} />
                                    </div>
                                    <div className="form-group">
                                        <label>Sobrenome</label>
                                        <input type="text" name="last_name" className="form-control" placeholder="Sobrenome" onChange={this.updateInputValue} />
                                    </div>
                                    <div className="form-group">
                                        <label>Matrícula</label>
                                        <input type="text" name="registry" className="form-control" placeholder="Matrícula" onChange={this.updateInputValue} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" name="email" className="form-control" placeholder="Email" onChange={this.updateInputValue} />
                                    </div>
                                    <div className="form-group">
                                        <label>Telefone</label>
                                        <input type="text" name="phone" className="form-control" placeholder="Telefone" onChange={this.updateInputValue} />
                                    </div>
                                    <div className="form-group">
                                        <label>Senha</label>
                                        <input type="password" name="password" className="form-control" placeholder="Senha" onChange={this.updateInputValue} />
                                    </div>
                                    <div className="form-group">
                                        <label className="">Nível de Permissão</label>
                                        <select className="form-control" name="role" onChange={this.updateInputValue}>
                                            <option>Selecione</option>
                                            <option value="admin">Administrador</option>
                                            <option value="editor">Editor</option>
                                            <option value="author">Autor</option>
                                            <option value="user">Usuário</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Avatar</label>
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
                                    {!this.state.isLoading &&
                                        <button type="submit" className="btn btn-primary mr-2" onClick={(evt) => this.saveUser(evt)}>Enviar</button>
                                    }
                                    {this.state.isLoading &&
                                        <Spinner />
                                    }
                                    <button type="button" className="btn btn-light">Cancelar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default UserForm;
