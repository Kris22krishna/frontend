import React from 'react';
import './Home.css';
import HeroBranding from '../components/home/HeroBranding';
import HeroRegistration from '../components/home/HeroRegistration';
import Testimonials from '../components/home/Testimonials';

import GradeSection from '../components/math100/GradeSection';

const Home = () => {
    return (
        <div className="home-page">
            <section className="hero">
                <div className="hero-content animate-fade-in">
                    <HeroBranding />
                    <HeroRegistration />
                </div>
            </section>

            <GradeSection />
            <Testimonials />
        </div>
    );
};

export default Home;
