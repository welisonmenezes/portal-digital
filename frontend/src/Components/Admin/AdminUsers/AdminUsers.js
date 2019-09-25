import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import FilterUsers from './FilterUsers/FilterUsers';
import Pagination from '../Shared/Pagination/Pagination';
import Spinner from '../../Shared/Spinner/Spinner';

class AdminUsers extends Component {

	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			isLoadingData: true,
			loadDataError: '',
			users: [],
			pagination: null,
			page: 1,
			role: '',
			name: ''
		};
	}

	componentDidMount() {
		this._isMounted = true;
		window.scrollTo(0, 0);
		this.loadUsers();
		this.loadOnHistoryChange();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	getUsers() {
		this.setState({ isLoadingData: true });
		fetch(`${process.env.REACT_APP_BASE_URL}/api/user?page=${this.state.page}&role=${this.state.role}&name=${this.state.name}`, {
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
							users: data.data,
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
					console.log('getUsers: ', error);
					this.setState({
						loadDataError: 'Ocorreu um problema ao conectar com o servidor',
						isLoadingData: false
					});
				}
			});
	}

	doPaginate = (page, name, role) => {
		const searchParams = new URLSearchParams(this.props.location.search);
		searchParams.set('page', page);
		searchParams.set('name', name);
		searchParams.set('role', role);
		this.props.history.push({
			pathname: this.props.location.pathname,
			search: searchParams.toString()
		});
	}

	loadOnHistoryChange = () => {
		this.props.history.listen((location, action) => {
			setTimeout(() => {
				this.loadUsers();
			}, 1);
		});
	}

	loadUsers = () => {
		if (this._isMounted) {
			const searchParams = new URLSearchParams(this.props.location.search);
			const page = (searchParams.get('page')) ? searchParams.get('page') : 1;
			const name = (searchParams.get('name')) ? searchParams.get('name') : '';
			const role = (searchParams.get('role')) ? searchParams.get('role') : '';
			if (parseInt(page, 10)) {
				this.setState({ page, name, role, loadDataError: '' });
				setTimeout(() => {
					this.getUsers();
				}, 1);
			}
		}
	}

	render() {
		return (
			<div className="AdminUsers">
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
									<h4 className="card-title">Lista de Usuários</h4>
									<FilterUsers doFilter={(name, role) => { this.doPaginate(1, name, role) }} />
									<div className="table-responsive">
										{this.state.isLoadingData && <Spinner />}
										<table className="table table-striped">
											<thead>
												<tr>
													<th>User</th>
													<th>ID</th>
													<th>Nome</th>
													<th>Nível de Usuário</th>
													<th>Editar/Deletar </th>
												</tr>
											</thead>
											<tbody>
												{this.state.users.map(user => {
													return (<tr key={user.id}>
														<td className="py-1">
															{user.image_id &&
																<img src={process.env.REACT_APP_BASE_URL + '/api/media/' + user.image_id} alt="user avatar" />
															}
															{!user.image_id &&
																<img src={process.env.REACT_APP_BASE_URL + '/api/media/0'} alt="user avatar" />
															}
														</td>
														<td>{user.id}</td>
														<td>{user.first_name}</td>
														<td>
															<label className="badge badge-warning">
																<i className="mdi mdi-account"></i>
																{user.role}
															</label>
														</td>
														<td>
															<Link to={'/admin/usuarios/' + user.id}>
																<i className="mdi mdi-border-color edit"></i>
															</Link>
															<Link to={'/admin/usuarios/deletar/' + user.id}>
																<i className="mdi mdi-delete-forever delete"></i>
															</Link>
														</td>
													</tr>)
												})}
											</tbody>
										</table>
									</div>
									<Pagination doPaginate={(page) => { this.doPaginate(page, this.state.name, this.state.role) }} currentPage={this.state.page} pagination={this.state.pagination} />
								</div>
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}

export default AdminUsers;