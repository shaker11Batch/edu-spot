import React from 'react';
import Header from '../shared/Header/Header';
import { Outlet } from 'react-router';
import Footer from '../shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;