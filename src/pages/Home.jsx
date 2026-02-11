import React from 'react';
import { HomeHero } from '../components/home/HomeHero';
import { HomeGrades } from '../components/home/HomeGrades';
import { HomeStats } from '../components/home/HomeStats';
import { HomeTestimonials } from '../components/home/HomeTestimonials';

const Home = () => {
    return (
        <div className="home-page overflow-x-hidden bg-white min-h-screen">
            <HomeHero />
            <HomeStats />
            <div className="pt-20 bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 px-4">Start your journey today</h2>
                <p className="text-lg text-gray-600 font-medium pb-8 border-b-2 border-dashed border-teal-200 inline-block mx-4">Choose your level and master mathematics step by step</p>
            </div>
            <HomeGrades />
            <HomeTestimonials />
        </div>
    );
};

export default Home;
