import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import FilterUsers from './FilterUsers/FilterUsers';
import Pagination from '../Shared/Pagination/Pagination';
import Spinner from '../../Shared/Spinner/Spinner';

class AdminUsers extends Component {

	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			isLoadingData: true,
			loadDataError: '',
			users: [],
			page: 1,
			role: '',
			name: ''
		};
	}

	componentDidMount() {
		const searchParams = new URLSearchParams(this.props.location.search);
		const page = searchParams.get('page');
		if (page) {
			this.setState({ page });
		}
		setTimeout(() => {
			this.getUsers();
		}, 250);
	}

	getUsers() {
		fetch(`${process.env.REACT_APP_BASE_URL}/api/user?page=${this.state.page}&role=${this.state.role}&name=${this.state.name}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Authorization': sessionStorage.getItem('Token')
			}
		})
			.then(res => {
				if (res.status === 403) {
					sessionStorage.removeItem('Token');
					setTimeout(() => {
						this.setState({ redirect: true });
					}, 250);
				}
				return res.json()
			})
			.then(data => {
				if (data.data) {
					this.setState({ users: data.data });
				} else {
					this.setState({
						loadDataError: data.message
					});
				}
				this.setState({
					isLoadingData: false
				})
			})
			.catch(error => {
				console.log('getUsers: ', error);
				this.setState({
					loadDataError: 'Ocorreu um problema ao conectar com o servidor',
					isLoadingData: false
				});
			});
	}

	doPaginate = (page) => {
		if (page === this.state.page) {
			return false;
		}
		const searchParams = new URLSearchParams(this.props.location.search);
		searchParams.set('page', page);
		this.props.history.push({
			pathname: this.props.location.pathname,
			search: searchParams.toString()
		});
		this.setState({
			isLoadingData: true,
			page
		});
		setTimeout(() => {
			this.getUsers();
		}, 250);
	};

	render() {
		return (
			<div className="AdminUsers">
				{this.state.redirect &&
					<Redirect to='/login' />
				}
				{this.state.loadDataError &&
					<div className="row">
						<div className="col-md-12">
							<div className="alert alert-danger" role="alert">{this.state.loadDataError}</div>
						</div>
					</div>
				}
				{!this.state.loadDataError &&
					<div className="row">
						<div className="col-lg-12 grid-margin stretch-card">
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">Lista de Usuários</h4>
									<FilterUsers />
									<div className="table-responsive">
										{this.state.isLoadingData &&
											<Spinner />
										}
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
															<i className="mdi mdi-delete-forever delete"></i>
														</td>
													</tr>)
												})}
											</tbody>
										</table>
									</div>
									<Pagination doPaginate={this.doPaginate} currentPage={this.state.page} />
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