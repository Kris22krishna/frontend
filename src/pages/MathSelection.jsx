import { useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import '../styles/MathSelection.css'; // We'll create this

const MathSelection = () => {
    const navigate = useNavigate();

    // Config for the classes/grades
    const classes = [
        { id: 'lkg', label: 'LKG', color: 'teal', icon: '🕒' },
        { id: 'ukg', label: 'UKG', color: 'green', icon: 'ⓤ' },
        { id: '1', label: 'Class 1', color: 'yellow' },
        { id: '2', label: 'Class 2', color: 'orange' },
        { id: '3', label: 'Class 3', color: 'red' },
        { id: '4', label: 'Class 4', color: 'purple-dark' },
        { id: '5', label: 'Class 5', color: 'lime' },
        { id: '6', label: 'Class 6', color: 'teal-dark' },
        { id: '7', label: 'Class 7', color: 'bronze' },
        { id: '8', label: 'Class 8', color: 'purple' },
        { id: '9', label: 'Class 9', color: 'blue' },
        { id: '10', label: 'Class 10', color: 'red-dark' },
    ];

    return (
        <div className="math-selection-container">
            <SEO title="Math - Select Grade" description="Select your grade level to start learning mathematics." />

            <div className="logo-watermark">Math100.AI</div>

            <header className="math-header">
                <h1>Mathematics</h1>
                <p>Choose your class level</p>
            </header>

            <div className="grades-grid-wrapper">
                <div className="grades-grid">
                    {classes.map((cls) => (
                        <button
                            key={cls.id}
                            className={`grade-button ${cls.color}`}
                            onClick={() => navigate(`/math/grade${cls.id}`)}
                        >
                            <div className="button-content">
                                {cls.icon && <span className="grade-icon">{cls.icon}</span>}
                                <span className="grade-label">{cls.label}</span>
                            </div>
                            <div className="button-arrow"></div>
                        </button>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default MathSelection;
