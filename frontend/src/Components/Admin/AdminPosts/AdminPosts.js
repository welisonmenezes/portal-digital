import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FilterPosts from './FilterPosts/FilterPosts';
import Pagination from '../Shared/Pagination/Pagination';

class AdminPosts extends Component {

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
			case '/admin/noticias':
				this.setState({ title: 'Notícias', type: 'noticias' });
				break;
			case '/admin/anuncios':
				this.setState({ title: 'Anúncios', type: 'anuncios' });
				break;
			case '/admin/avisos':
				this.setState({ title: 'Avisos', type: 'avisos' });
				break;
			default:
				this.setState({ title: null, type: null });
				break;
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.location.pathname !== prevState.currentPath) {
			return ({currentPath: nextProps.location.pathname});
		}
		return null;
	}

	getPosts = () => {
		return [
			{
				id: 1,
				title: 'Ford clever bed stops your sleeping partner hogging the whole',
				data: '10-10-2001'
			},
			{
				id: 2,
				title: 'Ford clever bed stops your sleeping partner hogging the whole',
				data: '10-10-2001'
			},
			{
				id: 3,
				title: 'Ford clever bed stops your sleeping partner hogging the whole',
				data: '10-10-2001'
			},
			{
				id: 4,
				title: 'Ford clever bed stops your sleeping partner hogging the whole',
				data: '10-10-2001'
			},
			{
				id: 5,
				title: 'Ford clever bed stops your sleeping partner hogging the whole',
				data: '10-10-2001'
			},
			{
				id: 6,
				title: 'Ford clever bed stops your sleeping partner hogging the whole',
				data: '10-10-2001'
			},
		];
	}

	render() {
		return (
			<div className="AdminPosts">
				<div className="row">
						<div className="col-lg-12 grid-margin stretch-card">
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">{this.state.title}</h4>
									<FilterPosts />
									<div className="table-responsive">
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
												{ this.getPosts().map(post => {
													return (<tr key={post.id}>
														<td>{ post.id }</td>
														<td>{ post.title }</td>
														<td>{ post.data }</td>
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
									<Pagination />
								</div>
							</div>
						</div>
					</div>
			</div>
		);
	}
}


export default AdminPosts;
