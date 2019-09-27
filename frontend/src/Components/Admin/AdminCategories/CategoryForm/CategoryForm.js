import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Spinner from '../../../Shared/Spinner/Spinner';

class CategoryForm extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            currentPath: this.props.location.pathname,
            title: '',
            mode: '',
            isLoading: false,
            errorMessage: '',
            successMessage: '',
            redirect: false,
            category_id: '',
            description: '',
            name: ''
        };
    }

    componentDidMount() {
        this._isMounted = true;
        window.scrollTo(0, 0);
        this.setState({ currentPath: this.props.location.pathname });
        const regCategories = /admin\/categorias\/[0-9]/g;
        if (this.props.location.pathname === '/admin/categorias/add') {
            this.setState({
                title: 'Adicionar Categoria',
                mode: 'add'
            });
        } else if (regCategories.test(this.props.location.pathname)) {
            this.setState({
                title: 'Editar Categoria',
                mode: 'edit',
                category_id: this.props.match.params.id,
                isLoadingData: true
            });
            this.getCategory();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getCategory() {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/category/${this.props.match.params.id}`, {
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
                    console.log('getCategory: ', error);
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
            description: data.description
        });
    }

    resetCategoryState() {
        this.setState({
            redirect: false,
            isLoading: false,
            errorMessage: '',
            successMessage: '',
            description: '',
            name: ''
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
                'name': this.state.name,
                'description': this.state.description
            })
        };
    }

    saveCategory = () => {
        this.setState({
            isLoading: true,
            errorMessage: null,
            successMessage: null
        });
        const path = (this.state.mode === 'add') ? '/api/category' : '/api/category/' + this.state.category_id;
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
                            document.getElementById('categoryForm').reset();
                            this.resetCategoryState();
                        }
                        this.setState({ successMessage: 'Categoria salva com sucesso' });
                    } else if (data.message) {
                        this.setState({ errorMessage: data.message });
                    }
                    this.setState({ isLoading: false });
                }
            })
            .catch(error => {
                if (this._isMounted) {
                    console.log('saveCategory: ', error);
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

    render() {
        return (
            <div className="CategoryForm">
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
                                    <form className="forms-sample" id="categoryForm">
                                        <div className="form-group">
                                            <label>Nome</label>
                                            <input type="text" name="name" className="form-control" id="exampleInputUsername1"
                                                placeholder="Nome" onChange={this.updateInputValue} value={this.state.name} />
                                        </div>
                                        <div className="form-group">
                                            <label>Descrição</label>
                                            <input type="text" name="description" className="form-control" id="exampleInputEmail1"
                                                placeholder="Descrição" onChange={this.updateInputValue} value={this.state.description} />
                                        </div>
                                        {!this.state.isLoading &&
                                            <div className="d-inline-block">
                                                {this.state.mode === 'add' &&
                                                    <button type="submit" className="btn btn-primary mr-2" onClick={(evt) => this.saveCategory(evt)}>Enviar</button>
                                                }
                                                {this.state.mode === 'edit' &&
                                                    <button type="submit" className="btn btn-primary mr-2" onClick={(evt) => this.saveCategory(evt)}>Editar</button>
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


export default CategoryForm;
