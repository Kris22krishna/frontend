import React from 'react';

// ==========================================
// SCENE: COMMUNITY PLACES
// ==========================================

export const ParkScene = () => (
  <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    {/* Sky & Grass */}
    <rect width="400" height="300" fill="#E6F2FF" rx="16" />
    <path d="M0 180 Q100 160 200 180 T400 170 L400 300 L0 300 Z" fill="#98D8C8" />
    <path d="M0 220 Q150 200 300 230 T400 210 L400 300 L0 300 Z" fill="#7AB8A8" />
    
    {/* Trees */}
    <g transform="translate(60, 130)">
      <rect x="15" y="40" width="10" height="40" fill="#8B4513" rx="2" />
      <circle cx="20" cy="20" r="30" fill="#4B9A50" />
      <circle cx="0" cy="30" r="20" fill="#5EBC64" />
      <circle cx="40" cy="30" r="20" fill="#5EBC64" />
    </g>
    
    <g transform="translate(300, 100)">
      <rect x="15" y="40" width="14" height="60" fill="#6A360D" rx="2" />
      <circle cx="22" cy="15" r="40" fill="#3A7E3D" />
      <circle cx="-10" cy="30" r="30" fill="#4B9A50" />
      <circle cx="50" cy="30" r="30" fill="#4B9A50" />
    </g>

    {/* Bench */}
    <g transform="translate(140, 200)">
      <rect x="0" y="20" width="80" height="6" fill="#8B4513" rx="2" />
      <rect x="0" y="10" width="80" height="6" fill="#8B4513" rx="2" />
      <rect x="10" y="26" width="6" height="20" fill="#6A360D" />
      <rect x="64" y="26" width="6" height="20" fill="#6A360D" />
      <rect x="10" y="0" width="6" height="20" fill="#6A360D" />
      <rect x="64" y="0" width="6" height="20" fill="#6A360D" />
    </g>
    
    {/* Sun */}
    <circle cx="350" cy="50" r="30" fill="#FFD700" opacity="0.8" />
    
    {/* Kids playing */}
    <g transform="translate(230, 200)">
      <circle cx="20" cy="10" r="8" fill="#FFB6B9" />
      <rect x="14" y="20" width="12" height="20" fill="#FF6B6B" rx="4" />
      <line x1="16" y1="40" x2="16" y2="55" stroke="#333" strokeWidth="4" strokeLinecap="round" />
      <line x1="24" y1="40" x2="24" y2="55" stroke="#333" strokeWidth="4" strokeLinecap="round" />
      {/* Balloon */}
      <line x1="26" y1="25" x2="50" y2="-10" stroke="#aaa" strokeWidth="1" />
      <circle cx="50" cy="-15" r="12" fill="#4ECDC4" />
    </g>
  </svg>
);

export const PostOfficeScene = () => (
  <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="#E8F4F8" rx="16" />
    {/* Building */}
    <rect x="100" y="100" width="200" height="150" fill="#F0E6D2" stroke="#D3B88C" strokeWidth="4" rx="4" />
    <polygon points="90,100 200,40 310,100" fill="#C84B31" />
    {/* Door */}
    <rect x="175" y="170" width="50" height="80" fill="#5C3D2E" rx="2" />
    <circle cx="215" cy="210" r="3" fill="#FFD700" />
    {/* Post Box */}
    <g transform="translate(60, 180)">
      <rect x="0" y="0" width="30" height="70" fill="#D32F2F" rx="4" />
      <rect x="5" y="15" width="20" height="4" fill="#111" />
      <text x="15" y="35" fontFamily="Arial" fontSize="8" fill="#FFF" textAnchor="middle" fontWeight="bold">POST</text>
    </g>
    {/* Signage */}
    <rect x="130" y="110" width="140" height="25" fill="#FFF" stroke="#4a4a4a" strokeWidth="2" rx="4" />
    <text x="200" y="127" fontFamily="Outfit, sans-serif" fontSize="14" fontWeight="bold" fill="#333" textAnchor="middle">POST OFFICE</text>
    {/* Mail Carrier */}
    <g transform="translate(320, 170)">
      <circle cx="20" cy="15" r="10" fill="#FAD0C4" />
      <path d="M10 5 Q20 -5 30 5 L35 15 L5 15 Z" fill="#2C3E50" />
      <rect x="12" y="27" width="16" height="25" fill="#34495E" rx="4" />
      <rect x="2" y="30" width="15" height="15" fill="#E67E22" rx="2" /> {/* Bag */}
      <line x1="16" y1="52" x2="16" y2="75" stroke="#111" strokeWidth="5" strokeLinecap="round" />
      <line x1="24" y1="52" x2="24" y2="75" stroke="#111" strokeWidth="5" strokeLinecap="round" />
    </g>
  </svg>
);

export const HospitalScene = () => (
  <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="#FDEEED" rx="16" />
    {/* Hospital Building */}
    <rect x="80" y="80" width="240" height="200" fill="#FFF" stroke="#E0E0E0" strokeWidth="4" />
    <rect x="175" y="40" width="50" height="40" fill="#FFF" stroke="#E0E0E0" strokeWidth="4" />
    {/* Red Cross */}
    <rect x="195" y="50" width="10" height="20" fill="#E74C3C" />
    <rect x="190" y="55" width="20" height="10" fill="#E74C3C" />
    {/* Windows */}
    <rect x="100" y="100" width="40" height="40" fill="#AED6F1" rx="4" />
    <rect x="260" y="100" width="40" height="40" fill="#AED6F1" rx="4" />
    <rect x="100" y="160" width="40" height="40" fill="#AED6F1" rx="4" />
    <rect x="260" y="160" width="40" height="40" fill="#AED6F1" rx="4" />
    {/* Entrance */}
    <rect x="160" y="200" width="80" height="80" fill="#BDC3C7" />
    <line x1="200" y1="200" x2="200" y2="280" stroke="#7F8C8D" strokeWidth="2" />
    {/* Ambulance */}
    <g transform="translate(10, 220)">
      <rect x="0" y="10" width="70" height="40" fill="#FFF" stroke="#CCC" strokeWidth="2" rx="4" />
      <rect x="50" y="10" width="20" height="20" fill="#AED6F1" />
      <circle cx="20" cy="50" r="10" fill="#333" />
      <circle cx="55" cy="50" r="10" fill="#333" />
      <rect x="25" y="20" width="6" height="15" fill="#E74C3C" />
      <rect x="20" y="25" width="16" height="6" fill="#E74C3C" />
      <circle cx="35" cy="5" r="3" fill="#E74C3C" />
    </g>
  </svg>
);

export const MarketScene = () => (
  <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="#FFF4E6" rx="16" />
    {/* Stalls */}
    <g transform="translate(50, 120)">
      <rect x="0" y="40" width="120" height="80" fill="#E67E22" rx="4" />
      <polygon points="-10,40 130,40 110,0 10,0" fill="#E74C3C" />
      <polygon points="10,0 30,40 50,0" fill="#F1C40F" />
      <polygon points="50,0 70,40 90,0" fill="#F1C40F" />
      <polygon points="90,0 110,40 130,0" fill="#F1C40F" />
      {/* Fruits */}
      <circle cx="30" cy="90" r="10" fill="#2ECC71" />
      <circle cx="50" cy="90" r="10" fill="#2ECC71" />
      <circle cx="40" cy="75" r="10" fill="#2ECC71" />
      <circle cx="80" cy="90" r="12" fill="#E74C3C" />
      <circle cx="100" cy="90" r="12" fill="#E74C3C" />
    </g>
    
    <g transform="translate(220, 120)">
      <rect x="0" y="40" width="120" height="80" fill="#8E44AD" rx="4" />
      <polygon points="-10,40 130,40 110,0 10,0" fill="#2980B9" />
      <circle cx="30" cy="80" r="15" fill="#F39C12" />
      <circle cx="65" cy="80" r="15" fill="#D35400" />
      <circle cx="100" cy="80" r="15" fill="#F39C12" />
    </g>
    
    {/* Shoppers */}
    <g transform="translate(160, 180)">
      <circle cx="20" cy="10" r="10" fill="#FAD0C4" />
      <rect x="12" y="20" width="16" height="30" fill="#3498DB" rx="4" />
      <line x1="16" y1="50" x2="16" y2="80" stroke="#333" strokeWidth="5" strokeLinecap="round" />
      <line x1="24" y1="50" x2="24" y2="80" stroke="#333" strokeWidth="5" strokeLinecap="round" />
    </g>
  </svg>
);

// ==========================================
// SCENE: COMMUNITY EVENTS
// ==========================================

export const VanMahotsavScene = () => (
  <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="#E9F7EF" rx="16" />
    <path d="M0 250 Q200 200 400 250 L400 300 L0 300 Z" fill="#A9DFBF" />
    
    {/* People planting */}
    <g transform="translate(100, 160)">
      {/* Person 1 */}
      <circle cx="20" cy="10" r="12" fill="#FAD0C4" />
      <rect x="10" y="24" width="20" height="30" fill="#3498DB" rx="4" />
      <path d="M 30 35 L 50 60" stroke="#F5B041" strokeWidth="4" strokeLinecap="round" /> {/* Shovel */}
      <line x1="15" y1="54" x2="15" y2="85" stroke="#333" strokeWidth="6" strokeLinecap="round" />
      <line x1="25" y1="54" x2="25" y2="85" stroke="#333" strokeWidth="6" strokeLinecap="round" />
      
      {/* Sapling */}
      <rect x="60" y="60" width="4" height="30" fill="#8B4513" />
      <circle cx="62" cy="55" r="12" fill="#2ECC71" />
      <circle cx="55" cy="65" r="8" fill="#27AE60" />
      <circle cx="70" cy="65" r="8" fill="#27AE60" />
      {/* Dirt mound */}
      <ellipse cx="62" cy="90" rx="20" ry="10" fill="#A0522D" />
    </g>
    
    <g transform="translate(240, 170)">
      {/* Person 2 Watering */}
      <circle cx="20" cy="10" r="10" fill="#FAD0C4" />
      <rect x="12" y="22" width="16" height="25" fill="#E74C3C" rx="4" />
      {/* Watering can */}
      <rect x="-10" y="35" width="20" height="15" fill="#7F8C8D" rx="2" />
      <path d="M -10 40 L -25 35" stroke="#7F8C8D" strokeWidth="3" />
      <line x1="15" y1="47" x2="15" y2="75" stroke="#333" strokeWidth="5" strokeLinecap="round" />
      <line x1="25" y1="47" x2="25" y2="75" stroke="#333" strokeWidth="5" strokeLinecap="round" />
      {/* Water drops */}
      <circle cx="-30" cy="45" r="2" fill="#3498DB" />
      <circle cx="-35" cy="50" r="2" fill="#3498DB" />
      <circle cx="-25" cy="55" r="2" fill="#3498DB" />
      
      {/* Sapling */}
      <rect x="-50" y="50" width="4" height="25" fill="#8B4513" />
      <circle cx="-48" cy="45" r="10" fill="#2ECC71" />
      <ellipse cx="-48" cy="75" rx="15" ry="8" fill="#A0522D" />
    </g>
    
    <text x="200" y="50" fontFamily="Outfit, sans-serif" fontSize="28" fontWeight="bold" fill="#27AE60" textAnchor="middle">Van Mahotsav</text>
  </svg>
);

export const UrukaScene = () => (
  <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="#1A252C" rx="16" />
    <circle cx="340" cy="60" r="25" fill="#FEF9E7" /> {/* Moon */}
    <circle cx="100" cy="100" r="2" fill="#FFF" />
    <circle cx="200" cy="50" r="2" fill="#FFF" />
    <circle cx="50" cy="150" r="1.5" fill="#FFF" />
    <circle cx="280" cy="120" r="2" fill="#FFF" />
    
    {/* Bonfire / Meji */}
    <g transform="translate(180, 160)">
      <polygon points="20,10 0,100 40,100" fill="#D35400" />
      <polygon points="10,30 -10,100 30,100" fill="#E67E22" />
      <polygon points="30,30 10,100 50,100" fill="#E67E22" />
      <polygon points="20,50 5,100 35,100" fill="#F1C40F" />
      <rect x="-10" y="90" width="60" height="10" fill="#784212" rx="2" />
    </g>
    
    {/* People feasting */}
    <g transform="translate(50, 220)">
      <circle cx="20" cy="10" r="10" fill="#FAD0C4" />
      <rect x="12" y="20" width="16" height="25" fill="#9B59B6" rx="4" />
      <path d="M40 40 C 60 40 80 40 100 40" stroke="#27AE60" strokeWidth="4" strokeLinecap="round" /> {/* Banana leaf */}
      <circle cx="70" cy="38" r="5" fill="#F1C40F" /> {/* Food */}
    </g>
    
    <g transform="translate(290, 220)">
      <circle cx="20" cy="10" r="10" fill="#FAD0C4" />
      <rect x="12" y="20" width="16" height="25" fill="#2ECC71" rx="4" />
      <path d="M-40 40 C -20 40 0 40 20 40" stroke="#27AE60" strokeWidth="4" strokeLinecap="round" /> {/* Banana leaf */}
    </g>
    
    <text x="200" y="280" fontFamily="Outfit, sans-serif" fontSize="24" fontWeight="bold" fill="#F39C12" textAnchor="middle">Uruka Feast</text>
  </svg>
);

export const BuilderScene = () => (
  <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="#EBF5FB" rx="16" />
    
    {/* River */}
    <path d="M 0 200 Q 200 180 400 220 L 400 300 L 0 300 Z" fill="#5DADE2" />
    <path d="M 0 230 Q 200 210 400 250 L 400 300 L 0 300 Z" fill="#3498DB" />
    
    {/* Bridge being built */}
    <rect x="50" y="160" width="40" height="100" fill="#8B4513" />
    <rect x="310" y="180" width="40" height="100" fill="#8B4513" />
    <rect x="60" y="170" width="150" height="15" fill="#A0522D" />
    <rect x="190" y="180" width="130" height="15" fill="#A0522D" />
    
    {/* Workers */}
    <g transform="translate(160, 110)">
      <circle cx="20" cy="10" r="10" fill="#FAD0C4" />
      <rect x="5" y="-5" width="30" height="10" fill="#F1C40F" rx="4" /> {/* Hard hat */}
      <rect x="12" y="20" width="16" height="25" fill="#E67E22" rx="4" />
      <line x1="16" y1="45" x2="16" y2="60" stroke="#333" strokeWidth="5" strokeLinecap="round" />
      <line x1="24" y1="45" x2="24" y2="60" stroke="#333" strokeWidth="5" strokeLinecap="round" />
      <rect x="-10" y="30" width="40" height="8" fill="#8B4513" /> {/* Carrying wood */}
    </g>

    <g transform="translate(260, 130)">
      <circle cx="20" cy="10" r="10" fill="#FAD0C4" />
      <rect x="5" y="-5" width="30" height="10" fill="#F1C40F" rx="4" /> {/* Hard hat */}
      <rect x="12" y="20" width="16" height="25" fill="#34495E" rx="4" />
      <line x1="16" y1="45" x2="16" y2="60" stroke="#333" strokeWidth="5" strokeLinecap="round" />
      <line x1="24" y1="45" x2="24" y2="60" stroke="#333" strokeWidth="5" strokeLinecap="round" />
      <rect x="30" y="20" width="30" height="30" fill="#BDC3C7" /> {/* Stone block */}
    </g>
    
    <text x="200" y="50" fontFamily="Outfit, sans-serif" fontSize="24" fontWeight="bold" fill="#2C3E50" textAnchor="middle">Community Bridge Building</text>
  </svg>
);

// Mappers for the various SVGs
export const getTermVisual = (id) => {
  switch (id) {
    case 'van-mahotsav': return <VanMahotsavScene />;
    case 'uruka': return <UrukaScene />;
    case 'khetala': 
    case 'community-bridge': return <BuilderScene />;
    default: return <ParkScene />;
  }
};

export const getPlaceVisual = (id) => {
  switch (id) {
    case 'park': return <ParkScene />;
    case 'post-office': return <PostOfficeScene />;
    case 'hospital': return <HospitalScene />;
    case 'market': return <MarketScene />;
    default: return <ParkScene />;
  }
};
