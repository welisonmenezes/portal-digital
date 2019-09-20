import React, { Component } from 'react';
import { Link, Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { NavbarToggler, Collapse } from 'reactstrap';

import { setUserLogginStatus } from '../../../../Redux/Actions/UserActions';
import Logo from '../../../../source/img/logo.png';

import './Navigation.css';

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            isOpen: false
        };
    }

    componentDidMount() {
        this.navBarFixed();
    }

    handleLogout = () => {
        localStorage.removeItem('token');
        this.props.setUserLogginStatus(false);
        if (/admin*/.test(window.location.pathname)) {
            this.setState({ redirect: true });
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    navBarFixed = () => {
        const header = document.querySelector('.header_area');
        if (header) {
            window.onscroll = function(oEvent) {
                const scroll = window.scrollY;
                if (scroll >= 100) {
                    header.classList.add('navbar_fixed');
                } else {
                    header.classList.remove('navbar_fixed');
                }
            }
        }
    }

    preventClickOnCurrentPage = (e) => {
        if (e.target.parentElement) {
            const tagA = e.target.parentElement;
            const link = tagA.getAttribute('href');
            if (link === window.location.pathname) {
                e.preventDefault();
            }
        }
    }

    render() {
        return (
            <header className="Navigation header_area">
                {(this.state.redirect) && <Redirect to="/admin" />}
                <div className="top_menu">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="float-left">
                                    <p>Fone: (49) 3251 1022</p>
                                    <p>email: uniplac@uniplaclages.br</p>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="float-right">
                                    <ul className="right_side">
                                        <li>
                                            <NavLink to="/contato" activeClassName="active" exact onClick={this.preventClickOnCurrentPage}>
                                                <span>Contato</span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main_menu">
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-light w-100">
                            <NavLink to="/" onClick={this.preventClickOnCurrentPage} className="navbar-brand logo_h">
                                <img src={Logo} alt="logo" />
                            </NavLink>
                            <NavbarToggler onClick={this.toggle} className={this.state.isOpen ? 'collapsed' : ''}>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </NavbarToggler>
                            <Collapse isOpen={this.state.isOpen} navbar id="navbarSupportedContent">
                                <div className="row w-100 mr-0 justify-content-center">
                                    <div className="col-lg-10 pr-0">
                                        <ul className="nav navbar-nav center_nav pull-right justify-content-center">
                                            <li className="nav-item">
                                                <NavLink to="/" activeClassName="active" exact onClick={this.preventClickOnCurrentPage}>
                                                    <span className="nav-link">Home</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/noticias" activeClassName="active" exact onClick={this.preventClickOnCurrentPage}>
                                                    <span className="nav-link">Notícias</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/anuncios" activeClassName="active" exact onClick={this.preventClickOnCurrentPage}>
                                                    <span className="nav-link">Anúncios</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item last">
                                                <NavLink to="/avisos" activeClassName="active" exact onClick={this.preventClickOnCurrentPage}>
                                                    <span className="nav-link">Avisos</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item show-992">
                                                <NavLink to="/contato" activeClassName="active" exact onClick={this.preventClickOnCurrentPage}>
                                                    <span className="nav-link">Contato</span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-2 pr-0 text-right">
                                        {(this.props.isUserLoggedin) &&
                                            <Link to="/admin">
                                                <span className="icons">
                                                    <i className="ti-user fa-lg"></i>Admin
                                                    </span>
                                            </Link>
                                        }
                                        {(this.props.isUserLoggedin) &&
                                            <span className="icons" onClick={this.handleLogout}>
                                                <i className="ti-user fa-lg"></i>Logout
                                                    </span>
                                        }
                                        {(!this.props.isUserLoggedin) &&
                                            <NavLink to="/login" activeClassName="active">
                                                <span className="icons">
                                                    <i className="ti-user fa-lg"></i>Login
                                                        </span>
                                            </NavLink>
                                        }
                                    </div>
                                </div>
                            </Collapse>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }

}

const mapStateToProps = store => ({
    isUserLoggedin: store.userState.isUserLoggedin
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        setUserLogginStatus
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
