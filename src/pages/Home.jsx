import React from 'react';
import './Home.css';
import NewHero from '../components/home/NewHero';
import PracticeIntro from '../components/home/PracticeIntro';
import GradeGrid from '../components/home/GradeGrid';
import Testimonials from '../components/home/Testimonials';

const Home = () => {
    return (
        <div className="home-page overflow-x-hidden">
            <NewHero />
            <PracticeIntro />
            <GradeGrid />
            <Testimonials />
        </div>
    );
};

export default Home;
