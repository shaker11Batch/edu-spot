import React from 'react';
import Banner from '../../components/Banner/Banner';
import AllPosts from '../AllPost/AllPost';
import TagsSection from './TagsSection';
import Contact from '../Contact/contact';

const Home = () => {
    return (
        <div>
           <Banner/>
           <AllPosts/>
            <TagsSection></TagsSection>
            <Contact/>
        
        </div>
    );
};

export default Home;