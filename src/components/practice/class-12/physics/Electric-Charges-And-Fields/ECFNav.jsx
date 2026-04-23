import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ecf.module.css';

const BASE = '/senior/grade/12/physics/electric-charges-and-fields';

const TABS = [
    { id: 'connectomics', label: '🔗 Connectomics', path: `${BASE}/connectomics` },
    { id: 'intro',        label: '🌟 Intro',        path: `${BASE}/introduction` },
    { id: 'terminology',  label: '📖 Terminology',  path: `${BASE}/terminology` },
    { id: 'skills',       label: '🎯 Skills',       path: `${BASE}/skills` },
    { id: 'exam-edge',    label: '🚩 Exam Edge',    path: `${BASE}/exam-edge` },
];

/**
 * Shared ECF navigation bar used on every sub-page.
 *
 * Props:
 *   activeTab  – one of: 'intro' | 'terminology' | 'skills' | 'connectomics' | 'exam-edge'
 *   backLabel  – text for the back button (default: '← Dashboard')
 *   onBack     – optional override for back click; defaults to navigate(BASE)
 *   extraLinks – optional array of { label, onClick } for sub-views (Learn / Practice / Assess)
 */
export default function ECFNav({ activeTab, backLabel = '← Dashboard', onBack, extraLinks }) {
    const navigate = useNavigate();
    const handleBack = onBack ?? (() => navigate(BASE));

    return (
        <nav className={styles['ecf-nav']}>
            <button className={styles['ecf-nav-back']} onClick={handleBack}>
                {backLabel}
            </button>

            <div className={styles['ecf-nav-links']}>
                {/* Main chapter tabs */}
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => navigate(tab.path)}
                        className={`${styles['ecf-nav-link']}${activeTab === tab.id ? ` ${styles['ecf-nav-link--active']}` : ''}`}
                    >
                        {tab.label}
                    </button>
                ))}

                {/* Optional sub-view links (e.g. Learn / Practice / Assess) */}
                {extraLinks && extraLinks.length > 0 && (
                    <>
                        <span style={{ width: 1, background: '#e2e8f0', alignSelf: 'stretch', margin: '0 4px' }} />
                        {extraLinks.map((lnk, i) => (
                            <button
                                key={i}
                                onClick={lnk.onClick}
                                className={`${styles['ecf-nav-link']}${lnk.active ? ` ${styles['ecf-nav-link--active']}` : ''}`}
                            >
                                {lnk.label}
                            </button>
                        ))}
                    </>
                )}
            </div>
        </nav>
    );
}
