import React, { Component } from 'react';
import BannerHome from './BannerHome/BannerHome';
import FormFilter from '../Shared/FormFilter/FormFilter';
import AdsHome from './AdsHome/AdsHome';
import NewsHome from './NewsHome/NewsHome';
import SideBar from '../Shared/SideBar/SideBar';
import Footer from '../Shared/Footer/Footer';

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentImage: null,
			uploadError: null,
			loadingImage: false
		};
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<div className="Home">
				<BannerHome />
				<FormFilter />
				<AdsHome />
				<section className="blog-area section-gap">
					<div className="container">
						<div className="row">
							<div className="col-lg-8">
								<NewsHome />
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

export default Home;
