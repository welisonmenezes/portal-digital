import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import FilterCategories from './FilterCategories/FilterCategories';
import Pagination from '../Shared/Pagination/Pagination';
import Spinner from '../../Shared/Spinner/Spinner';

class AdminCategories extends Component {

	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			isLoadingData: true,
			loadDataError: '',
			categories: [],
			pagination: null,
			page: 1,
			name: ''
		};
	}

	componentDidMount() {
		this._isMounted = true;
		window.scrollTo(0, 0);
		this.loadCategories();
		this.loadOnHistoryChange();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	getCategories() {
		this.setState({ isLoadingData: true });
		fetch(`${process.env.REACT_APP_BASE_URL}/api/category?page=${this.state.page}&name=${this.state.name}`, {
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
							categories: data.data,
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
					console.log('getCategories: ', error);
					this.setState({
						loadDataError: 'Ocorreu um problema ao conectar com o servidor',
						isLoadingData: false
					});
				}
			});
	}

	doPaginate = (page, name) => {
		const searchParams = new URLSearchParams(this.props.location.search);
		searchParams.set('page', page);
		searchParams.set('name', name);
		this.props.history.push({
			pathname: this.props.location.pathname,
			search: searchParams.toString()
		});
	}

	loadOnHistoryChange = () => {
		this.props.history.listen((location, action) => {
			setTimeout(() => {
				this.loadCategories();
			}, 1);
		});
	}

	loadCategories = () => {
		if (this._isMounted) {
			const searchParams = new URLSearchParams(this.props.location.search);
			const page = (searchParams.get('page')) ? searchParams.get('page') : 1;
			const name = (searchParams.get('name')) ? searchParams.get('name') : '';
			if (parseInt(page, 10)) {
				this.setState({ page, name, loadDataError: '' });
				setTimeout(() => {
					this.getCategories();
				}, 1);
			}
		}
	}

	render() {
		return (
			<div className="AdminCategories">
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
									<h4 className="card-title">Lista de Categorias</h4>
									<FilterCategories doFilter={(name, role) => { this.doPaginate(1, name, role) }} />
									<div className="table-responsive">
										{this.state.isLoadingData && <Spinner />}
										<table className="table table-striped">
											<thead>
												<tr>
													<th>ID</th>
													<th>Nome</th>
													<th>Data</th>
													<th>Ver/Editar/Deletar</th>
												</tr>
											</thead>
											<tbody>
												{this.state.categories.map(category => {
													return (<tr key={category.id}>
														<td>{category.id}</td>
														<td>{category.name}</td>
														<td>{category.created_at}</td>
														<td>
															<Link to={'/admin/categorias/' + category.id}>
																<i className="mdi mdi-border-color edit"></i>
															</Link>
															<Link to={'/admin/categorias/deletar/' + category.id}>
																<i className="mdi mdi-delete-forever delete"></i>
															</Link>
														</td>
													</tr>)
												})}
											</tbody>
										</table>
									</div>
									<Pagination doPaginate={(page) => { this.doPaginate(page, this.state.name) }} currentPage={this.state.page} pagination={this.state.pagination} />
								</div>
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}


export default AdminCategories;
