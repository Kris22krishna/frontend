import { useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import '../styles/MathSelection.css'; // We'll create this

const MathSelection = () => {
    const navigate = useNavigate();
    const grades = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div className="math-selection-container">
            <SEO title="Math - Select Grade" description="Select your grade level to start learning mathematics." />

            <header className="math-header">
                <h1>Mathematics</h1>
                <p>Select your grade level</p>
            </header>

            <div className="grades-grid">
                {grades.map((grade) => (
                    <button
                        key={grade}
                        className="grade-card"
                        onClick={() => navigate(`/math/grade${grade}`)}
                    >
                        <h2>Grade {grade}</h2>
                        <span className="arrow-icon">&rarr;</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MathSelection;
