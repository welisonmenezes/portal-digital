import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import 'dotenv';

import '../../source/admin/vendors/mdi/css/materialdesignicons.min.css';
import '../../source/admin/vendors/base/vendor.bundle.base.css';
import '../../source/admin/vendors/datatables.net-bs4/dataTables.bootstrap4.css';
import '../../source/admin/css/style.css';
import '../../source/admin/css/custom.css';

import './Login.css';

import logo from '../../source/admin/images/logo.jpg';
import Spinner from '../Shared/Spinner/Spinner';
import IsLoggedIn from '../../Utils/IsLoggedIn';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            errorMessage: null,
            redirect: false,
            registry: null,
            password: null
        };
    }

    doLogin = () => {
        this.setState({ isLoading: true });
        this.setState({errorMessage: null});
        fetch(`${process.env.REACT_APP_BASE_URL}/api/auth`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'registry': this.state.registry,
                'password': this.state.password
            })
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                if (data.token) {
                    sessionStorage.setItem('Token', data.token);
                    setTimeout(() => {
                        this.setState({redirect: true});
                    }, 250);
                } else if (data.message) {
                    this.setState({errorMessage: data.message});
                    this.setState({ isLoading: false });
                }
            })
            .catch(error => {
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
        console.log(process.env.REACT_APP_BASE_URL)
        return (
            <div className="Login">
                {this.state.redirect &&
                    <Redirect to='/admin' />
                }
                {IsLoggedIn() &&
                    <Redirect to='/admin' />
                }
                <div className="container-scroller">
                    <div className="container-fluid page-body-wrapper full-page-wrapper">
                        <div className="content-wrapper d-flex align-items-center auth px-0">
                            <div className="row w-100 mx-0">
                                <div className="col-lg-4 mx-auto">
                                    <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                        <div className="brand-logo">
                                            <img src={logo} alt="logo" />
                                        </div>
                                        <h4>Faça seu login</h4>
                                        {this.state.errorMessage &&
                                            <div className="alert alert-danger" role="alert">{this.state.errorMessage}</div>
                                        }
                                        <form className="pt-3">
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-lg" name="registry"
                                                    placeholder="Matricula" onChange={this.updateInputValue} />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-lg"
                                                    name="password" placeholder="Senha" onChange={this.updateInputValue} />
                                            </div>
                                            {!this.state.isLoading &&
                                                <div className="mt-3">
                                                    <button type="button" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={(evt) => this.doLogin(evt)}>SIGN IN</button>
                                                </div>
                                            }
                                            {this.state.isLoading &&
                                                <Spinner />
                                            }
                                            <div className="my-2 d-flex justify-content-between align-items-center">
                                                <Link to="/">
                                                    <span className="auth-link text-black">Voltar pro site</span>
                                                </Link>
                                                <a href="#" className="auth-link text-black">Forgot password?</a>
                                            </div>
                                        </form>
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

export default Login;
