import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import image from '../../../source/admin/images/faces/face1.jpg';
import FilterUsers from './FilterUsers/FilterUsers';
import Pagination from '../Shared/Pagination/Pagination';

class AdminUsers extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	getUsers = () => {
		return [
			{
				id: 1,
				name: 'Fulano da Silva',
				role: 'Editor'
			},
			{
				id: 2,
				name: 'Fulano da Silva',
				role: 'Editor'
			},
			{
				id: 3,
				name: 'Fulano da Silva',
				role: 'Editor'
			},
			{
				id: 4,
				name: 'Fulano da Silva',
				role: 'Editor'
			},
			{
				id: 5,
				name: 'Fulano da Silva',
				role: 'Editor'
			},
			{
				id: 6,
				name: 'Fulano da Silva',
				role: 'Editor'
			}
		];
	}

	render() {
		return (
			<div className="AdminUsers">
				<div className="row">
					<div className="col-lg-12 grid-margin stretch-card">
						<div className="card">
							<div className="card-body">
								<h4 className="card-title">Lista de Usuários</h4>
								<FilterUsers/>
								<div className="table-responsive">
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
										{ this.getUsers().map(user => {
											return (<tr key={user.id}>
												<td className="py-1">
													<img src={image} alt="user avatar" />
												</td>
												<td>{user.id}</td>
												<td>{user.name}</td>
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
											}) }
										</tbody>
									</table>
								</div>
								<Pagination />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default AdminUsers;
