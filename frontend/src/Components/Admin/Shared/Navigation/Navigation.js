import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './Navigation.css';

import { setUserLogginStatus } from '../../../../Redux/Actions/UserActions';

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            menuStatus: {
                news: false,
                ads: false,
                novices: false,
                users: false,
                categories: false,
                configurations: false
            },
            inputVal: null
        };
    }

    componentDidMount() {
        this.hoverableCollapse();
    }

    toggle = (item) => {
        let obj = { menuStatus: {
            news: false,
            ads: false,
            novices: false,
            users: false,
            categories: false,
            configurations: false
        } };
        obj.menuStatus[item] = !this.state.menuStatus[item];
        this.setState({ menuStatus: obj.menuStatus });
    }

    hoverableCollapse = () => {
        const els = document.querySelectorAll('.sidebar .nav-item');
        if (els && els.length) {
            els.forEach(el => {
                ['mouseenter', 'mouseleave'].forEach(evt => {
                    el.addEventListener(evt, () => {
                        const body = document.querySelector('body');
                        const sidebarIconOnly = body.classList.contains('sidebar-icon-only');
                        if (!('ontouchstart' in document.documentElement)) {
                            if (sidebarIconOnly) {
                                if (evt === 'mouseenter') {
                                    el.classList.add('hover-open');
                                } else {
                                    el.classList.remove('hover-open');
                                }
                            }
                        }
                    }, false)
                });
            });
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
            <nav className="Navigation sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink to="/admin" className="nav-link" onClick={this.preventClickOnCurrentPage}>
                            <i className="mdi mdi-home menu-icon"></i>
                            <span className="menu-title">Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link" onClick={() => { this.toggle('news') }}>
                            <i className="mdi mdi-newspaper menu-icon"></i>
                            <span className="menu-title">Notícias</span>
                            <i className="menu-arrow"></i>
                        </span>
                        <Collapse isOpen={this.state.menuStatus.news}>
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <NavLink to="/admin/noticias" onClick={this.preventClickOnCurrentPage}>
                                        <span className="nav-link" >Ver Todos</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/admin/noticias/add" onClick={this.preventClickOnCurrentPage}>
                                        <span className="nav-link" >Adicionar Novo</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link" onClick={() => { this.toggle('ads') }}>
                            <i className="mdi mdi-bullhorn menu-icon"></i>
                            <span className="menu-title">Anúncios</span>
                            <i className="menu-arrow"></i>
                        </span>
                        <Collapse isOpen={this.state.menuStatus.ads}>
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <NavLink to="/admin/anuncios" onClick={this.preventClickOnCurrentPage}>
                                        <span className="nav-link" >Ver Todos</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/admin/anuncios/add" onClick={this.preventClickOnCurrentPage}>
                                        <span className="nav-link" >Adicionar Novo</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link" onClick={() => { this.toggle('novices') }}>
                            <i className="mdi mdi-sim-alert menu-icon"></i>
                            <span className="menu-title">Avisos</span>
                            <i className="menu-arrow"></i>
                        </span>
                        <Collapse isOpen={this.state.menuStatus.novices}>
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <NavLink to="/admin/avisos" onClick={this.preventClickOnCurrentPage}>
                                        <span className="nav-link" >Ver Todos</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/admin/avisos/add" onClick={this.preventClickOnCurrentPage}>
                                        <span className="nav-link" >Adicionar Novo</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link" onClick={() => { this.toggle('users') }}>
                            <i className="mdi mdi-account menu-icon"></i>
                            <span className="menu-title">Usuários</span>
                            <i className="menu-arrow"></i>
                        </span>
                        <Collapse isOpen={this.state.menuStatus.users}>
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <NavLink to="/admin/usuarios" onClick={this.preventClickOnCurrentPage}>
                                        <span className="nav-link" >Ver Todos</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/admin/usuarios/add" onClick={this.preventClickOnCurrentPage}>
                                        <span className="nav-link" >Adicionar Novo</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link" onClick={() => { this.toggle('categories') }}>
                            <i className="mdi mdi-tag menu-icon"></i>
                            <span className="menu-title">Categorias</span>
                            <i className="menu-arrow"></i>
                        </span>
                        <Collapse isOpen={this.state.menuStatus.categories}>
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <NavLink to="/admin/categorias" onClick={this.preventClickOnCurrentPage}>
                                        <span className="nav-link" >Ver Todos</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/admin/categorias/add" onClick={this.preventClickOnCurrentPage}>
                                        <span className="nav-link" >Adicionar Novo</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </Collapse>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin/configuracoes" className="nav-link" onClick={this.preventClickOnCurrentPage}>
                            <i className="mdi mdi-settings menu-icon"></i>
                            <span className="menu-title">Configurações</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
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
