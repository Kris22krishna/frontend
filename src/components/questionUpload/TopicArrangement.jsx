import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Reorder } from "framer-motion";

const TopicArrangement = () => {
    const [grade, setGrade] = useState(1);
    const [items, setItems] = useState([]); // This will be our list of categories/topics
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setMessage(null);
            try {
                // 1. Fetch Templates (source of truth for existence)
                const templatesData = await api.getQuestionTemplates();  // Ideally filtered by grade

                // 2. Fetch Config (source of truth for order)
                const configData = await api.getSyllabusConfig(grade);

                // --- Process Data ---
                // Filter templates for this grade
                const currentGradeTemplates = (templatesData.templates || []).filter(t => {
                    const grades = Array.isArray(t.grade_level) ? t.grade_level : [t.grade_level];
                    return grades.includes(grade);
                });

                // Build unique Categories -> Topics structure
                // We will just arrange Topics flatly under Categories or just Arrange Categories?
                // Request says "topics and subtopics".
                // Let's create a flat list of sortable items that represent topics.
                // Or maybe a nested structure? Simpler is Reorder.Group which is flat.
                // Let's try grouping by Category first.

                // Structure: [{ id: 'cat-Math', label: 'Math', type: 'category', children: [...] }]

                // Let's extract all unique topics and categories
                const rawItems = [];
                const seen = new Set();

                currentGradeTemplates.forEach(t => {
                    const key = `${t.category} - ${t.topic}`;
                    if (!seen.has(key)) {
                        seen.add(key);
                        rawItems.push({
                            id: key,
                            label: `${t.category} > ${t.topic}`,
                            category: t.category,
                            topic: t.topic
                        });
                    }
                });

                // If we have saved config, use it to sort/order
                let finalItems = [];
                if (configData && configData.config) {
                    const configIds = configData.config.map(c => c.id);
                    // Add items from config if they still exist in rawItems
                    configData.config.forEach(c => {
                        const exists = rawItems.find(r => r.id === c.id);
                        if (exists) {
                            finalItems.push(exists);
                        }
                    });
                    // Append new items that aren't in config
                    rawItems.forEach(r => {
                        if (!configIds.includes(r.id)) {
                            finalItems.push(r);
                        }
                    });
                } else {
                    finalItems = rawItems.sort((a, b) => a.label.localeCompare(b.label));
                }

                setItems(finalItems);
            } catch (err) {
                console.error(err);
                setMessage({ type: 'error', text: 'Failed to load data.' });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [grade]);

    const handleSave = async () => {
        setSaving(true);
        try {
            // Save the current order of items
            // We only need to save the IDs primarily, but saving full object is okay too
            const configToSave = items.map(item => ({ id: item.id }));

            await api.saveSyllabusConfig(grade, configToSave);
            setMessage({ type: 'success', text: 'Order saved successfully!' });
        } catch (err) {
            console.error(err);
            setMessage({ type: 'error', text: 'Failed to save order.' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="arrangement-container" style={{ padding: '20px' }}>
            <div className="controls" style={{ marginBottom: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div>
                    <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Select Grade:</label>
                    <select
                        value={grade}
                        onChange={(e) => setGrade(parseInt(e.target.value))}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>Grade {i + 1}</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving || loading}
                    className="save-btn"
                    style={{ background: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}
                >
                    {saving ? 'Saving...' : 'Save Order'}
                </button>
            </div>

            {message && (
                <div style={{
                    padding: '10px',
                    borderRadius: '4px',
                    marginBottom: '20px',
                    background: message.type === 'error' ? '#f8d7da' : '#d4edda',
                    color: message.type === 'error' ? '#721c24' : '#155724'
                }}>
                    {message.text}
                </div>
            )}

            {loading ? (
                <div>Loading...</div>
            ) : items.length === 0 ? (
                <p>No topics found for this grade.</p>
            ) : (
                <Reorder.Group axis="y" values={items} onReorder={setItems} style={{ listStyle: 'none', padding: 0 }}>
                    {items.map((item) => (
                        <Reorder.Item key={item.id} value={item} style={{ marginBottom: '10px' }}>
                            <div style={{
                                padding: '15px',
                                background: 'white',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                cursor: 'grab',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}>
                                <span style={{ fontWeight: '500' }}>{item.label}</span>
                                <span style={{ color: '#999' }}>☰</span>
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            )}
        </div>
    );
};

export default TopicArrangement;
