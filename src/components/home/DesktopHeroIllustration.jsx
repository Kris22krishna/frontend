export function DesktopHeroIllustration() {
    return (
        <svg
            className="hidden md:block absolute inset-0 w-full h-full"
            viewBox="0 0 1400 500"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Sky background with gradient */}
            <defs>
                <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#87CEEB" />
                    <stop offset="100%" stopColor="#B0E5F9" />
                </linearGradient>
                <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFF176" />
                    <stop offset="70%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#FFA726" />
                </radialGradient>
            </defs>
            <rect x="0" y="0" width="1400" height="500" fill="url(#skyGradient)" />

            {/* Sun - top right */}
            <g transform="translate(1250, 80)">
                <circle cx="0" cy="0" r="45" fill="url(#sunGradient)" />
                {/* Sun rays */}
                <path d="M 0 -60 L -5 -75 L 5 -75 Z" fill="#FFD700" />
                <path d="M 42 -42 L 50 -55 L 55 -45 Z" fill="#FFD700" />
                <path d="M 60 0 L 75 -5 L 75 5 Z" fill="#FFD700" />
                <path d="M 42 42 L 55 50 L 45 55 Z" fill="#FFD700" />
                <path d="M 0 60 L 5 75 L -5 75 Z" fill="#FFD700" />
                <path d="M -42 42 L -50 55 L -55 45 Z" fill="#FFD700" />
                <path d="M -60 0 L -75 5 L -75 -5 Z" fill="#FFD700" />
                <path d="M -42 -42 L -55 -50 L -45 -55 Z" fill="#FFD700" />
            </g>

            {/* Clouds - more realistic */}
            <g opacity="0.95">
                <ellipse cx="250" cy="90" rx="45" ry="28" fill="white" />
                <ellipse cx="285" cy="95" rx="40" ry="25" fill="white" />
                <ellipse cx="215" cy="95" rx="35" ry="22" fill="white" />
                <ellipse cx="250" cy="105" rx="30" ry="18" fill="white" />

                <ellipse cx="1080" cy="85" rx="50" ry="30" fill="white" />
                <ellipse cx="1120" cy="90" rx="45" ry="28" fill="white" />
                <ellipse cx="1040" cy="90" rx="38" ry="25" fill="white" />
                <ellipse cx="1080" cy="100" rx="35" ry="20" fill="white" />
            </g>

            {/* Green grass ground with texture */}
            <rect x="0" y="380" width="1400" height="120" fill="#7EC850" />
            <rect x="0" y="380" width="1400" height="15" fill="#6BB642" opacity="0.3" />

            {/* Park path - curved with texture */}
            <path d="M 0 415 Q 350 405, 700 420 T 1400 410" fill="#D4A76A" />
            <path d="M 0 430 Q 350 420, 700 435 T 1400 425" fill="#C19653" />
            <path d="M 0 445 Q 350 435, 700 450 T 1400 440" fill="#B08A4A" />

            {/* Tree 1 - Left side - more realistic */}
            <g transform="translate(150, 280)">
                {/* Tree trunk with shading */}
                <ellipse cx="0" cy="120" rx="18" ry="8" fill="#6B3410" />
                <rect x="-15" y="40" width="30" height="80" fill="#8B4513" rx="3" />
                <rect x="-12" y="40" width="10" height="80" fill="#A0522D" rx="2" />

                {/* Tree foliage - layered */}
                <circle cx="0" cy="30" r="50" fill="#2ECC40" />
                <circle cx="-25" cy="45" r="35" fill="#27AE60" />
                <circle cx="25" cy="45" r="35" fill="#27AE60" />
                <circle cx="0" cy="50" r="30" fill="#229A34" />
                <circle cx="-15" cy="25" r="25" fill="#3DDC84" />
                <circle cx="15" cy="25" r="25" fill="#3DDC84" />

                {/* Math symbols on tree */}
                <text x="-15" y="30" fill="#FFD700" fontSize="32" fontWeight="bold" stroke="#FF8C00" strokeWidth="1">+</text>
                <text x="12" y="50" fill="#FF6B6B" fontSize="28" fontWeight="bold" stroke="#DC143C" strokeWidth="1">×</text>
                <text x="-30" y="58" fill="#4ECDC4" fontSize="26" fontWeight="bold" stroke="#2BA5A0" strokeWidth="1">−</text>
            </g>

            {/* Tree 2 - Right side - more realistic */}
            <g transform="translate(1250, 260)">
                {/* Tree trunk with shading */}
                <ellipse cx="0" cy="135" rx="22" ry="10" fill="#6B3410" />
                <rect x="-18" y="45" width="36" height="90" fill="#8B4513" rx="3" />
                <rect x="-14" y="45" width="12" height="90" fill="#A0522D" rx="2" />

                {/* Tree foliage - layered */}
                <circle cx="0" cy="35" r="55" fill="#3DDC84" />
                <circle cx="-30" cy="50" r="40" fill="#2ECC40" />
                <circle cx="30" cy="50" r="40" fill="#2ECC40" />
                <circle cx="0" cy="55" r="35" fill="#27AE60" />
                <circle cx="-20" cy="30" r="30" fill="#4ADE80" />
                <circle cx="20" cy="30" r="30" fill="#4ADE80" />

                {/* Math symbols on tree */}
                <text x="-18" y="35" fill="#FF6B6B" fontSize="34" fontWeight="bold" stroke="#DC143C" strokeWidth="1">÷</text>
                <text x="10" y="55" fill="#FFD700" fontSize="30" fontWeight="bold" stroke="#FF8C00" strokeWidth="1">=</text>
                <text x="-28" y="65" fill="#4ECDC4" fontSize="28" fontWeight="bold" stroke="#2BA5A0" strokeWidth="1">π</text>
            </g>

            {/* Tree 3 - Middle - more realistic */}
            <g transform="translate(550, 270)">
                {/* Tree trunk with shading */}
                <ellipse cx="0" cy="105" rx="16" ry="7" fill="#6B3410" />
                <rect x="-12" y="35" width="24" height="70" fill="#8B4513" rx="2" />
                <rect x="-10" y="35" width="8" height="70" fill="#A0522D" rx="1" />

                {/* Tree foliage - layered */}
                <circle cx="0" cy="25" r="45" fill="#2ECC40" />
                <circle cx="-22" cy="40" r="32" fill="#27AE60" />
                <circle cx="22" cy="40" r="32" fill="#27AE60" />
                <circle cx="0" cy="45" r="28" fill="#229A34" />
                <circle cx="-12" cy="20" r="22" fill="#3DDC84" />
                <circle cx="12" cy="20" r="22" fill="#3DDC84" />

                {/* Math symbols on tree */}
                <text x="-12" y="25" fill="#FF6B6B" fontSize="28" fontWeight="bold" stroke="#DC143C" strokeWidth="1">√</text>
                <text x="8" y="42" fill="#FFD700" fontSize="24" fontWeight="bold" stroke="#FF8C00" strokeWidth="1">²</text>
            </g>

            {/* Playground swing set - more realistic */}
            <g transform="translate(400, 320)">
                {/* Swing frame with shading */}
                <polygon points="0,100 30,0 35,0 5,100" fill="#E74C3C" />
                <polygon points="90,100 60,0 55,0 85,100" fill="#E74C3C" />
                <rect x="28" y="-5" width="34" height="10" fill="#C0392B" rx="2" />
                <ellipse cx="30" cy="0" rx="8" ry="5" fill="#922B21" />
                <ellipse cx="60" cy="0" rx="8" ry="5" fill="#922B21" />

                {/* Ground support */}
                <ellipse cx="2.5" cy="100" rx="12" ry="6" fill="#A0522D" />
                <ellipse cx="87.5" cy="100" rx="12" ry="6" fill="#A0522D" />

                {/* Swing 1 with chains */}
                <rect x="33" y="0" width="3" height="75" fill="#708090" rx="1" />
                <rect x="32" y="75" width="16" height="12" fill="#FFD700" rx="3" />
                <rect x="32" y="76" width="16" height="4" fill="#FFA726" rx="1" />
                <text x="34" y="86" fill="white" fontSize="14" fontWeight="bold">5</text>

                {/* Swing 2 with chains */}
                <rect x="54" y="0" width="3" height="85" fill="#708090" rx="1" />
                <rect x="50" y="85" width="16" height="12" fill="#FF6B6B" rx="3" />
                <rect x="50" y="86" width="16" height="4" fill="#E74C3C" rx="1" />
                <text x="52" y="96" fill="white" fontSize="14" fontWeight="bold">8</text>
            </g>

            {/* Slide - more realistic */}
            <g transform="translate(850, 300)">
                {/* Slide base/ground */}
                <ellipse cx="85" cy="102" rx="20" ry="8" fill="#A0522D" />

                {/* Slide ladder with depth */}
                <rect x="-2" y="40" width="8" height="62" fill="#3498DB" rx="2" />
                <rect x="0" y="40" width="4" height="62" fill="#5DADE2" rx="1" />
                <rect x="0" y="88" width="18" height="4" fill="#2E86C1" rx="1" />
                <rect x="0" y="73" width="18" height="4" fill="#2E86C1" rx="1" />
                <rect x="0" y="58" width="18" height="4" fill="#2E86C1" rx="1" />

                {/* Slide top platform */}
                <rect x="-5" y="36" width="25" height="8" fill="#3498DB" rx="2" />

                {/* Slide surface with depth */}
                <path d="M 5 42 Q 45 70, 85 102" fill="none" stroke="#FFC107" strokeWidth="28" strokeLinecap="round" />
                <path d="M 5 42 Q 45 70, 85 102" fill="none" stroke="#FFD54F" strokeWidth="18" strokeLinecap="round" />

                {/* Slide sides */}
                <path d="M 5 40 Q 45 68, 85 100" fill="none" stroke="#FFA726" strokeWidth="3" />
                <path d="M 5 44 Q 45 72, 85 104" fill="none" stroke="#FFA726" strokeWidth="3" />

                {/* Math equation on slide */}
                <text x="30" y="72" fill="#E74C3C" fontSize="20" fontWeight="bold" stroke="#C0392B" strokeWidth="0.5">2+3</text>
            </g>

            {/* Park bench - more realistic */}
            <g transform="translate(650, 360)">
                {/* Ground shadow */}
                <ellipse cx="27" cy="46" rx="32" ry="6" fill="#5A8C4E" opacity="0.3" />

                {/* Bench legs with depth */}
                <rect x="5" y="20" width="7" height="26" fill="#6B4423" rx="1" />
                <rect x="6" y="20" width="3" height="26" fill="#8B5A2B" rx="0.5" />
                <rect x="43" y="20" width="7" height="26" fill="#6B4423" rx="1" />
                <rect x="44" y="20" width="3" height="26" fill="#8B5A2B" rx="0.5" />

                {/* Bench seat with planks */}
                <rect x="0" y="15" width="55" height="10" fill="#D4A76A" rx="2" />
                <rect x="2" y="16" width="51" height="4" fill="#E6BE8A" rx="1" />
                <line x1="14" y1="15" x2="14" y2="25" stroke="#B8956A" strokeWidth="1.5" />
                <line x1="27" y1="15" x2="27" y2="25" stroke="#B8956A" strokeWidth="1.5" />
                <line x1="40" y1="15" x2="40" y2="25" stroke="#B8956A" strokeWidth="1.5" />

                {/* Bench back with planks */}
                <rect x="0" y="0" width="55" height="7" fill="#D4A76A" rx="1" />
                <rect x="2" y="1" width="51" height="3" fill="#E6BE8A" rx="0.5" />
                <rect x="5" y="7" width="7" height="13" fill="#6B4423" rx="1" />
                <rect x="6" y="7" width="3" height="13" fill="#8B5A2B" rx="0.5" />
                <rect x="43" y="7" width="7" height="13" fill="#6B4423" rx="1" />
                <rect x="44" y="7" width="3" height="13" fill="#8B5A2B" rx="0.5" />

                {/* Math book on bench - realistic */}
                <rect x="16" y="9" width="22" height="16" fill="#2874A6" stroke="#1B4F72" strokeWidth="1.5" rx="1" />
                <rect x="17" y="10" width="3" height="16" fill="#1B4F72" />
                <line x1="22" y1="13" x2="35" y2="13" stroke="#AED6F1" strokeWidth="1.5" />
                <line x1="22" y1="16" x2="35" y2="16" stroke="#AED6F1" strokeWidth="1.5" />
                <line x1="22" y1="19" x2="32" y2="19" stroke="#AED6F1" strokeWidth="1.5" />
                <text x="20" y="22" fill="#F8F9F9" fontSize="10" fontWeight="bold">123</text>
            </g>

            {/* Child 1 - Playing with ball - realistic filled */}
            <g transform="translate(300, 380)">
                {/* Shadow */}
                <ellipse cx="0" cy="48" rx="15" ry="4" fill="#5A8C4E" opacity="0.3" />

                {/* Legs */}
                <ellipse cx="-7" cy="38" rx="5" ry="10" fill="#3B82F6" />
                <ellipse cx="7" cy="38" rx="5" ry="10" fill="#2563EB" />
                {/* Shoes */}
                <ellipse cx="-7" cy="46" rx="6" ry="4" fill="#1F2937" />
                <ellipse cx="7" cy="46" rx="6" ry="4" fill="#1F2937" />

                {/* Body */}
                <ellipse cx="0" cy="20" rx="10" ry="15" fill="#EF4444" />
                <ellipse cx="0" cy="18" rx="8" ry="12" fill="#F87171" />

                {/* Arms */}
                <ellipse cx="-13" cy="18" rx="4" ry="8" fill="#EF4444" transform="rotate(-20 -13 18)" />
                <ellipse cx="13" cy="18" rx="4" ry="8" fill="#DC2626" transform="rotate(20 13 18)" />

                {/* Head */}
                <circle cx="0" cy="3" r="13" fill="#FDE68A" />
                <circle cx="0" cy="3" r="11" fill="#FEF3C7" />

                {/* Face */}
                <circle cx="-4" cy="2" r="1.5" fill="#1F2937" />
                <circle cx="4" cy="2" r="1.5" fill="#1F2937" />
                <path d="M -3 7 Q 0 9, 3 7" stroke="#1F2937" strokeWidth="1.5" fill="none" />

                {/* Hair */}
                <path d="M -8 -5 Q -10 -8, -7 -10 Q -3 -12, 0 -11 Q 3 -12, 7 -10 Q 10 -8, 8 -5" fill="#92400E" />

                {/* Ball with number - realistic */}
                <circle cx="30" cy="-8" r="12" fill="#10B981" />
                <circle cx="30" cy="-8" r="10" fill="#34D399" />
                <path d="M 25 -8 Q 30 -12, 35 -8" stroke="#065F46" strokeWidth="1" fill="none" />
                <path d="M 30 -14 Q 28 -8, 30 -2" stroke="#065F46" strokeWidth="1" fill="none" />
                <text x="25" y="-4" fill="white" fontSize="14" fontWeight="bold">7</text>
            </g>

            {/* Child 2 - Running with kite - realistic filled */}
            <g transform="translate(750, 375)">
                {/* Shadow */}
                <ellipse cx="0" cy="50" rx="15" ry="4" fill="#5A8C4E" opacity="0.3" />

                {/* Legs - running position */}
                <ellipse cx="-8" cy="40" rx="5" ry="12" fill="#EC4899" transform="rotate(-15 -8 40)" />
                <ellipse cx="6" cy="42" rx="5" ry="10" fill="#DB2777" transform="rotate(10 6 42)" />
                {/* Shoes */}
                <ellipse cx="-9" cy="48" rx="6" ry="4" fill="#1F2937" transform="rotate(-10 -9 48)" />
                <ellipse cx="7" cy="50" rx="6" ry="4" fill="#1F2937" />

                {/* Body */}
                <ellipse cx="0" cy="22" rx="10" ry="14" fill="#10B981" transform="rotate(5 0 22)" />
                <ellipse cx="0" cy="20" rx="8" ry="11" fill="#34D399" transform="rotate(5 0 20)" />

                {/* Arms - one raised */}
                <ellipse cx="-10" cy="24" rx="4" ry="9" fill="#10B981" transform="rotate(-25 -10 24)" />
                <ellipse cx="16" cy="12" rx="4" ry="10" fill="#059669" transform="rotate(35 16 12)" />

                {/* Head */}
                <circle cx="0" cy="5" r="13" fill="#FDE68A" />
                <circle cx="0" cy="5" r="11" fill="#FEF3C7" />

                {/* Face */}
                <circle cx="-4" cy="4" r="1.5" fill="#1F2937" />
                <circle cx="4" cy="4" r="1.5" fill="#1F2937" />
                <path d="M -3 9 Q 0 11, 3 9" stroke="#1F2937" strokeWidth="1.5" fill="none" />

                {/* Hair */}
                <path d="M -9 -3 Q -11 -6, -8 -8 Q -4 -10, 0 -9 Q 4 -10, 8 -8 Q 11 -6, 9 -3" fill="#78350F" />

                {/* Kite - realistic diamond with tail */}
                <path d="M 40 -65 L 55 -40 L 40 -25 L 25 -40 Z" fill="#EF4444" />
                <path d="M 40 -65 L 55 -40 L 40 -25 L 25 -40 Z" fill="none" stroke="#991B1B" strokeWidth="2" />
                <line x1="40" y1="-65" x2="40" y2="-25" stroke="#991B1B" strokeWidth="1.5" />
                <line x1="25" y1="-40" x2="55" y2="-40" stroke="#991B1B" strokeWidth="1.5" />
                <text x="32" y="-38" fill="white" fontSize="16" fontWeight="bold">Δ</text>

                {/* Kite tail bows */}
                <circle cx="40" cy="-20" r="3" fill="#FCD34D" />
                <circle cx="38" cy="-10" r="3" fill="#60A5FA" />
                <circle cx="42" cy="0" r="3" fill="#34D399" />

                {/* Kite string */}
                <path d="M 18 12 Q 28 -10, 40 -25" stroke="#94A3B8" strokeWidth="1.5" fill="none" />
            </g>

            {/* Child 3 - Sitting and reading - realistic filled */}
            <g transform="translate(950, 390)">
                {/* Shadow */}
                <ellipse cx="0" cy="40" rx="18" ry="5" fill="#5A8C4E" opacity="0.3" />

                {/* Legs - sitting */}
                <ellipse cx="-10" cy="32" rx="6" ry="10" fill="#3B82F6" transform="rotate(-80 -10 32)" />
                <ellipse cx="10" cy="32" rx="6" ry="10" fill="#2563EB" transform="rotate(80 10 32)" />
                {/* Shoes */}
                <ellipse cx="-14" cy="36" rx="6" ry="4" fill="#1F2937" />
                <ellipse cx="14" cy="36" rx="6" ry="4" fill="#1F2937" />

                {/* Body */}
                <ellipse cx="0" cy="18" rx="11" ry="13" fill="#8B5CF6" />
                <ellipse cx="0" cy="17" rx="9" ry="10" fill="#A78BFA" />

                {/* Arms - holding book */}
                <ellipse cx="-15" cy="22" rx="4" ry="8" fill="#8B5CF6" transform="rotate(-40 -15 22)" />
                <ellipse cx="15" cy="22" rx="4" ry="8" fill="#7C3AED" transform="rotate(40 15 22)" />

                {/* Head */}
                <circle cx="0" cy="3" r="12" fill="#FDE68A" />
                <circle cx="0" cy="3" r="10" fill="#FEF3C7" />

                {/* Face */}
                <circle cx="-3.5" cy="2" r="1.5" fill="#1F2937" />
                <circle cx="3.5" cy="2" r="1.5" fill="#1F2937" />
                <path d="M -2 7 Q 0 8, 2 7" stroke="#1F2937" strokeWidth="1.5" fill="none" />

                {/* Hair */}
                <path d="M -8 -4 Q -10 -7, -7 -9 Q -3 -11, 0 -10 Q 3 -11, 7 -9 Q 10 -7, 8 -4" fill="#DC2626" />

                {/* Book with equation - realistic */}
                <rect x="-18" y="20" width="36" height="24" fill="white" stroke="#3B82F6" strokeWidth="2.5" rx="2" />
                <rect x="-17" y="21" width="4" height="24" fill="#DBEAFE" />
                <line x1="-12" y1="26" x2="14" y2="26" stroke="#93C5FD" strokeWidth="1" />
                <line x1="-12" y1="30" x2="14" y2="30" stroke="#93C5FD" strokeWidth="1" />
                <line x1="-12" y1="34" x2="10" y2="34" stroke="#93C5FD" strokeWidth="1" />
                <text x="-12" y="32" fill="#1E40AF" fontSize="12" fontWeight="bold">a+b=c</text>
            </g>

            {/* Child 4 - Jumping - realistic filled */}
            <g transform="translate(1100, 365)">
                {/* Shadow */}
                <ellipse cx="0" cy="55" rx="14" ry="4" fill="#5A8C4E" opacity="0.3" />

                {/* Legs - jumping */}
                <ellipse cx="-9" cy="42" rx="5" ry="11" fill="#10B981" transform="rotate(-25 -9 42)" />
                <ellipse cx="9" cy="42" rx="5" ry="11" fill="#059669" transform="rotate(25 9 42)" />
                {/* Shoes */}
                <ellipse cx="-11" cy="50" rx="6" ry="4" fill="#1F2937" transform="rotate(-15 -11 50)" />
                <ellipse cx="11" cy="50" rx="6" ry="4" fill="#1F2937" transform="rotate(15 11 50)" />

                {/* Body */}
                <ellipse cx="0" cy="20" rx="11" ry="14" fill="#EC4899" />
                <ellipse cx="0" cy="19" rx="9" ry="11" fill="#F472B6" />

                {/* Arms - raised */}
                <ellipse cx="-16" cy="14" rx="4" ry="9" fill="#EC4899" transform="rotate(-45 -16 14)" />
                <ellipse cx="16" cy="14" rx="4" ry="9" fill="#DB2777" transform="rotate(45 16 14)" />

                {/* Head */}
                <circle cx="0" cy="4" r="13" fill="#FDE68A" />
                <circle cx="0" cy="4" r="11" fill="#FEF3C7" />

                {/* Face - happy */}
                <circle cx="-4" cy="3" r="1.5" fill="#1F2937" />
                <circle cx="4" cy="3" r="1.5" fill="#1F2937" />
                <path d="M -4 8 Q 0 11, 4 8" stroke="#1F2937" strokeWidth="1.5" fill="none" />

                {/* Hair */}
                <path d="M -9 -4 Q -11 -7, -8 -9 Q -4 -11, 0 -10 Q 4 -11, 8 -9 Q 11 -7, 9 -4" fill="#0EA5E9" />
            </g>

            {/* Floating math symbols as decorations - with shadow effect */}
            <g opacity="0.8">
                <text x="500" y="150" fill="#FF6B6B" fontSize="40" fontWeight="bold" stroke="#DC143C" strokeWidth="2">+</text>
                <text x="1050" y="180" fill="#3B82F6" fontSize="42" fontWeight="bold" stroke="#1E40AF" strokeWidth="2">−</text>
                <text x="200" y="220" fill="#10B981" fontSize="38" fontWeight="bold" stroke="#059669" strokeWidth="2">×</text>
                <text x="800" y="140" fill="#FFD700" fontSize="40" fontWeight="bold" stroke="#FF8C00" strokeWidth="2">÷</text>
                <text x="350" y="180" fill="#8B5CF6" fontSize="36" fontWeight="bold" stroke="#6D28D9" strokeWidth="2">=</text>
                <text x="1150" y="240" fill="#EC4899" fontSize="34" fontWeight="bold" stroke="#DB2777" strokeWidth="2">√</text>
            </g>

            {/* Flowers in the park - more realistic */}
            <g>
                {/* Flower 1 - Red */}
                <rect x="97" y="422" width="2" height="15" fill="#22C55E" />
                <ellipse cx="95" cy="418" rx="4" ry="5" fill="#FF6B6B" />
                <ellipse cx="105" cy="418" rx="4" ry="5" fill="#FF6B6B" />
                <ellipse cx="100" cy="413" rx="5" ry="4" fill="#FF6B6B" />
                <ellipse cx="100" cy="423" rx="5" ry="4" fill="#FF6B6B" />
                <circle cx="100" cy="418" r="5" fill="#EF4444" />
                <circle cx="100" cy="418" r="3" fill="#FCD34D" />

                {/* Flower 2 - Cyan */}
                <rect x="1299" y="442" width="2" height="15" fill="#22C55E" />
                <ellipse cx="1295" cy="438" rx="4" ry="5" fill="#4ECDC4" />
                <ellipse cx="1305" cy="438" rx="4" ry="5" fill="#4ECDC4" />
                <ellipse cx="1300" cy="433" rx="5" ry="4" fill="#4ECDC4" />
                <ellipse cx="1300" cy="443" rx="5" ry="4" fill="#4ECDC4" />
                <circle cx="1300" cy="438" r="5" fill="#22D3EE" />
                <circle cx="1300" cy="438" r="3" fill="#FCD34D" />

                {/* Flower 3 - Green */}
                <rect x="479" y="437" width="2" height="15" fill="#22C55E" />
                <ellipse cx="475" cy="433" rx="4" ry="5" fill="#34D399" />
                <ellipse cx="485" cy="433" rx="4" ry="5" fill="#34D399" />
                <ellipse cx="480" cy="428" rx="5" ry="4" fill="#34D399" />
                <ellipse cx="480" cy="438" rx="5" ry="4" fill="#34D399" />
                <circle cx="480" cy="433" r="5" fill="#10B981" />
                <circle cx="480" cy="433" r="3" fill="#FCD34D" />

                {/* Additional flowers */}
                <rect x="849" y="445" width="2" height="12" fill="#22C55E" />
                <circle cx="850" cy="443" r="6" fill="#F472B6" />
                <circle cx="850" cy="443" r="3" fill="#FDE68A" />

                <rect x="349" y="448" width="2" height="12" fill="#22C55E" />
                <circle cx="350" cy="446" r="6" fill="#A78BFA" />
                <circle cx="350" cy="446" r="3" fill="#FDE68A" />
            </g>

            {/* Math hopscotch on ground - more realistic */}
            <g transform="translate(1000, 390)">
                {/* Hopscotch game - realistic chalk drawing */}
                {/* Removed hopscotch squares */}
            </g>

            {/* Bushes in the park */}
            <g>
                <ellipse cx="220" cy="395" rx="35" ry="20" fill="#22C55E" />
                <ellipse cx="200" cy="400" rx="25" ry="15" fill="#16A34A" />
                <ellipse cx="240" cy="400" rx="25" ry="15" fill="#16A34A" />

                <ellipse cx="1150" cy="398" rx="40" ry="22" fill="#22C55E" />
                <ellipse cx="1125" cy="403" rx="28" ry="17" fill="#16A34A" />
                <ellipse cx="1175" cy="403" rx="28" ry="17" fill="#16A34A" />
            </g>
        </svg>
    );
}
