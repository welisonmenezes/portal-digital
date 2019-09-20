import React, { Component } from 'react';

class UserForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPath: this.props.location.pathname,
			title: null
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

    render() {
        return (
            <div className="UserForm">
                <div className="row">
                    <div className="col-md-6 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">{this.state.title}</h4>
                                <form className="forms-sample">
                                    <div className="form-group">
                                        <label>Nome</label>
                                        <input type="text" className="form-control" placeholder="Nome" />
                                    </div>
                                    <div className="form-group">
                                        <label>Sobrenome</label>
                                        <input type="text" className="form-control" placeholder="Sobrenome" />
                                    </div>
                                    <div className="form-group">
                                        <label>Matrícula</label>
                                        <input type="text" className="form-control" placeholder="Matrícula" />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" className="form-control" placeholder="Email" />
                                    </div>
                                    <div className="form-group">
                                        <label>Telefone</label>
                                        <input type="text" className="form-control" placeholder="Telefone" />
                                    </div>
                                    <div className="form-group">
                                        <label>Senha</label>
                                        <input type="password" className="form-control" placeholder="Senha" />
                                    </div>
                                    <div className="form-group">
                                        <label className="">Nível de Permissão</label>
                                        <select className="form-control">
                                            <option>Nível 01</option>
                                            <option>Nível 02</option>
                                            <option>Nível 03</option>
                                            <option>Nível 04</option>
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
                                    <button type="submit" className="btn btn-primary mr-2">Enviar</button>
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
