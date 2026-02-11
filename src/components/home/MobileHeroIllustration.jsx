export function MobileHeroIllustration() {
    return (
        <svg
            className="md:hidden absolute inset-0 w-full h-full"
            viewBox="0 0 375 600"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Sky background with gradient */}
            <defs>
                <linearGradient id="skyGradientMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#87CEEB" />
                    <stop offset="100%" stopColor="#B0E5F9" />
                </linearGradient>
                <radialGradient id="sunGradientMobile" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFF176" />
                    <stop offset="70%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#FFA726" />
                </radialGradient>
            </defs>
            <rect x="0" y="0" width="375" height="600" fill="url(#skyGradientMobile)" />

            {/* Sun - top right */}
            <g transform="translate(320, 50)">
                <circle cx="0" cy="0" r="30" fill="url(#sunGradientMobile)" />
                {/* Sun rays */}
                <path d="M 0 -40 L -3 -50 L 3 -50 Z" fill="#FFD700" />
                <path d="M 28 -28 L 35 -38 L 38 -32 Z" fill="#FFD700" />
                <path d="M 40 0 L 50 -3 L 50 3 Z" fill="#FFD700" />
                <path d="M 28 28 L 38 35 L 32 38 Z" fill="#FFD700" />
                <path d="M 0 40 L 3 50 L -3 50 Z" fill="#FFD700" />
                <path d="M -28 28 L -35 38 L -38 32 Z" fill="#FFD700" />
                <path d="M -40 0 L -50 3 L -50 -3 Z" fill="#FFD700" />
                <path d="M -28 -28 L -38 -35 L -32 -38 Z" fill="#FFD700" />
            </g>

            {/* Clouds - scaled for mobile */}
            <g opacity="0.95">
                <ellipse cx="70" cy="60" rx="30" ry="18" fill="white" />
                <ellipse cx="95" cy="65" rx="25" ry="16" fill="white" />
                <ellipse cx="50" cy="65" rx="22" ry="14" fill="white" />
                <ellipse cx="70" cy="72" rx="18" ry="12" fill="white" />

                <ellipse cx="280" cy="55" rx="32" ry="20" fill="white" />
                <ellipse cx="305" cy="60" rx="28" ry="18" fill="white" />
                <ellipse cx="255" cy="60" rx="24" ry="16" fill="white" />
                <ellipse cx="280" cy="68" rx="20" ry="13" fill="white" />
            </g>

            {/* Green grass ground */}
            <rect x="0" y="450" width="375" height="150" fill="#7EC850" />
            <rect x="0" y="450" width="375" height="10" fill="#6BB642" opacity="0.3" />

            {/* Park path - curved */}
            <path d="M 0 490 Q 95 485, 187 495 T 375 488" fill="#D4A76A" />
            <path d="M 0 500 Q 95 495, 187 505 T 375 498" fill="#C19653" />
            <path d="M 0 510 Q 95 505, 187 515 T 375 508" fill="#B08A4A" />

            {/* Tree 1 - Left side - scaled for mobile */}
            <g transform="translate(40, 350)">
                {/* Tree trunk */}
                <ellipse cx="0" cy="105" rx="12" ry="5" fill="#6B3410" />
                <rect x="-10" y="35" width="20" height="70" fill="#8B4513" rx="2" />
                <rect x="-8" y="35" width="7" height="70" fill="#A0522D" rx="1" />

                {/* Tree foliage */}
                <circle cx="0" cy="26" r="35" fill="#2ECC40" />
                <circle cx="-17" cy="39" r="24" fill="#27AE60" />
                <circle cx="17" cy="39" r="24" fill="#27AE60" />
                <circle cx="0" cy="44" r="21" fill="#229A34" />
                <circle cx="-10" cy="22" r="17" fill="#3DDC84" />
                <circle cx="10" cy="22" r="17" fill="#3DDC84" />

                {/* Math symbols on tree */}
                <text x="-10" y="26" fill="#FFD700" fontSize="22" fontWeight="bold" stroke="#FF8C00" strokeWidth="0.7">+</text>
                <text x="8" y="42" fill="#FF6B6B" fontSize="19" fontWeight="bold" stroke="#DC143C" strokeWidth="0.7">×</text>
                <text x="-21" y="50" fill="#4ECDC4" fontSize="18" fontWeight="bold" stroke="#2BA5A0" strokeWidth="0.7">−</text>
            </g>

            {/* Tree 2 - Right side - scaled for mobile */}
            <g transform="translate(335, 345)">
                {/* Tree trunk */}
                <ellipse cx="0" cy="115" rx="15" ry="7" fill="#6B3410" />
                <rect x="-12" y="39" width="24" height="76" fill="#8B4513" rx="2" />
                <rect x="-9" y="39" width="8" height="76" fill="#A0522D" rx="1" />

                {/* Tree foliage */}
                <circle cx="0" cy="30" r="37" fill="#3DDC84" />
                <circle cx="-20" cy="43" rx="27" ry="27" fill="#2ECC40" />
                <circle cx="20" cy="43" rx="27" ry="27" fill="#2ECC40" />
                <circle cx="0" cy="47" r="23" fill="#27AE60" />
                <circle cx="-13" cy="26" r="20" fill="#4ADE80" />
                <circle cx="13" cy="26" r="20" fill="#4ADE80" />

                {/* Math symbols on tree */}
                <text x="-12" y="30" fill="#FF6B6B" fontSize="23" fontWeight="bold" stroke="#DC143C" strokeWidth="0.7">÷</text>
                <text x="7" y="47" fill="#FFD700" fontSize="20" fontWeight="bold" stroke="#FF8C00" strokeWidth="0.7">=</text>
                <text x="-19" y="56" fill="#4ECDC4" fontSize="19" fontWeight="bold" stroke="#2BA5A0" strokeWidth="0.7">π</text>
            </g>

            {/* Tree 3 - Middle - scaled for mobile */}
            <g transform="translate(187, 360)">
                {/* Tree trunk */}
                <ellipse cx="0" cy="90" rx="11" ry="5" fill="#6B3410" />
                <rect x="-8" y="30" width="16" height="60" fill="#8B4513" rx="2" />
                <rect x="-7" y="30" width="5" height="60" fill="#A0522D" rx="1" />

                {/* Tree foliage */}
                <circle cx="0" cy="22" r="30" fill="#2ECC40" />
                <circle cx="-15" cy="34" r="22" fill="#27AE60" />
                <circle cx="15" cy="34" r="22" fill="#27AE60" />
                <circle cx="0" cy="38" r="19" fill="#229A34" />
                <circle cx="-8" cy="17" r="15" fill="#3DDC84" />
                <circle cx="8" cy="17" r="15" fill="#3DDC84" />

                {/* Math symbols on tree */}
                <text x="-8" y="22" fill="#FF6B6B" fontSize="19" fontWeight="bold" stroke="#DC143C" strokeWidth="0.7">√</text>
                <text x="5" y="36" fill="#FFD700" fontSize="16" fontWeight="bold" stroke="#FF8C00" strokeWidth="0.7">²</text>
            </g>

            {/* Playground swing set - scaled for mobile */}
            <g transform="translate(100, 395)">
                {/* Swing frame */}
                <polygon points="0,85 20,0 23,0 3,85" fill="#E74C3C" />
                <polygon points="60,85 40,0 37,0 57,85" fill="#E74C3C" />
                <rect x="18" y="-4" width="23" height="8" fill="#C0392B" rx="1.5" />
                <ellipse cx="20" cy="0" rx="5" ry="3" fill="#922B21" />
                <ellipse cx="40" cy="0" rx="5" ry="3" fill="#922B21" />

                {/* Ground support */}
                <ellipse cx="1.5" cy="85" rx="8" ry="4" fill="#A0522D" />
                <ellipse cx="58.5" cy="85" rx="8" ry="4" fill="#A0522D" />

                {/* Swing 1 with chains */}
                <rect x="22" y="0" width="2" height="63" fill="#708090" rx="0.7" />
                <rect x="21" y="63" width="11" height="10" fill="#FFD700" rx="2" />
                <rect x="21" y="64" width="11" height="3" fill="#FFA726" rx="0.7" />
                <text x="23" y="72" fill="white" fontSize="10" fontWeight="bold">5</text>

                {/* Swing 2 with chains */}
                <rect x="36" y="0" width="2" height="72" fill="#708090" rx="0.7" />
                <rect x="33" y="72" width="11" height="10" fill="#FF6B6B" rx="2" />
                <rect x="33" y="73" width="11" height="3" fill="#E74C3C" rx="0.7" />
                <text x="35" y="81" fill="white" fontSize="10" fontWeight="bold">8</text>
            </g>

            {/* Slide - scaled for mobile */}
            <g transform="translate(240, 400)">
                {/* Slide base/ground */}
                <ellipse cx="57" cy="87" rx="13" ry="5" fill="#A0522D" />

                {/* Slide ladder */}
                <rect x="-1" y="34" width="5" height="53" fill="#3498DB" rx="1.5" />
                <rect x="0" y="34" width="3" height="53" fill="#5DADE2" rx="0.7" />
                <rect x="0" y="74" width="12" height="3" fill="#2E86C1" rx="0.7" />
                <rect x="0" y="62" width="12" height="3" fill="#2E86C1" rx="0.7" />
                <rect x="0" y="50" width="12" height="3" fill="#2E86C1" rx="0.7" />

                {/* Slide top platform */}
                <rect x="-3" y="31" width="17" height="6" fill="#3498DB" rx="1.5" />

                {/* Slide surface */}
                <path d="M 3 36 Q 30 59, 57 87" fill="none" stroke="#FFC107" strokeWidth="19" strokeLinecap="round" />
                <path d="M 3 36 Q 30 59, 57 87" fill="none" stroke="#FFD54F" strokeWidth="12" strokeLinecap="round" />

                {/* Slide sides */}
                <path d="M 3 34 Q 30 57, 57 85" fill="none" stroke="#FFA726" strokeWidth="2" />
                <path d="M 3 38 Q 30 61, 57 89" fill="none" stroke="#FFA726" strokeWidth="2" />

                {/* Math equation on slide */}
                <text x="20" y="61" fill="#E74C3C" fontSize="14" fontWeight="bold" stroke="#C0392B" strokeWidth="0.4">2+3</text>
            </g>

            {/* Child 1 - Playing with ball - scaled for mobile */}
            <g transform="translate(120, 470)">
                {/* Shadow */}
                <ellipse cx="0" cy="30" rx="10" ry="3" fill="#5A8C4E" opacity="0.3" />

                {/* Legs */}
                <ellipse cx="-4" cy="24" rx="3" ry="6" fill="#3B82F6" />
                <ellipse cx="4" cy="24" rx="3" ry="6" fill="#2563EB" />
                {/* Shoes */}
                <ellipse cx="-4" cy="29" rx="4" ry="2.5" fill="#1F2937" />
                <ellipse cx="4" cy="29" rx="4" ry="2.5" fill="#1F2937" />

                {/* Body */}
                <ellipse cx="0" cy="12" rx="6" ry="9" fill="#EF4444" />
                <ellipse cx="0" cy="11" rx="5" ry="7" fill="#F87171" />

                {/* Arms */}
                <ellipse cx="-8" cy="11" rx="2.5" ry="5" fill="#EF4444" transform="rotate(-20 -8 11)" />
                <ellipse cx="8" cy="11" rx="2.5" ry="5" fill="#DC2626" transform="rotate(20 8 11)" />

                {/* Head */}
                <circle cx="0" cy="2" r="8" fill="#FDE68A" />
                <circle cx="0" cy="2" r="7" fill="#FEF3C7" />

                {/* Face */}
                <circle cx="-2.5" cy="1.5" r="1" fill="#1F2937" />
                <circle cx="2.5" cy="1.5" r="1" fill="#1F2937" />
                <path d="M -2 4.5 Q 0 6, 2 4.5" stroke="#1F2937" strokeWidth="1" fill="none" />

                {/* Hair */}
                <path d="M -5 -3 Q -6 -5, -4 -6 Q -2 -7, 0 -6.5 Q 2 -7, 4 -6 Q 6 -5, 5 -3" fill="#92400E" />

                {/* Ball with number */}
                <circle cx="18" cy="-5" r="7" fill="#10B981" />
                <circle cx="18" cy="-5" r="6" fill="#34D399" />
                <text x="15" y="-2" fill="white" fontSize="8" fontWeight="bold">7</text>
            </g>

            {/* Child 2 - Running with kite - scaled for mobile */}
            <g transform="translate(255, 468)">
                {/* Shadow */}
                <ellipse cx="0" cy="32" rx="10" ry="3" fill="#5A8C4E" opacity="0.3" />

                {/* Legs */}
                <ellipse cx="-5" cy="25" rx="3" ry="7" fill="#EC4899" transform="rotate(-15 -5 25)" />
                <ellipse cx="4" cy="26" rx="3" ry="6" fill="#DB2777" transform="rotate(10 4 26)" />
                {/* Shoes */}
                <ellipse cx="-6" cy="30" rx="4" ry="2.5" fill="#1F2937" transform="rotate(-10 -6 30)" />
                <ellipse cx="4" cy="31" rx="4" ry="2.5" fill="#1F2937" />

                {/* Body */}
                <ellipse cx="0" cy="14" rx="6" ry="8" fill="#10B981" transform="rotate(5 0 14)" />
                <ellipse cx="0" cy="13" rx="5" ry="6.5" fill="#34D399" transform="rotate(5 0 13)" />

                {/* Arms */}
                <ellipse cx="-6" cy="15" rx="2.5" ry="5.5" fill="#10B981" transform="rotate(-25 -6 15)" />
                <ellipse cx="10" cy="7" rx="2.5" ry="6" fill="#059669" transform="rotate(35 10 7)" />

                {/* Head */}
                <circle cx="0" cy="3" r="8" fill="#FDE68A" />
                <circle cx="0" cy="3" r="7" fill="#FEF3C7" />

                {/* Face */}
                <circle cx="-2.5" cy="2.5" r="1" fill="#1F2937" />
                <circle cx="2.5" cy="2.5" r="1" fill="#1F2937" />
                <path d="M -2 5.5 Q 0 7, 2 5.5" stroke="#1F2937" strokeWidth="1" fill="none" />

                {/* Hair */}
                <path d="M -5.5 -2 Q -7 -4, -5 -5 Q -2.5 -6, 0 -5.5 Q 2.5 -6, 5 -5 Q 7 -4, 5.5 -2" fill="#78350F" />

                {/* Kite - diamond */}
                <path d="M 25 -40 L 35 -25 L 25 -15 L 15 -25 Z" fill="#EF4444" />
                <path d="M 25 -40 L 35 -25 L 25 -15 L 15 -25 Z" fill="none" stroke="#991B1B" strokeWidth="1.5" />
                <line x1="25" y1="-40" x2="25" y2="-15" stroke="#991B1B" strokeWidth="1" />
                <line x1="15" y1="-25" x2="35" y2="-25" stroke="#991B1B" strokeWidth="1" />
                <text x="20" y="-23" fill="white" fontSize="10" fontWeight="bold">Δ</text>

                {/* Kite tail bows */}
                <circle cx="25" cy="-12" r="2" fill="#FCD34D" />
                <circle cx="24" cy="-6" r="2" fill="#60A5FA" />
                <circle cx="26" cy="0" r="2" fill="#34D399" />

                {/* Kite string */}
                <path d="M 11 7 Q 18 -6, 25 -15" stroke="#94A3B8" strokeWidth="1" fill="none" />
            </g>

            {/* Park bench - scaled for mobile */}
            <g transform="translate(180, 480)">
                {/* Bench legs */}
                <rect x="3" y="12" width="4" height="16" fill="#6B4423" rx="0.5" />
                <rect x="26" y="12" width="4" height="16" fill="#6B4423" rx="0.5" />

                {/* Bench seat */}
                <rect x="0" y="9" width="33" height="6" fill="#D4A76A" rx="1" />
                <rect x="1" y="10" width="31" height="2.5" fill="#E6BE8A" rx="0.5" />

                {/* Bench back */}
                <rect x="0" y="0" width="33" height="4" fill="#D4A76A" rx="0.5" />
                <rect x="1" y="0.5" width="31" height="2" fill="#E6BE8A" rx="0.3" />
                <rect x="3" y="4" width="4" height="8" fill="#6B4423" rx="0.5" />
                <rect x="26" y="4" width="4" height="8" fill="#6B4423" rx="0.5" />

                {/* Math book on bench */}
                <rect x="10" y="6" width="13" height="10" fill="#2874A6" stroke="#1B4F72" strokeWidth="1" rx="0.5" />
                <rect x="10.5" y="6.5" width="2" height="10" fill="#1B4F72" />
                <text x="12" y="13" fill="#F8F9F9" fontSize="6" fontWeight="bold">123</text>
            </g>

            {/* Park bench - additional detail */}
            <g transform="translate(175, 460)">
                {/* Ground shadow */}
                <ellipse cx="18" cy="31" rx="21" ry="4" fill="#5A8C4E" opacity="0.3" />

                {/* Bench legs */}
                <rect x="3" y="13" width="5" height="18" fill="#6B4423" rx="0.7" />
                <rect x="3.7" y="13" width="2" height="18" fill="#8B5A2B" rx="0.3" />
                <rect x="29" y="13" width="5" height="18" fill="#6B4423" rx="0.7" />
                <rect x="29.7" y="13" width="2" height="18" fill="#8B5A2B" rx="0.3" />

                {/* Bench seat */}
                <rect x="0" y="10" width="37" height="7" fill="#D4A76A" rx="1.3" />
                <rect x="1.3" y="10.7" width="34" height="2.7" fill="#E6BE8A" rx="0.7" />
                <line x1="9" y1="10" x2="9" y2="17" stroke="#B8956A" strokeWidth="1" />
                <line x1="18" y1="10" x2="18" y2="17" stroke="#B8956A" strokeWidth="1" />
                <line x1="27" y1="10" x2="27" y2="17" stroke="#B8956A" strokeWidth="1" />

                {/* Bench back */}
                <rect x="0" y="0" width="37" height="5" fill="#D4A76A" rx="0.7" />
                <rect x="1.3" y="0.7" width="34" height="2" fill="#E6BE8A" rx="0.3" />
                <rect x="3" y="5" width="5" height="9" fill="#6B4423" rx="0.7" />
                <rect x="3.7" y="5" width="2" height="9" fill="#8B5A2B" rx="0.3" />
                <rect x="29" y="5" width="5" height="9" fill="#6B4423" rx="0.7" />
                <rect x="29.7" y="5" width="2" height="9" fill="#8B5A2B" rx="0.3" />

                {/* Math book on bench */}
                <rect x="10.7" y="6" width="14.7" height="10.7" fill="#2874A6" stroke="#1B4F72" strokeWidth="1" rx="0.7" />
                <rect x="11.4" y="6.7" width="2" height="10.7" fill="#1B4F72" />
                <line x1="14.7" y1="8.7" x2="23.4" y2="8.7" stroke="#AED6F1" strokeWidth="1" />
                <line x1="14.7" y1="10.7" x2="23.4" y2="10.7" stroke="#AED6F1" strokeWidth="1" />
                <line x1="14.7" y1="12.7" x2="21.4" y2="12.7" stroke="#AED6F1" strokeWidth="1" />
                <text x="13.4" y="14.7" fill="#F8F9F9" fontSize="6.7" fontWeight="bold">123</text>
            </g>

            {/* Child 3 - Sitting and reading */}
            <g transform="translate(50, 480)">
                {/* Shadow */}
                <ellipse cx="0" cy="27" rx="12" ry="3.4" fill="#5A8C4E" opacity="0.3" />

                {/* Legs - sitting */}
                <ellipse cx="-6.7" cy="21.4" rx="4" ry="6.7" fill="#3B82F6" transform="rotate(-80 -6.7 21.4)" />
                <ellipse cx="6.7" cy="21.4" rx="4" ry="6.7" fill="#2563EB" transform="rotate(80 6.7 21.4)" />
                {/* Shoes */}
                <ellipse cx="-9.4" cy="24.1" rx="4" ry="2.7" fill="#1F2937" />
                <ellipse cx="9.4" cy="24.1" rx="4" ry="2.7" fill="#1F2937" />

                {/* Body */}
                <ellipse cx="0" cy="12" rx="7.4" ry="8.7" fill="#8B5CF6" />
                <ellipse cx="0" cy="11.4" rx="6" ry="6.7" fill="#A78BFA" />

                {/* Arms - holding book */}
                <ellipse cx="-10" cy="14.7" rx="2.7" ry="5.4" fill="#8B5CF6" transform="rotate(-40 -10 14.7)" />
                <ellipse cx="10" cy="14.7" rx="2.7" ry="5.4" fill="#7C3AED" transform="rotate(40 10 14.7)" />

                {/* Head */}
                <circle cx="0" cy="2" r="8" fill="#FDE68A" />
                <circle cx="0" cy="2" r="6.7" fill="#FEF3C7" />

                {/* Face */}
                <circle cx="-2.3" cy="1.4" r="1" fill="#1F2937" />
                <circle cx="2.3" cy="1.4" r="1" fill="#1F2937" />
                <path d="M -1.4 4.7 Q 0 5.4, 1.4 4.7" stroke="#1F2937" strokeWidth="1" fill="none" />

                {/* Hair */}
                <path d="M -5.4 -2.7 Q -6.7 -4.7, -4.7 -6 Q -2 -7.4, 0 -6.7 Q 2 -7.4, 4.7 -6 Q 6.7 -4.7, 5.4 -2.7" fill="#DC2626" />

                {/* Book with equation */}
                <rect x="-12" y="13.4" width="24" height="16" fill="white" stroke="#3B82F6" strokeWidth="1.7" rx="1.3" />
                <rect x="-11.4" y="14" width="2.7" height="16" fill="#DBEAFE" />
                <line x1="-8" y1="17.4" x2="9.4" y2="17.4" stroke="#93C5FD" strokeWidth="0.7" />
                <line x1="-8" y1="20" x2="9.4" y2="20" stroke="#93C5FD" strokeWidth="0.7" />
                <line x1="-8" y1="22.7" x2="6.7" y2="22.7" stroke="#93C5FD" strokeWidth="0.7" />
                <text x="-8" y="21.4" fill="#1E40AF" fontSize="8" fontWeight="bold">a+b=c</text>
            </g>

            {/* Child 4 - Jumping */}
            <g transform="translate(310, 463)">
                {/* Shadow */}
                <ellipse cx="0" cy="37" rx="9.4" ry="2.7" fill="#5A8C4E" opacity="0.3" />

                {/* Legs - jumping */}
                <ellipse cx="-6" cy="28.1" rx="3.4" ry="7.4" fill="#10B981" transform="rotate(-25 -6 28.1)" />
                <ellipse cx="6" cy="28.1" rx="3.4" ry="7.4" fill="#059669" transform="rotate(25 6 28.1)" />
                {/* Shoes */}
                <ellipse cx="-7.4" cy="33.4" rx="4" ry="2.7" fill="#1F2937" transform="rotate(-15 -7.4 33.4)" />
                <ellipse cx="7.4" cy="33.4" rx="4" ry="2.7" fill="#1F2937" transform="rotate(15 7.4 33.4)" />

                {/* Body */}
                <ellipse cx="0" cy="13.4" rx="7.4" ry="9.4" fill="#EC4899" />
                <ellipse cx="0" cy="12.7" rx="6" ry="7.4" fill="#F472B6" />

                {/* Arms - raised */}
                <ellipse cx="-10.7" cy="9.4" rx="2.7" ry="6" fill="#EC4899" transform="rotate(-45 -10.7 9.4)" />
                <ellipse cx="10.7" cy="9.4" rx="2.7" ry="6" fill="#DB2777" transform="rotate(45 10.7 9.4)" />

                {/* Head */}
                <circle cx="0" cy="2.7" r="8.7" fill="#FDE68A" />
                <circle cx="0" cy="2.7" r="7.4" fill="#FEF3C7" />

                {/* Face - happy */}
                <circle cx="-2.7" cy="2" r="1" fill="#1F2937" />
                <circle cx="2.7" cy="2" r="1" fill="#1F2937" />
                <path d="M -2.7 5.4 Q 0 7.4, 2.7 5.4" stroke="#1F2937" strokeWidth="1" fill="none" />

                {/* Hair */}
                <path d="M -6 -2.7 Q -7.4 -4.7, -5.4 -6 Q -2.7 -7.4, 0 -6.7 Q 2.7 -7.4, 5.4 -6 Q 7.4 -4.7, 6 -2.7" fill="#0EA5E9" />
            </g>

            {/* Floating math symbols - more prominent */}
            <g opacity="0.8">
                <text x="133" y="120" fill="#FF6B6B" fontSize="27" fontWeight="bold" stroke="#DC143C" strokeWidth="1.3">+</text>
                <text x="280" y="150" fill="#3B82F6" fontSize="28" fontWeight="bold" stroke="#1E40AF" strokeWidth="1.3">−</text>
                <text x="53" y="200" fill="#10B981" fontSize="25" fontWeight="bold" stroke="#059669" strokeWidth="1.3">×</text>
                <text x="213" y="117" fill="#FFD700" fontSize="27" fontWeight="bold" stroke="#FF8C00" strokeWidth="1.3">÷</text>
                <text x="93" y="150" fill="#8B5CF6" fontSize="24" fontWeight="bold" stroke="#6D28D9" strokeWidth="1.3">=</text>
                <text x="307" y="210" fill="#EC4899" fontSize="23" fontWeight="bold" stroke="#DB2777" strokeWidth="1.3">√</text>
            </g>

            {/* More flowers - realistic */}
            <g>
                {/* Flower 1 - Red */}
                <rect x="65" y="518" width="1.4" height="10" fill="#22C55E" />
                <ellipse cx="63" cy="514" rx="2.7" ry="3.4" fill="#FF6B6B" />
                <ellipse cx="70" cy="514" rx="2.7" ry="3.4" fill="#FF6B6B" />
                <ellipse cx="66.5" cy="510" rx="3.4" ry="2.7" fill="#FF6B6B" />
                <ellipse cx="66.5" cy="518" rx="3.4" ry="2.7" fill="#FF6B6B" />
                <circle cx="66.5" cy="514" r="3.4" fill="#EF4444" />
                <circle cx="66.5" cy="514" r="2" fill="#FCD34D" />

                {/* Flower 2 - Cyan */}
                <rect x="347" y="528" width="1.4" height="10" fill="#22C55E" />
                <ellipse cx="345" cy="524" rx="2.7" ry="3.4" fill="#4ECDC4" />
                <ellipse cx="352" cy="524" rx="2.7" ry="3.4" fill="#4ECDC4" />
                <ellipse cx="348.5" cy="520" rx="3.4" ry="2.7" fill="#4ECDC4" />
                <ellipse cx="348.5" cy="528" rx="3.4" ry="2.7" fill="#4ECDC4" />
                <circle cx="348.5" cy="524" r="3.4" fill="#22D3EE" />
                <circle cx="348.5" cy="524" r="2" fill="#FCD34D" />

                {/* Flower 3 - Green */}
                <rect x="160" y="523" width="1.4" height="10" fill="#22C55E" />
                <ellipse cx="158" cy="520" rx="2.7" ry="3.4" fill="#34D399" />
                <ellipse cx="165" cy="520" rx="2.7" ry="3.4" fill="#34D399" />
                <ellipse cx="161.5" cy="516" rx="3.4" ry="2.7" fill="#34D399" />
                <ellipse cx="161.5" cy="524" rx="3.4" ry="2.7" fill="#34D399" />
                <circle cx="161.5" cy="520" r="3.4" fill="#10B981" />
                <circle cx="161.5" cy="520" r="2" fill="#FCD34D" />

                {/* Additional flowers */}
                <rect x="226" y="533" width="1.4" height="8" fill="#22C55E" />
                <circle cx="227" cy="531" r="4" fill="#F472B6" />
                <circle cx="227" cy="531" r="2" fill="#FDE68A" />

                <rect x="116" y="535" width="1.4" height="8" fill="#22C55E" />
                <circle cx="117" cy="533" r="4" fill="#A78BFA" />
                <circle cx="117" cy="533" r="2" fill="#FDE68A" />
            </g>

            {/* Bushes */}
            <g>
                <ellipse cx="90" cy="470" rx="20" ry="12" fill="#22C55E" />
                <ellipse cx="75" cy="474" rx="15" ry="9" fill="#16A34A" />
                <ellipse cx="105" cy="474" rx="15" ry="9" fill="#16A34A" />

                <ellipse cx="285" cy="472" rx="22" ry="13" fill="#22C55E" />
                <ellipse cx="268" cy="476" rx="16" ry="10" fill="#16A34A" />
                <ellipse cx="302" cy="476" rx="16" ry="10" fill="#16A34A" />

                <ellipse cx="150" cy="476" rx="24" ry="14" fill="#22C55E" />
                <ellipse cx="132" cy="480" rx="17" ry="10" fill="#16A34A" />
                <ellipse cx="168" cy="480" rx="17" ry="10" fill="#16A34A" />
            </g>
        </svg>
    );
}
