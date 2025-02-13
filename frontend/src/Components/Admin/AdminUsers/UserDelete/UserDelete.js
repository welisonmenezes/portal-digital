import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './UserDelete.css';
import Spinner from '../../../Shared/Spinner/Spinner';

class UserDelete extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            isLoading: false,
            errorMessage: null,
            successMessage: null,
            user_id: ''
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({ user_id: this.props.match.params.id });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    deleteUser = () => {
        this.setState({
            isLoading: true,
            errorMessage: null,
            successMessage: null
        });
        const path = '/api/user/' + this.state.user_id;
        fetch(`${process.env.REACT_APP_BASE_URL}${path}`, {
            method: 'DELETE',
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
                    window.scrollTo(0, 0);
                    if (data.id) {
                        this.setState({ successMessage: 'Usuário deletado com sucesso' });
                    } else if (data.message) {
                        this.setState({ errorMessage: data.message });
                    }
                    this.setState({ isLoading: false });
                }
            })
            .catch(error => {
                if (this._isMounted) {
                    console.log('deleteUser: ', error);
                    window.scrollTo(0, 0);
                    this.setState({
                        errorMessage: 'Ocorreu um problema ao conectar com o servidor',
                        isLoading: false
                    });
                }
            });
    }

    render() {
        return (
            <div className="UserDelete">
                {this.state.redirect && <Redirect to='/login' />}
                {this.state.errorMessage &&
                    <div className="row">
                        <div className="col-md-12">
                            <div className="alert alert-danger" role="alert">{this.state.errorMessage}</div>
                        </div>
                    </div>
                }
                {this.state.successMessage &&
                    <div className="row">
                        <div className="col-md-12">
                            <div className="alert alert-success" role="alert">{this.state.successMessage}</div>
                            <button type="button" className="btn btn-secondary" title="Cancelar" onClick={() => { history.back() }}>Voltar</button>
                        </div>
                    </div>
                }
                {!this.state.successMessage &&
                    <div className="row">
                        <div className="col-md-6">
                            <h4>Deseja realmente deletar o usuário {this.state.user_id}?</h4>
                            <hr />
                            {this.state.isLoading && <Spinner />}
                            {!this.state.isLoading &&
                                <div>
                                    <button type="button" className="btn btn-danger" onClick={(evt) => this.deleteUser(evt)}>Excluir</button>
                                    <button type="button" className="btn btn-secondary" title="Cancelar" onClick={() => { history.back() }}>Cancelar</button>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default UserDelete;
