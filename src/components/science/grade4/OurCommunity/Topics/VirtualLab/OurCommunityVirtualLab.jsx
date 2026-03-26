import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Hammer, MapPin, CheckCircle2, RefreshCcw } from 'lucide-react';
import styles from '../../OurCommunityShared.module.css';

export default function OurCommunityVirtualLab() {
  const navigate = useNavigate();
  const [placedItems, setPlacedItems] = useState({
    hospital: false,
    park: false,
    postOffice: false,
    market: false,
    bridge: false
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalItems = Object.keys(placedItems).length;
  const placedCount = Object.values(placedItems).filter(Boolean).length;
  const isComplete = placedCount === totalItems;

  const handlePlace = (item) => {
    if (!placedItems[item]) {
      setPlacedItems(prev => ({ ...prev, [item]: true }));
    }
  };

  const resetCity = () => {
    setPlacedItems({
      hospital: false,
      park: false,
      postOffice: false,
      market: false,
      bridge: false
    });
  };

  const inventory = [
    { id: 'hospital', name: 'Health Centre', icon: '🏥', color: '#ef4444' },
    { id: 'park', name: 'City Park', icon: '🌲', color: '#10b981' },
    { id: 'postOffice', name: 'Post Office', icon: '🏤', color: '#3b82f6' },
    { id: 'market', name: 'Local Market', icon: '🏪', color: '#f59e0b' },
    { id: 'bridge', name: 'Chinar Bridge', icon: '🌉', color: '#8b5cf6' }
  ];

  return (
    <div className={styles.chemPage}>
      <nav className={styles.chemNav}>
        <button className={styles.chemNavBack} onClick={() => navigate('/junior/grade/4/science/our-community')}>
          <ChevronLeft size={20} />
          <span>Back to Our Community</span>
        </button>
      </nav>

      <div className={styles.chemHero}>
        <h1 className={styles.chemHeroTitle}>Community Builder</h1>
        <p className={styles.chemHeroSub}>Click items in your inventory to build up the empty town!</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
        
        {/* Progress Bar */}
        <div style={{ 
          background: '#fff', padding: '24px', borderRadius: '20px', 
          marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '24px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Town Progress</span>
              <span style={{ color: '#64748b' }}>{placedCount} / {totalItems} Built</span>
            </div>
            <div style={{ height: '12px', background: '#f1f5f9', borderRadius: '100px', overflow: 'hidden' }}>
              <div style={{ 
                height: '100%', 
                background: isComplete ? '#10b981' : '#4f46e5',
                width: `${(placedCount / totalItems) * 100}%`,
                transition: 'width 0.5s ease-out, background 0.5s',
              }} />
            </div>
          </div>
          {isComplete && (
             <button 
               onClick={resetCity}
               style={{
                 padding: '12px 20px', background: '#f1f5f9', border: 'none', borderRadius: '12px',
                 display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'bold'
               }}
             >
               <RefreshCcw size={16} /> Rebuild
             </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          
          {/* Inventory Sidebar */}
          <div style={{ 
            width: '300px', background: '#fff', borderRadius: '24px', 
            padding: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            flexShrink: 0
          }}>
            <h3 style={{ fontSize: '20px', color: '#1e293b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Hammer size={20} color="#4f46e5" /> Inventory
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {inventory.map(item => (
                <button
                  key={item.id}
                  onClick={() => handlePlace(item.id)}
                  disabled={placedItems[item.id]}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px', background: placedItems[item.id] ? '#f8fafc' : `${item.color}15`,
                    border: `2px solid ${placedItems[item.id] ? '#e2e8f0' : item.color}40`,
                    borderRadius: '16px', cursor: placedItems[item.id] ? 'default' : 'pointer',
                    opacity: placedItems[item.id] ? 0.6 : 1,
                    transition: 'all 0.2s',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{item.icon}</span>
                    <span style={{ fontWeight: 'bold', color: placedItems[item.id] ? '#94a3b8' : item.color }}>
                      {item.name}
                    </span>
                  </div>
                  {placedItems[item.id] && <CheckCircle2 color="#10b981" size={20} />}
                </button>
              ))}
            </div>

            {isComplete && (
              <div style={{ 
                marginTop: '24px', padding: '16px', background: '#10b98115', 
                borderRadius: '16px', color: '#10b981', textAlign: 'center', fontWeight: 'bold'
              }}>
                🎉 Your community is thriving!
              </div>
            )}
          </div>

          {/* Interactive Map */}
          <div style={{ 
            flex: 1, minWidth: '500px', height: '600px', background: '#A9DFBF', 
            borderRadius: '24px', position: 'relative', overflow: 'hidden',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.1), 0 10px 30px rgba(0,0,0,0.05)'
          }}>
             {/* Roads */}
             <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '60px', background: '#7F8C8D', transform: 'translateY(-50%)' }} />
             <div style={{ position: 'absolute', top: 0, left: '30%', width: '60px', height: '100%', background: '#7F8C8D' }} />
             <div style={{ position: 'absolute', top: 0, left: '70%', width: '60px', height: '100%', background: '#7F8C8D' }} />
             
             {/* River */}
             <div style={{ position: 'absolute', bottom: '40px', left: 0, width: '100%', height: '80px', background: '#3498DB', opacity: 0.8 }} />

             {/* PLACED ITEMS */}
             
             {/* Market (Top Left) */}
             <div style={{ position: 'absolute', top: '40px', left: '40px', transition: 'all 0.5s', transform: placedItems.market ? 'scale(1)' : 'scale(0)', opacity: placedItems.market ? 1 : 0 }}>
               <div style={{ width: '140px', height: '100px', background: '#F39C12', borderRadius: '12px', border: '4px solid #D35400', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                  🏪
               </div>
               <div style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '8px', color: '#1e293b', background: 'rgba(255,255,255,0.8)', padding: '4px', borderRadius: '8px' }}>Market</div>
             </div>

             {/* Hospital (Top Middle) */}
             <div style={{ position: 'absolute', top: '40px', left: '42%', transition: 'all 0.5s', transform: placedItems.hospital ? 'scale(1)' : 'scale(0)', opacity: placedItems.hospital ? 1 : 0 }}>
               <div style={{ width: '140px', height: '140px', background: '#fff', borderRadius: '12px', border: '4px solid #E74C3C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                  🏥
               </div>
               <div style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '8px', color: '#1e293b', background: 'rgba(255,255,255,0.8)', padding: '4px', borderRadius: '8px' }}>Health Centre</div>
             </div>

             {/* Post Office (Top Right) */}
             <div style={{ position: 'absolute', top: '40px', right: '40px', transition: 'all 0.5s', transform: placedItems.postOffice ? 'scale(1)' : 'scale(0)', opacity: placedItems.postOffice ? 1 : 0 }}>
               <div style={{ width: '120px', height: '100px', background: '#3498DB', borderRadius: '12px', border: '4px solid #2980B9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                  🏤
               </div>
               <div style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '8px', color: '#1e293b', background: 'rgba(255,255,255,0.8)', padding: '4px', borderRadius: '8px' }}>Post Office</div>
             </div>

             {/* Park (Bottom Right) */}
             <div style={{ position: 'absolute', bottom: '180px', right: '40px', transition: 'all 0.5s', transform: placedItems.park ? 'scale(1)' : 'scale(0)', opacity: placedItems.park ? 1 : 0 }}>
               <div style={{ width: '200px', height: '140px', background: '#2ECC71', borderRadius: '24px', border: '4px solid #27AE60', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', fontSize: '48px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                  🌲 🌳 🌲
               </div>
               <div style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '8px', color: '#1e293b', background: 'rgba(255,255,255,0.8)', padding: '4px', borderRadius: '8px' }}>Van Mahotsav Park</div>
             </div>

             {/* Bridge (Over River) */}
             <div style={{ position: 'absolute', bottom: '40px', left: '30%', zIndex: 10, transition: 'all 0.5s', transform: placedItems.bridge ? 'scale(1)' : 'scale(0)', opacity: placedItems.bridge ? 1 : 0 }}>
               <div style={{ width: '60px', height: '80px', background: '#8E44AD', border: '4px solid #7D3C98', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', boxShadow: '0 10px 20px rgba(0,0,0,0.4)' }}>
                  🌉
               </div>
               <div style={{ position: 'absolute', top: '100%', left: '-20px', width: '100px', textAlign: 'center', fontWeight: 'bold', marginTop: '8px', color: '#1e293b', background: 'rgba(255,255,255,0.8)', padding: '4px', borderRadius: '8px' }}>Chinar Bridge</div>
             </div>

             {/* Empty Map Placeholders */}
             {!placedItems.market && <div style={{ position: 'absolute', top: '60px', left: '80px', color: '#27AE60', fontSize: '24px' }}><MapPin /></div>}
             {!placedItems.hospital && <div style={{ position: 'absolute', top: '80px', left: '46%', color: '#27AE60', fontSize: '24px' }}><MapPin /></div>}
             {!placedItems.postOffice && <div style={{ position: 'absolute', top: '60px', right: '80px', color: '#27AE60', fontSize: '24px' }}><MapPin /></div>}
             {!placedItems.park && <div style={{ position: 'absolute', bottom: '220px', right: '120px', color: '#27AE60', fontSize: '24px' }}><MapPin /></div>}
             {!placedItems.bridge && <div style={{ position: 'absolute', bottom: '60px', left: '32.5%', color: '#2980B9', fontSize: '24px' }}><MapPin /></div>}

          </div>

        </div>
      </div>
    </div>
  );
}
