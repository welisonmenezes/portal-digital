import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../source/admin/vendors/mdi/css/materialdesignicons.min.css';
import '../../source/admin/vendors/base/vendor.bundle.base.css';
import '../../source/admin/vendors/datatables.net-bs4/dataTables.bootstrap4.css';
import '../../source/admin/css/style.css';
import '../../source/admin/css/custom.css';

import './Login.css';

import logo from '../../source/admin/images/logo.jpg';

class Login extends Component {

    render() {
        return (
            <div className="Login">
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
                                        <form className="pt-3">
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-lg" id="exampleInputEmail1"
                                                    placeholder="Username" />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-lg"
                                                    id="exampleInputPassword1" placeholder="Password" />
                                            </div>
                                            <div className="mt-3">
                                                <Link to="/admin">
                                                    <span className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</span>
                                                </Link>
                                            </div>
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
