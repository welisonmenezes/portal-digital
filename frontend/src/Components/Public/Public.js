import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setMessageProtectedRoute } from '../../Redux/Actions/UserActions';

import '../../source/css/themify-icons.css';
import '../../source/css/slick-theme.css';
import '../../source/css/slick.css';
import '../../source/css/slideshow.css';
import '../../source/css/style.css';
import '../../source/css/responsive.css';
import '../../source/css/custom.css';

import Navigation from './Shared/Navigation/Navigation';

import Home from './Home/Home';
import NotFound from './NotFound/NotFound';
import Posts from './Posts/Posts';

import Single from './Single/Single';
import Contact from './Contact/Contact';

class Public extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleCloseAlert = () => {
        this.props.setMessageProtectedRoute(null);
    }

    render() {

        setTimeout(() => {
            this.props.setMessageProtectedRoute(null);
        }, 5000);

        return (
            <div className="Public main-wrap">
                <Navigation></Navigation>
                {(this.props.messageProtectedRoute) &&
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <span>{this.props.messageProtectedRoute}</span>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.handleCloseAlert}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
                <Route render={({ location }) => (
                    <TransitionGroup>
                        <CSSTransition key={location.key} classNames="fade" timeout={300} transitionAppear={true} transitionEnter={false} transitionLeave={false}>
                            <Switch location={location}>
                                <Route path="/" exact={true} component={Home} />
                                <Route path="/noticias" exact={true} component={Posts} />
                                <Route path="/noticias/:id" exact={true} component={Single} />
                                <Route path="/anuncios" exact={true} component={Posts} />
                                <Route path="/anuncios/:id" exact={true} component={Single} />
                                <Route path="/avisos" exact={true} component={Posts} />
                                <Route path="/avisos/:id" exact={true} component={Single} />
                                <Route path='/contato' exact={true} component={Contact} />
                                <Route path='*' component={NotFound} />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                )} />
            </div>
        );
    }
}

const mapStateToProps = store => ({
    messageProtectedRoute: store.userState.messageProtectedRoute
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        setMessageProtectedRoute
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Public);