import React, { Component } from 'react';
import RichEditor from '../../Shared/RichEditor/RichEditor';

class PostForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
			currentPath: this.props.location.pathname,
			title: null,
			type: null
		};
    }

    componentDidMount() {
		window.scrollTo(0, 0);
		this.setState({ currentPath: this.props.location.pathname });
		switch (this.props.location.pathname) {
			case '/admin/noticias/add':
				this.setState({ title: 'Cadastrar Notícia', type: 'noticias' });
                break;
			case '/admin/anuncios/add':
				this.setState({ title: 'Cadastrar Anúncio', type: 'anuncios' });
				break;
			case '/admin/avisos/add':
				this.setState({ title: 'Cadastrar Aviso', type: 'avisos' });
				break;
			default:
                const regNews = /admin\/noticias\/[0-9]/g;
                const regAds = /admin\/anuncios\/[0-9]/g;
                const regNovices = /admin\/avisos\/[0-9]/g;
                if (regNews.test(this.props.location.pathname)) {
                    this.setState({ title: 'Editar Notícia', type: 'noticias' });
                } else if (regAds.test(this.props.location.pathname)) {
                    this.setState({ title: 'Editar Anúncio', type: 'anuncios' });
                } else if (regNovices.test(this.props.location.pathname)) {
                    this.setState({ title: 'Editar Aviso', type: 'avisos' });
                }
				break;
		}
	}

    render() {
        return (
            <div className="PostForm">
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">{this.state.title}</h4>
                                <form className="forms-sample">
                                    <div className="form-group">
                                        <label>Título</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Descrição</label>
                                        <textarea className="form-control"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Conteúdo</label>
                                        <RichEditor></RichEditor>
                                    </div>
                                    <div className="form-group">
                                        <label>Imagem de Destaque</label>
                                        <input type="file" name="img[]" className="file-upload-default" />
                                        <div className="input-group">
                                            <input type="text" className="form-control file-upload-info"
                                                placeholder="Upload Image" />
                                            <span className="input-group-append">
                                                <button className="file-upload-browse btn btn-primary"
                                                    type="button">Upload</button>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="">Categoria</label>
                                        <select className="form-control">
                                            <option>Catetoria 01</option>
                                            <option>Catetoria 02</option>
                                            <option>Catetoria 03</option>
                                            <option>Catetoria 04</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary mr-2">Salvar</button>
                                    <button type="button" className="btn btn-light">Cancelar</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}


export default PostForm;
