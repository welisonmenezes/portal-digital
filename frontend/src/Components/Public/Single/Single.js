import React, { Component } from 'react';
import FormFilter from '../Shared/FormFilter/FormFilter';
import Breadcrumb from '../Shared/Breadcrumb/Breadcrumb';
import SideBar from '../Shared/SideBar/SideBar';
import Footer from '../Shared/Footer/Footer';
import Detail from './Detail';

class Single extends Component {

    componentDidMount() {
		window.scrollTo(0, 0);
	}

    render() {
        return (
            <div className="Single">
                <Breadcrumb title="Notícias" />
                <FormFilter />
                <section className="blog_area single-post-area section_gap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 posts-list">
                                <Detail />
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

export default Single;
