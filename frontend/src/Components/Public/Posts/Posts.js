import React, { Component } from 'react';
import FormFilter from '../Shared/FormFilter/FormFilter';
import Breadcrumb from '../Shared/Breadcrumb/Breadcrumb';

import Post from './Post/Post';
import Pagination from './Pagination/Pagination';
import SideBar from '../Shared/SideBar/SideBar';
import Footer from '../Shared/Footer/Footer';

import image_1 from '../../../source/img/blog/main-blog/m-blog-1.jpg';
import image_2 from '../../../source/img/blog/main-blog/m-blog-2.jpg';
import image_3 from '../../../source/img/blog/main-blog/m-blog-3.jpg';
import image_4 from '../../../source/img/blog/main-blog/m-blog-4.jpg';
import image_5 from '../../../source/img/blog/main-blog/m-blog-5.jpg';

class Posts extends Component {

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
			case '/noticias':
				this.setState({ title: 'Notícias', type: 'noticias' });
				break;
			case '/anuncios':
				this.setState({ title: 'Anúncios', type: 'anuncios' });
				break;
			case '/avisos':
				this.setState({ title: 'Avisos', type: 'avisos' });
				break;
			default:
				this.setState({ title: null, type: null });
				break;
		}
	}

	getPosts = () => {
		return [
			{
				id: 1,
				title: 'Ford clever bed stops your sleeping partner hogging the whole',
				description: 'Let one fifth i bring fly to divided face for bearing the divide unto seed winged divided light Forth.',
				image: image_1
			},
			{
				id: 2,
				title: 'Ford clever bed stops your sleeping partner hogging the whole',
				description: 'Let one fifth i bring fly to divided face for bearing the divide unto seed winged divided light Forth.',
				image: image_2
			},
			{
				id: 3,
				title: 'Ford clever bed stops your sleeping partner hogging the whole',
				description: 'Let one fifth i bring fly to divided face for bearing the divide unto seed winged divided light Forth.',
				image: image_3
			},
			{
				id: 4,
				title: 'Ford clever bed stops your sleeping partner hogging the whole',
				description: 'Let one fifth i bring fly to divided face for bearing the divide unto seed winged divided light Forth.',
				image: image_4
			},
			{
				id: 5,
				title: 'Ford clever bed stops your sleeping partner hogging the whole',
				description: 'Let one fifth i bring fly to divided face for bearing the divide unto seed winged divided light Forth.',
				image: image_5
			}
		];
	}

	render() {
		return (
			<div className="Posts">
				<Breadcrumb title={this.state.title} />
				<FormFilter />
				<section className="blog_area section_gap">
					<div className="container">
						<div className="row">
							<div className="col-lg-8">
								{this.getPosts().map((post) => {
									return (
										<Post key={post.id} post={post} type={this.state.type} />
									)
								})}
								<Pagination />
							</div>
							<div className="col-lg-4">
								<SideBar />
							</div>
						</div>
					</div>
				</section>
				<Footer />
			</div>
		);
	}
}

export default Posts;
