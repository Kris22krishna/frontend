import React from 'react';
import { HomeHero } from '../components/home/HomeHero';
import { HomeGrades } from '../components/home/HomeGrades';
import { HomeStats } from '../components/home/HomeStats';
import { HomeTestimonials } from '../components/home/HomeTestimonials';

const Home = () => {
    return (
        <div className="home-page overflow-x-hidden bg-white min-h-screen">
            <HomeHero />
            <HomeGrades />
            <HomeStats />
            <HomeTestimonials />
        </div>
    );
};

export default Home;
