import { useState } from 'react';
import { api } from '../../services/api';
import { RefreshCw } from 'lucide-react';
import PropTypes from 'prop-types';

const TemplatePreview = ({ template, onClose }) => {
    const [previewData, setPreviewData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [parameters, setParameters] = useState('{}');

    const handlePreview = async () => {
        setLoading(true);
        try {
            let params = {};
            try {
                params = JSON.parse(parameters);
            } catch (e) {
                alert('Invalid JSON parameters');
                setLoading(false);
                return;
            }

            const data = await api.previewQuestionTemplate(template.id, params);
            setPreviewData(data);
        } catch (err) {
            alert('Preview failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="preview-modal-overlay">
            <div className="preview-modal">
                <div className="modal-header">
                    <h3>Preview: {template.name || template.id}</h3>
                    <button onClick={onClose} className="close-btn">&times;</button>
                </div>

                <div className="preview-body">
                    <div className="preview-params">
                        <label>Test Parameters (JSON):</label>
                        <textarea
                            value={parameters}
                            onChange={(e) => setParameters(e.target.value)}
                            rows={3}
                        />
                        <button onClick={handlePreview} disabled={loading} className="refresh-btn">
                            <RefreshCw size={16} /> Refresh Preview
                        </button>
                    </div>

                    <div className="preview-result">
                        {loading ? (
                            <div className="loading-spinner">Generating preview...</div>
                        ) : previewData ? (
                            <div className="rendered-question">
                                <h4>Rendered Question:</h4>
                                <pre className="json-display">{JSON.stringify(previewData, null, 2)}</pre>
                                {/* Later we can implement actual React rendering of the question here if we have a renderer component */}
                            </div>
                        ) : (
                            <div className="placeholder-text">Click refresh to see preview</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

TemplatePreview.propTypes = {
    template: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

export default TemplatePreview;
