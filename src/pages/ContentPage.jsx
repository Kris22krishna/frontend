import PropTypes from 'prop-types';
import SEO from '../components/common/SEO';

const ContentPage = ({ topic }) => {

    // Simple mapping for display purposes - in reality, this might be dynamic or fetch data
    const topicData = {
        'learn-to-learn': { title: 'Learn to Learn', desc: 'Resources for meta-learning.' },
        'math': { title: 'Mathematics', desc: 'Mathematical concepts and tutorials.' },
        'ai': { title: 'Artificial Intelligence', desc: 'AI models, theory, and application.' }
    };

    const data = topicData[topic] || { title: 'Topic Not Found', desc: 'The requested content does not exist.' };

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <SEO title={`${data.title} - Learner's Hub`} description={data.desc} />
            <h1>{data.title}</h1>
            <p>{data.desc}</p>
        </div>
    );
};

ContentPage.propTypes = {
    topic: PropTypes.string.isRequired
};

export default ContentPage;
