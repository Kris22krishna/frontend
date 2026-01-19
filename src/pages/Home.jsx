import SEO from '../components/common/SEO';
import InteractiveBlock from '../components/common/InteractiveBlock';
import '../styles/Home.css'; // We'll create this

const Home = () => {
    const blocks = [
        {
            title: 'Learn to Learn',
            description: 'Master the art of meta-learning. Techniques to absorb and retain knowledge faster.',
            path: '/learn-to-learn',
            color: '#FF6B6B'
        },
        {
            title: 'Math',
            description: 'Explore the beauty of numbers, geometry, and calculus.',
            path: '/math',
            color: '#4ECDC4'
        },
        {
            title: 'AI',
            description: 'Dive into the world of Artificial Intelligence and Machine Learning.',
            path: '/ai',
            color: '#45B7D1'
        }
    ];

    return (
        <div className="home-container">
            <SEO title="Home - Learner's Hub" description="Welcome to the ultimate learning resource." />

            <section className="hero-section">
                <h1>Unlock Your Potential</h1>
                <p>Select a path to begin your journey</p>
            </section>

            <section className="blocks-grid">
                {blocks.map((block) => (
                    <InteractiveBlock
                        key={block.title}
                        title={block.title}
                        description={block.description}
                        path={block.path}
                        color={block.color}
                    />
                ))}
            </section>
        </div>
    );
};

export default Home;
