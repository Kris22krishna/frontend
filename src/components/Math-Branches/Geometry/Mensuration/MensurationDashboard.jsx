import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../geometry.module.css';

const MODULES = [
    { id:'introduction', path:'/geometry/mensuration/introduction', label:'Introduction', emoji:'🌍', tagline:'5W1H Exploration', desc:'6 big questions about Mensuration: what, why, who, when, where, and how.', gradFrom:'#0ea5e9', gradTo:'#38bdf8', shadow:'rgba(14,165,233,0.4)' },
    { id:'terminology', path:'/geometry/mensuration/terminology', label:'Terminology', emoji:'📖', tagline:'Key Terms & Concepts', desc:'Master the vocabulary of area, perimeter, surface area, and volume.', gradFrom:'#8b5cf6', gradTo:'#a78bfa', shadow:'rgba(139,92,246,0.4)' },
    { id:'skills', path:'/geometry/mensuration/skills', label:'Skills', emoji:'🎯', tagline:'Learn, Practice & Assess', desc:'Calculate perimeters, areas, surface areas, and volumes of 2D and 3D shapes.', gradFrom:'#f43f5e', gradTo:'#fb7185', shadow:'rgba(244,63,94,0.4)' },
];

const STATS = [{ val:'6', label:'Big Questions', color:'#0ea5e9' },{ val:'3', label:'Skills', color:'#8b5cf6' },{ val:'200+', label:'Questions', color:'#f43f5e' }];

export default function MensurationDashboard() {
    const navigate = useNavigate();
    return (
        <div className={styles.fullpage}>
            <div className={styles.left}>
                <div className={`${styles.deco} ${styles.decoA}`} /><div className={`${styles.deco} ${styles.decoB}`} /><div className={`${styles.deco} ${styles.decoC}`} />
                <div className={styles.leftContent}>
                    <button onClick={() => navigate('/geometry')} style={{background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',color:'#fff',borderRadius:50,padding:'8px 16px',fontSize:13,fontWeight:600,cursor:'pointer',marginBottom:24,display:'inline-flex',alignItems:'center',gap:6,backdropFilter:'blur(10px)'}}>← Back to Geometry</button>
                    <h1 className={styles.mainTitle}>Master<br /><span className={styles.titleAccent}>Mensuration</span></h1>
                    <p className={styles.mainSub}>Area, perimeter and volume — calculate measurements of 2D and 3D shapes with precision.</p>
                    <div className={styles.statsGrid}>{STATS.map((item) => (<div className={styles.stat} key={item.label}><span className={styles.statNum} style={{color:item.color}}>{item.val}</span><span className={styles.statLbl}>{item.label}</span></div>))}</div>
                </div>
            </div>
            <div className={styles.right}>
                <p className={styles.rightEyebrow}>Choose a topic to explore</p>
                <div className={styles.cardsCol}>{MODULES.map((m) => (<button key={m.id} className={styles.cardBtn} onClick={() => navigate(m.path)}><div className={styles.cardStrip} style={{background:`linear-gradient(180deg,${m.gradFrom},${m.gradTo})`}} /><div className={styles.cardIcon} style={{background:`linear-gradient(135deg,${m.gradFrom},${m.gradTo})`,boxShadow:`0 6px 20px ${m.shadow}`}}>{m.emoji}</div><div className={styles.cardText}><div className={styles.cardLabel} style={{color:m.gradFrom}}>{m.label}</div><div className={styles.cardTagline}>{m.tagline}</div><div className={styles.cardDesc}>{m.desc}</div></div><div className={styles.cardChevron} style={{color:m.gradFrom}}>{'>'}</div></button>))}</div>
            </div>
        </div>
    );
}