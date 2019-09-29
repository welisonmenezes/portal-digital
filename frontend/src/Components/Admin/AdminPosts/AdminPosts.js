import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import FilterPosts from './FilterPosts/FilterPosts';
import Pagination from '../Shared/Pagination/Pagination';
import Spinner from '../../Shared/Spinner/Spinner';

class AdminPosts extends Component {

	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
			currentPath: this.props.location.pathname,
			title: '',
			type: '',
			redirect: false,
			isLoadingData: true,
			loadDataError: '',
			posts: [],
			pagination: null,
			page: 1,
			search: '',
			genre: '',
			category: ''
		};
	}

	componentDidMount() {
		this._isMounted = true;
		window.scrollTo(0, 0);
		this.setState({ currentPath: this.props.location.pathname });
		switch (this.props.location.pathname) {
			case '/admin/noticias':
				this.setState({
					title: 'Notícias',
					type: 'noticias',
					genre: 'news'
				});
				break;
			case '/admin/anuncios':
				this.setState({
					title: 'Anúncios',
					type: 'anuncios',
					genre: 'ads'
				});
				break;
			case '/admin/avisos':
				this.setState({
					title: 'Avisos',
					type: 'avisos',
					genre: 'novice'
				});
				break;
			default:
				this.setState({
					title: '',
					type: ''
				});
				break;
		}
		this.loadPosts();
		this.loadOnHistoryChange();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.location.pathname !== prevState.currentPath) {
			return ({currentPath: nextProps.location.pathname});
		}
		return null;
	}

	getPosts() {
		this.setState({ isLoadingData: true });
		fetch(`${process.env.REACT_APP_BASE_URL}/api/post?page=${this.state.page}&type=${this.state.genre}&category=${this.state.category}&s=${this.state.search}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json, text/plain, */*',
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
					if (data.data) {
						this.setState({
							posts: data.data,
							pagination: data.pagination
						});
					} else {
						this.setState({
							loadDataError: data.message
						});
					}
					this.setState({
						isLoadingData: false
					});
				}
			})
			.catch(error => {
				if (this._isMounted) {
					console.log('getPosts: ', error);
					this.setState({
						loadDataError: 'Ocorreu um problema ao conectar com o servidor',
						isLoadingData: false
					});
				}
			});
	}

	doPaginate = (page, category, search) => {
		const searchParams = new URLSearchParams(this.props.location.search);
		searchParams.set('page', page);
		searchParams.set('category', category);
		searchParams.set('search', search);
		this.props.history.push({
			pathname: this.props.location.pathname,
			search: searchParams.toString()
		});
	}

	loadOnHistoryChange = () => {
		this.props.history.listen((location, action) => {
			setTimeout(() => {
				this.loadPosts();
			}, 1);
		});
	}

	loadPosts = () => {
		if (this._isMounted) {
			const searchParams = new URLSearchParams(this.props.location.search);
			const page = (searchParams.get('page')) ? searchParams.get('page') : 1;
			const category = (searchParams.get('category')) ? searchParams.get('category') : '';
			const search = (searchParams.get('search')) ? searchParams.get('search') : '';
			if (parseInt(page, 10)) {
				this.setState({ page, category, search, loadDataError: '' });
				setTimeout(() => {
					this.getPosts();
				}, 1);
			}
		}
	}

	render() {
		return (
			<div className="AdminPosts">
				{this.state.redirect && <Redirect to='/login' />}
				{this.state.loadDataError &&
					<div className="row">
						<div className="col-md-12">
							<div className="alert alert-danger" role="alert">{this.state.loadDataError}</div>
							<button type="button" className="btn btn-primary" onClick={() => { history.back() }}>Voltar</button>
						</div>
					</div>
				}
				{!this.state.loadDataError &&
				<div className="row">
						<div className="col-lg-12 grid-margin stretch-card">
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">{this.state.title}</h4>
									<FilterPosts doFilter={(search, category) => { this.doPaginate(1, category, search) }}  />
									<div className="table-responsive">
										{this.state.isLoadingData && <Spinner />}
										<table className="table table-striped">
											<thead>
												<tr>
													<th>ID</th>
													<th>Noticia</th>
													<th>Data</th>
													<th>Ver/Editar/Deletar</th>
												</tr>
											</thead>
											<tbody>
												{this.state.posts.map(post => {
													return (<tr key={post.id}>
														<td>{ post.id }</td>
														<td>{ post.title }</td>
														<td>{ post.created_at }</td>
														<td>
															<Link to={'/' + this.state.type + '/' + post.id} target="_blank">
																<i className="mdi mdi-television-guide view"></i>
															</Link>
															<Link to={'/admin/' + this.state.type + '/' + post.id}>
																<i className="mdi mdi-border-color edit"></i>
															</Link>
															<i className="mdi mdi-delete-forever delete"></i>
														</td>
													</tr>)
												}) }
											</tbody>
										</table>
									</div>
									<Pagination doPaginate={(page) => { this.doPaginate(page, this.state.category, this.state.search) }} currentPage={this.state.page} pagination={this.state.pagination} />
								</div>
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}

export default AdminPosts;