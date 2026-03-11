import React from 'react';
import SEO from '../components/common/SEO';
import { SEO_CONFIG, DEFAULT_OG_IMAGE } from '../lib/seoConfig';
import { HomeHero } from '../components/home/HomeHero';
import { HomeGrades } from '../components/home/HomeGrades';
import { HomeStats } from '../components/home/HomeStats';
import { HomeRamanujan } from '../components/home/HomeRamanujan';
import { HomeVideos } from '../components/home/HomeVideos';


const Home = () => {
    return (
        <div className="home-page overflow-x-hidden bg-white min-h-screen">
            <SEO
                title={SEO_CONFIG.home.title}
                description={SEO_CONFIG.home.description}
                keywords={SEO_CONFIG.home.keywords}
                canonical={SEO_CONFIG.home.canonical}
                image={DEFAULT_OG_IMAGE}
                structuredData={SEO_CONFIG.home.structuredData}
            />
            <HomeHero />
            <HomeGrades />
            <HomeStats />
            <HomeRamanujan />
            <HomeVideos />
        </div>
    );
};

export default Home;
