import React from 'react';
import { HomeHero } from '../components/home/HomeHero';
import { HomeGrades } from '../components/home/HomeGrades';
import { HomeStats } from '../components/home/HomeStats';
import { HomeRamanujan } from '../components/home/HomeRamanujan';
import { HomeVideos } from '../components/home/HomeVideos';


const Home = () => {
    return (
        <div className="home-page overflow-x-hidden bg-white min-h-screen">
            <HomeHero />
            <HomeGrades />
            <HomeStats />
            <HomeRamanujan />
            <HomeVideos />
        </div>
    );
};

export default Home;
