import React, { Component } from 'react';
import Breadcrumb from '../Shared/Breadcrumb/Breadcrumb';
import Footer from '../Shared/Footer/Footer';
import './Contact.css';

class Contact extends Component {

    componentDidMount() {
		window.scrollTo(0, 0);
	}

    render() {
        return (
            <div className="Contact">
                <Breadcrumb title="Contato" />
                <section className="section_gap">
                    <div className="container">
                        <div className="d-none d-sm-block mb-5 pb-4">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3528.5648186669146!2d-50.319038084163644!3d-27.823163238490324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e01f22d33c54e3%3A0x1f0c82e2171ebf3b!2sUniversidade%20do%20Planalto%20Catarinense!5e0!3m2!1spt-BR!2sbr!4v1568562534328!5m2!1spt-BR!2sbr"></iframe>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <h2 className="contact-title">Envie uma mensagem</h2>
                            </div>
                            <div className="col-lg-8 mb-4 mb-lg-0">
                                <form className="form-contact contact_form" action="contact_process.php" method="post"
                                    id="contactForm" noValidate="novalidate">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <textarea className="form-control w-100" name="message" id="message" cols="30"
                                                    rows="9" placeholder="Digite sua mensagem"></textarea>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input className="form-control" name="name" id="name" type="text"
                                                    placeholder="Digite seu nome" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <input className="form-control" name="email" id="email" type="email"
                                                    placeholder="Digite seu e-mail" />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <input className="form-control" name="subject" id="subject" type="text"
                                                    placeholder="Digite o assunto" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mt-lg-3">
                                        <button type="submit" className="main_btn">Enviar mensagem</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-4">
                                <div className="media contact-info">
                                    <span className="contact-info__icon"><i className="ti-home"></i></span>
                                    <div className="media-body">
                                        <h3>Lages, Santa Catarina.</h3>
                                        <p>Av. Mal. Castelo Branco, 170 - Universitário</p>
                                    </div>
                                </div>
                                <div className="media contact-info">
                                    <span className="contact-info__icon"><i className="ti-tablet"></i></span>
                                    <div className="media-body">
                                        <h3><a href="tel:(49) 3251 1022">(49) 3251 1022</a></h3>
                                        <p>Segunda à Sexta das 8h às 22h</p>
                                    </div>
                                </div>
                                <div className="media contact-info">
                                    <span className="contact-info__icon"><i className="ti-email"></i></span>
                                    <div className="media-body">
                                        <h3><a href="mailto:uniplac@uniplaclages.br">uniplac@uniplaclages.br</a></h3>
                                        <p>Envie-nos a qualquer momento!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}

export default Contact;
