import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import './Navbar.css';

import logo from '../../../../source/admin/images/logo.jpg';
import logoMini from '../../../../source/admin/images/logo-mini.jpg';
import avatar from '../../../../source/admin/images/faces/face5.jpg';

class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
            redirect: false
        };
    }

    handleToggleMenu = () => {
        const sideMenu = document.querySelector('.sidebar-offcanvas');
        if (sideMenu) {
            if (sideMenu.classList.contains('active')) {
                sideMenu.classList.remove('active');
            } else {
                sideMenu.classList.add('active');
            }
        }
    }

    handleIconMenu = () => {
        const body = document.querySelector('body');
        if (body) {
            if (body.classList.contains('sidebar-icon-only')) {
                body.classList.remove('sidebar-icon-only');
            } else {
                body.classList.add('sidebar-icon-only');
            }
        }
    }

    handleDropdownToggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    handleLogout = () => {
        localStorage.removeItem('token');
        //this.props.setUserLogginStatus(false);
        if (/admin*/.test(window.location.pathname)) {
            this.setState({ redirect: true });
        }
    };

    render() {
        return (
            <nav className="Navbar navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                {(this.state.redirect) && <Redirect to="/login" />}
                <div className="navbar-brand-wrapper d-flex justify-content-center">
                    <div className="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
                        <span className="navbar-brand brand-logo">
                            <img src={logo} alt="logo" />
                        </span>
                        <span className="navbar-brand brand-logo-mini">
                            <img src={logoMini} alt="logo" />
                        </span>
                        <button className="navbar-toggler navbar-toggler align-self-center" type="button"
                            data-toggle="minimize" onClick={this.handleIconMenu}>
                            <span className="mdi mdi-sort-variant"></span>
                        </button>
                    </div>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                    <ul className="navbar-nav navbar-nav-right">
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.handleDropdownToggle} className="nav-item nav-profile" tag="li">
                            <DropdownToggle className="nav-link dropdown-toggle">
                                <span>
                                    <img src={avatar} alt="profile" />
                                    <span className="nav-profile-name">Biel Steve</span>
                                </span>
                            </DropdownToggle>
                            <DropdownMenu right className="navbar-dropdown">
                                <Link to="/" target="_blank">
                                    <span className="dropdown-item">
                                        <i className="mdi mdi-home text-primary"></i> Ver Site
                                </span>
                                </Link>
                                <Link to="/admin/usuarios/1">
                                    <span className="dropdown-item">
                                        <i className="mdi mdi-account text-primary"></i> Perfil
                                    </span>
                                </Link>
                                <span className="dropdown-item" onClick={this.handleLogout}>
                                    <i className="mdi mdi-logout text-primary"></i> Sair
                                </span>
                            </DropdownMenu>
                        </Dropdown>
                    </ul>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                        data-toggle="offcanvas" onClick={this.handleToggleMenu}>
                        <span className="mdi mdi-menu"></span>
                    </button>
                </div>
            </nav >
        );
    }
}

export default Navbar;
