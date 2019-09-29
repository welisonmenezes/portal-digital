import React, { Component } from 'react';
import RichEditor from '../../Shared/RichEditor/RichEditor';
import { Redirect } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Spinner from '../../../Shared/Spinner/Spinner';
import UploadButton from '../../Shared/UploadButton/UploadButton';

class PostForm extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            currentPath: this.props.location.pathname,
            page_title: '',
            mode: '',
            isLoading: false,
            isLoadingData: false,
            errorMessage: '',
            successMessage: '',
            loadDataError: '',
            post_id: '',
            title: '',
            description: '',
            content: '',
            genre: '',
            status: 'published',
            tmp_entry_date: '',
            tmp_departure_date: '',
            entry_date: '',
            departure_date: '',
            image_id: '',
            caegory_id: '',
            user_id: '',
            redirect: false
        };
    }

    componentDidMount() {
        this._isMounted = true;
        window.scrollTo(0, 0);
        this.definePageMode();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    definePageMode() {
        this.setState({ currentPath: this.props.location.pathname });
        switch (this.props.location.pathname) {
            case '/admin/noticias/add':
                this.setState({
                    page_title: 'Cadastrar Notícia',
                    genre: 'news',
                    mode: 'add'
                });
                break;
            case '/admin/anuncios/add':
                this.setState({
                    page_title: 'Cadastrar Anúncio',
                    genre: 'ads',
                    mode: 'add'
                });
                break;
            case '/admin/avisos/add':
                this.setState({
                    page_title: 'Cadastrar Aviso',
                    genre: 'novice',
                    mode: 'add'
                });
                break;
            default:
                const regNews = /admin\/noticias\/[0-9]/g;
                const regAds = /admin\/anuncios\/[0-9]/g;
                const regNovices = /admin\/avisos\/[0-9]/g;
                if (regNews.test(this.props.location.pathname)) {
                    this.setState({
                        page_title: 'Editar Notícia',
                        genre: 'news',
                        mode: 'edit',
                        post_id: this.props.match.params.id
                    });
                    this.getPost();
                } else if (regAds.test(this.props.location.pathname)) {
                    this.setState({
                        page_title: 'Editar Anúncio',
                        genre: 'ads',
                        mode: 'edit',
                        post_id: this.props.match.params.id
                    });
                    this.getPost();
                } else if (regNovices.test(this.props.location.pathname)) {
                    this.setState({
                        page_title: 'Editar Aviso',
                        genre: 'novice',
                        mode: 'edit',
                        post_id: this.props.match.params.id
                    });
                    this.getPost();
                }
                break;
        }
    }

    getPost() {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/post/${this.props.match.params.id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('Token')
            }
        })
            .then(res => {
                if (this._isMounted) {
                    if (res.status === 403) {
                        sessionStorage.removeItem('Token');
                        setTimeout(() => {
                            this.setState({ redirect: true });
                        }, 250);
                    }
                    return res.json();
                }
            })
            .then(data => {
                if (this._isMounted) {
                    if (data.id) {
                        if (data.genre === this.state.genre) {
                            this.fillFormData(data);
                        } else {
                            this.setState({ loadDataError: 'Post não encontrado' });
                        }
                    } else {
                        this.setState({ loadDataError: data.message });
                    }
                    this.setState({ isLoadingData: false });
                }
            })
            .catch(error => {
                if (this._isMounted) {
                    console.log('getUser: ', error);
                    this.setState({
                        loadDataError: 'Ocorreu um problema ao conectar com o servidor',
                        isLoadingData: false
                    });
                }
            });
    }

    fillFormData(data) {
        this.setState({
            title: data.title,
            description: data.description,
            content: data.content,
            genre: data.genre,
            status: data.status,
            user_id: data.user_id,
            category_id: (data.category_id !== null) ? data.category_id : '',
            image_id: (data.image_id !== null) ? data.image_id : '',
            entry_date: data.entry_date,
            departure_date: data.departure_date
        });
        this.formatDateToView();
    }

    resetPostState() {
        this.setState({
            isLoading: false,
            isLoadingData: false,
            errorMessage: '',
            successMessage: '',
            loadDataError: '',
            post_id: '',
            title: '',
            description: '',
            content: '',
            genre: '',
            status: 'published',
            entry_date: '',
            departure_date: '',
            tmp_entry_date: '',
            tmp_departure_date: '',
            image_id: '',
            caegory_id: '',
            redirect: false
        });
    }

    getRequestInfos() {
        const method = (this.state.mode === 'add') ? 'POST' : 'PUT';
        return {
            method,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('Token')
            },
            body: JSON.stringify({
                'title': this.state.title,
                'description': this.state.description,
                'content': this.state.content,
                'genre': this.state.genre,
                'status': this.state.status,
                'entry_date': this.state.entry_date,
                'departure_date': this.state.departure_date,
                'image_id': this.state.image_id,
                'category_id': this.state.category_id
            })
        };
    }

    savePost = (evt) => {
        evt.preventDefault();
        if (!this.validateAndFormatDate()) {
            return false;
        }
        setTimeout(() => {
            this.setState({
                isLoading: true,
                errorMessage: null,
                successMessage: null
            });
            const path = (this.state.mode === 'add') ? '/api/post' : '/api/post/' + this.state.post_id;
            fetch(`${process.env.REACT_APP_BASE_URL}${path}`, this.getRequestInfos())
                .then(res => {
                    if (this._isMounted) {
                        if (res.status === 403) {
                            sessionStorage.removeItem('Token');
                            setTimeout(() => {
                                this.setState({ redirect: true });
                            }, 250);
                        }
                        return res.json();
                    }
                })
                .then(data => {
                    if (this._isMounted) {
                        window.scrollTo(0, 0);
                        if (data.id) {
                            if (this.state.mode === 'add') {
                                document.getElementById('postForm').reset();
                                document.querySelector('.file-upload-info').setAttribute('value', '');
                                this.resetPostState();
                            }
                            this.setState({ successMessage: 'Post salvo com sucesso' });
                        } else if (data.message) {
                            this.setState({ errorMessage: data.message });
                        }
                        this.setState({ isLoading: false });
                    }
                })
                .catch(error => {
                    if (this._isMounted) {
                        console.log('savePost: ', error);
                        window.scrollTo(0, 0);
                        this.setState({
                            errorMessage: 'Ocorreu um problema ao conectar com o servidor',
                            isLoading: false
                        });
                    }
                });
        }, 10);
    }

    validateAndFormatDate() {
        this.setState({ errorMessage: '' });
        const regDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
        if (this.state.tmp_entry_date && this.state.tmp_entry_date.match(regDate)) {
            const arrEntryDate = this.state.tmp_entry_date.split('/');
            const newEntryDate = arrEntryDate[2] + '-' + arrEntryDate[1] + '-' + arrEntryDate[0];
            this.setState({ entry_date: newEntryDate });
        } else {
            this.setState({ errorMessage: 'Data de entrada inválida' });
            window.scrollTo(0, 0);
            return false;
        }
        if (this.state.tmp_departure_date && this.state.tmp_departure_date.match(regDate)) {
            const arrDepartureDate = this.state.tmp_departure_date.split('/');
            const newDepartureDate = arrDepartureDate[2] + '-' + arrDepartureDate[1] + '-' + arrDepartureDate[0];
            this.setState({ departure_date: newDepartureDate });
        } else {
            this.setState({ errorMessage: 'Data de saída inválida' });
            window.scrollTo(0, 0);
            return false;
        }
        return true;
    }

    formatDateToView() {
        const regDate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
        if (this.state.entry_date && this.state.entry_date.match(regDate)) {
            const arrEntryDate = this.state.entry_date.split('-');
            const newEntryDate = arrEntryDate[2] + '/' + arrEntryDate[1] + '/' + arrEntryDate[0];
            this.setState({tmp_entry_date: newEntryDate});
        }
        if (this.state.departure_date && this.state.departure_date.match(regDate)) {
            const arrDepartureDate = this.state.departure_date.split('-');
            const newDepartureDate = arrDepartureDate[2] + '/' + arrDepartureDate[1] + '/' + arrDepartureDate[0];
            this.setState({tmp_departure_date: newDepartureDate});
        }
    }

    updateInputValue = (evt) => {
        const name = evt.target.getAttribute('name');
        const value = evt.target.value;
        const obj = {};
        obj[name] = value;
        this.setState(obj);
    }

    getUploadButtonState = (uploadButtonState) => {
        this.setState({ image_id: uploadButtonState.imageId });
    }

    removeImage = () => {
        this.setState({ image_id: '' });
    }

    getEditorValue = (value) => {
        this.setState({ content: value });
    }

    render() {
        return (
            <div className="PostForm">
                {this.state.redirect && <Redirect to='/login' />}
                {this.state.isLoadingData && <Spinner />}
                {this.state.loadDataError &&
                    <div className="row">
                        <div className="col-md-12">
                            <div className="alert alert-danger" role="alert">{this.state.loadDataError}</div>
                            <button type="button" className="btn btn-primary" onClick={() => { history.back() }}>Voltar</button>
                        </div>
                    </div>
                }
                {(!this.state.isLoadingData && !this.state.loadDataError) &&
                    <div className="row">
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">{this.state.page_title}</h4>
                                    {this.state.errorMessage &&
                                        <div className="alert alert-danger" role="alert">{this.state.errorMessage}</div>
                                    }
                                    {this.state.successMessage &&
                                        <div className="alert alert-success" role="alert">{this.state.successMessage}</div>
                                    }
                                    <form className="forms-sample" id="postForm">
                                        <div className="form-group">
                                            <label>Título</label>
                                            <input type="text" name="title" className="form-control" onChange={this.updateInputValue} value={this.state.title} />
                                        </div>
                                        <div className="form-group">
                                            <label>Descrição</label>
                                            <textarea name="description" className="form-control" onChange={this.updateInputValue} value={this.state.description}></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label>Conteúdo</label>
                                            <RichEditor parentGettingTheEditorValue={this.getEditorValue} text={this.state.content}></RichEditor>
                                        </div>
                                        <div className="form-group">
                                            <label>Imagem de Destaque</label>
                                            <UploadButton getUploadButtonState={this.getUploadButtonState} id="FeatureImage" />
                                        </div>
                                        {this.state.image_id &&
                                            <div className="form-group">
                                                <figure className="previewImage">
                                                    <i className="mdi mdi-close-circle" onClick={this.removeImage}></i>
                                                    <img src={process.env.REACT_APP_BASE_URL + '/api/media/' + this.state.image_id} alt="Post Destaque" />
                                                </figure>
                                            </div>
                                        }
                                        <div className="form-group">
                                            <label className="">Categoria</label>
                                            <select name="category_id" className="form-control" onChange={this.updateInputValue} value={this.state.category_id}>
                                                <option value="">Selecione</option>
                                                <option value="1">Catetoria 01</option>
                                                <option value="2">Catetoria 02</option>
                                                <option value="3">Catetoria 03</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="">Data de Entrada</label>
                                            <InputMask mask="99/99/9999" maskChar="" name="tmp_entry_date" className="form-control" onChange={this.updateInputValue} value={this.state.tmp_entry_date} />
                                        </div>
                                        <div className="form-group">
                                            <label className="">Data de Saída</label>
                                            <InputMask mask="99/99/9999" maskChar="" name="tmp_departure_date" className="form-control" onChange={this.updateInputValue} value={this.state.tmp_departure_date} />
                                        </div>
                                        {!this.state.isLoading &&
                                            <div className="d-inline-block">
                                                {this.state.mode === 'add' &&
                                                    <button type="submit" className="btn btn-primary mr-2" onClick={(evt) => this.savePost(evt)}>Salvar</button>
                                                }
                                                {this.state.mode === 'edit' &&
                                                    <button type="submit" className="btn btn-primary mr-2" onClick={(evt) => this.savePost(evt)}>Editar</button>
                                                }
                                            </div>
                                        }
                                        {this.state.isLoading && <Spinner />}
                                        <button type="button" className="btn btn-light" onClick={() => { history.back() }}>Cancelar</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </div>
        );
    }
}

export default PostForm;