import React, { Component } from 'react';
import RecentNovices from './RecentNovices/RecentNovice';
import Categories from './Categories/Categories';

class SideBar extends Component {

    render() {
        return (
            <div className="SideBar blog_right_sidebar">
                <RecentNovices />
                <Categories />
            </div>
        );
    }
}

export default SideBar;
