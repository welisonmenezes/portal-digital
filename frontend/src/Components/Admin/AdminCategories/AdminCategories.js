import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FilterCategories from './FilterCategories/FilterCategories';
import Pagination from '../Shared/Pagination/Pagination';

class AdminCategories extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	getCategories = () => {
		return [
			{
				id: 1,
				name: 'Nome Categoria',
				data: '10-10-2018'
			},
			{
				id: 2,
				name: 'Nome Categoria',
				data: '10-10-2018'
			},
			{
				id: 3,
				name: 'Nome Categoria',
				data: '10-10-2018'
			},
			{
				id: 4,
				name: 'Nome Categoria',
				data: '10-10-2018'
			},
			{
				id: 5,
				name: 'Nome Categoria',
				data: '10-10-2018'
			},
			{
				id: 6,
				name: 'Nome Categoria',
				data: '10-10-2018'
			},
		];
	}

	render() {
		return (
			<div className="AdminCategories">
				<div className="row">
					<div className="col-lg-12 grid-margin stretch-card">
						<div className="card">
							<div className="card-body">
								<h4 className="card-title">Lista de Categorias</h4>
								<FilterCategories/>
								<div className="table-responsive">
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
										{ this.getCategories().map(category => {
											return (<tr key={category.id}>
												<td>{category.id}</td>
												<td>{category.name}</td>
												<td>{category.data}</td>
												<td>
													<Link to={'/admin/categorias/' + category.id}>
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


export default AdminCategories;
