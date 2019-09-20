import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import '../../source/admin/vendors/mdi/css/materialdesignicons.min.css';
import '../../source/admin/vendors/base/vendor.bundle.base.css';
import '../../source/admin/vendors/datatables.net-bs4/dataTables.bootstrap4.css';
import '../../source/admin/css/style.css';
import '../../source/admin/css/custom.css';

import Navigation from './Shared/Navigation/Navigation';
import PrivateRouter from '../../Utils/PrivateRouter';

import Dashboard from './Dashboard/Dashboard';
import AdminPosts from './AdminPosts/AdminPosts';
import PostForm from './AdminPosts/PostForm/PostForm';
import AdminUsers from './AdminUsers/AdminUsers';
import UserForm from './AdminUsers/UserForm/UserForm';
import ConfigurationForm from './ConfigurationForm/ConfigurationForm';

import NotFound from '../Public/NotFound/NotFound';
import Navbar from './Shared/Navbar/Navbar';

import './Admin.css';
import AdminCategories from './AdminCategories/AdminCategories';
import CategoryForm from './AdminCategories/CategoryForm/CategoryForm';

class Admin extends Component {

    render() {
        return (
            <div className="Admin container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Navigation />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <Route render={({ location }) => (
                                <TransitionGroup>
                                    <CSSTransition key={location.key} classNames="fade" timeout={300} transitionAppear={true} transitionEnter={false} transitionLeave={false}>
                                        <Switch location={location}>
                                            <PrivateRouter path='/admin' exact={true} component={Dashboard} permissions={['admin']} />

                                            <PrivateRouter path='/admin/noticias' exact={true} component={AdminPosts} permissions={['admin']} />
                                            <PrivateRouter path='/admin/noticias/add' exact={true} component={PostForm} permissions={['admin']} />
                                            <PrivateRouter path='/admin/noticias/:id' exact={true} component={PostForm} permissions={['admin']} />

                                            <PrivateRouter path='/admin/anuncios' exact={true} component={AdminPosts} permissions={['admin']} />
                                            <PrivateRouter path='/admin/anuncios/add' exact={true} component={PostForm} permissions={['admin']} />
                                            <PrivateRouter path='/admin/anuncios/:id' exact={true} component={PostForm} permissions={['admin']} />

                                            <PrivateRouter path='/admin/avisos' exact={true} component={AdminPosts} permissions={['admin']} />
                                            <PrivateRouter path='/admin/avisos/add' exact={true} component={PostForm} permissions={['admin']} />
                                            <PrivateRouter path='/admin/avisos/:id' exact={true} component={PostForm} permissions={['admin']} />

                                            <PrivateRouter path='/admin/usuarios' exact={true} component={AdminUsers} permissions={['admin']} />
                                            <PrivateRouter path='/admin/usuarios/add' exact={true} component={UserForm} permissions={['admin']} />
                                            <PrivateRouter path='/admin/usuarios/:id' exact={true} component={UserForm} permissions={['admin']} />

                                            <PrivateRouter path='/admin/categorias' exact={true} component={AdminCategories} permissions={['admin']} />
                                            <PrivateRouter path='/admin/categorias/add' exact={true} component={CategoryForm} permissions={['admin']} />
                                            <PrivateRouter path='/admin/categorias/:id' exact={true} component={CategoryForm} permissions={['admin']} />

                                            <PrivateRouter path='/admin/configuracoes' exact={true} component={ConfigurationForm} permissions={['admin']} />

                                            <Route path='*' component={NotFound} />
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup>
                            )} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;
