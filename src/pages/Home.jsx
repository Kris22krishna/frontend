import React from 'react';
import './Home.css';
import HeroBranding from '../components/home/HeroBranding';
import HeroRegistration from '../components/home/HeroRegistration';

import GradeSection from '../components/math100/GradeSection';

const Home = () => {
    const [selectedRole, setSelectedRole] = React.useState(null);

    return (
        <div className="home-page">
            <section className="hero container">
                <div className="hero-content animate-fade-in">
                    <HeroBranding selectedRole={selectedRole} />
                    <HeroRegistration selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
                </div>
            </section>

            <GradeSection />
        </div>
    );
};

export default Home;
