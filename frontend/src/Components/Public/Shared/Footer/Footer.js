import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
            <footer className="Footer footer-area section_gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 single-footer-widget">
                            <h4>Menu Principal</h4>
                            <ul>
                                <li>
                                    <a href="index.html">Home</a>
                                </li>
                                <li>
                                    <a href="news.html">Notícias</a>
                                </li>
                                <li>
                                    <a href="ad.html">Anúnicios</a>
                                </li>
                                <li>
                                    <a href="novice.html">Avisos</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 single-footer-widget">
                            <h4>Outros Links</h4>
                            <ul>
                                <li>
                                    <a href="contact.html">Contato</a>
                                </li>
                                <li>
                                    <a href="https://moodle.uniplac.net/" target="_blank">Moodle Uniplac</a>
                                </li>
                                <li>
                                    <a href="https://portal.uniplaclages.edu.br/corpore.net/Login.aspx" target="_blank">Portal Uniplac</a>
                                </li>
                                <li>
                                    <a href="https://www.uniplaclages.edu.br/" target="_blank">Site Uniplac</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 single-footer-widget">
                            <h4>Principais Categorias</h4>
                            <ul>
                                <li><a href="news.html">Esportes</a></li>
                                <li><a href="news.html">Engenharia</a></li>
                                <li><a href="news.html">Sistema de Informação</a></li>
                                <li><a href="news.html">Eventos</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 single-footer-widget">
                            <h4>Sobre nós</h4>
                            <p>You can trust us. we only send promo</p>
                            <p>Fone: (49) 3251 1022</p>
                            <p>email: uniplac@uniplaclages.br</p>
                        </div>
                    </div>
                    <div className="footer-bottom row align-items-center">
                        <p className="footer-text m-0 col-lg-8 col-md-12">
                            Copyright &copy; All rights reserved | <b>Uniplac Lages</b>
                        </p>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
