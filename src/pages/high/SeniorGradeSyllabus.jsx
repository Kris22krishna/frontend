import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import LoginPromptModal from '../../components/auth/LoginPromptModal';

import SEO from '../../components/common/SEO';
import { BookOpen, ChevronRight, Hash, Activity, X, Grid, Layout } from 'lucide-react';
import { LatexText } from '../../components/LatexText';
import { capitalizeFirstLetter } from '../../lib/stringUtils';
import './SeniorGradeSyllabus.css';

const SeniorGradeSyllabus = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [pendingSkill, setPendingSkill] = useState(null);

    // Grid + Modal Logic
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [expandedSubtopic, setExpandedSubtopic] = useState(null);

    const navigateToSkill = (skill) => {
        if (skill.isLocal) {
            navigate(skill.path);
        } else {
            navigate(`/high/practice/${skill.skill_id}`, { state: { grade: grade } });
        }
    };

    const handleSkillClick = (skill) => {
        if (!isAuthenticated && grade === '10') {
            setPendingSkill(skill);
            setShowLoginModal(true);
        } else {
            navigateToSkill(skill);
        }
    };

    const handleLoginSuccess = () => {
        if (pendingSkill) {
            navigateToSkill(pendingSkill);
            setPendingSkill(null);
        }
    };

    // Fetch Skills or Set Hardcoded for Grade 10
    useEffect(() => {
        const fetchSkills = async () => {
            setLoading(true);
            try {
                if (grade === '11') {
                    // Grade 11 uses a special subject picker, no skills needed
                    setSkills([]);
                } else if (grade === '12') {
                    setSkills([
                        { skill_id: 12000, skill_name: 'Matrices: Interactive Chapter', topic: 'Matrices', subtopic: 'Complete Chapter', isLocal: true, path: '/senior/grade/12/matrices' }
                    ]);
                } else if (grade === '10') {
                    setSkills([
                        { skill_id: 10031, skill_name: 'Form a pair of linear equations from word problems', topic: 'Pair of Linear Equations in Two Variables', subtopic: 'Forming Linear Equations from Real-Life Situations' },

                        { skill_id: 10041, skill_name: 'Rewrite linear equations in the form ax + by + c = 0', topic: 'Pair of Linear Equations in Two Variables', subtopic: 'Rewriting Linear Equations in Standard Form' },

                        { skill_id: 10021, skill_name: 'Identify the Number of Solutions from Line Relationships', topic: 'Pair of Linear Equations in Two Variables', subtopic: 'Number of Solutions of a Pair of Linear Equations' },
                        { skill_id: 10022, skill_name: 'Identify the number of solutions using algebraic conditions', topic: 'Pair of Linear Equations in Two Variables', subtopic: 'Number of Solutions of a Pair of Linear Equations' },

                        { skill_id: 10011, skill_name: 'Solve a pair of linear equations by graphing', topic: 'Pair of Linear Equations in Two Variables', subtopic: 'Pair of Linear Equations – Graphical Representation' },

                        { skill_id: 10051, skill_name: 'Check whether a given ordered pair is a solution', topic: 'Pair of Linear Equations in Two Variables', subtopic: 'Solving Pair of Linear Equations Algebraically' },
                        { skill_id: 10052, skill_name: 'Solve equations using substitution (no word problems)', topic: 'Pair of Linear Equations in Two Variables', subtopic: 'Solving Pair of Linear Equations Algebraically' },
                        { skill_id: 10053, skill_name: 'Solve word problems using substitution', topic: 'Pair of Linear Equations in Two Variables', subtopic: 'Solving Pair of Linear Equations Algebraically' },
                        { skill_id: 10054, skill_name: 'Solve equations using elimination (no word problems)', topic: 'Pair of Linear Equations in Two Variables', subtopic: 'Solving Pair of Linear Equations Algebraically' },
                        { skill_id: 10055, skill_name: 'Solve word problems using elimination', topic: 'Pair of Linear Equations in Two Variables', subtopic: 'Solving Pair of Linear Equations Algebraically' },
                        { skill_id: 1209, skill_name: 'Pair of Linear Equations Chapter Assessment', topic: 'Pair of Linear Equations in Two Variables', subtopic: 'Pair of Linear Equations Chapter Assessment' },

                        // Real Numbers
                        { skill_id: 1111, skill_name: 'Understanding Real Numbers', topic: 'Real Numbers', subtopic: 'Real Number Foundations' },
                        { skill_id: 1112, skill_name: 'Euclid’s Division Algorithm', topic: 'Real Numbers', subtopic: 'Euclid\'s Division Lemma' },
                        { skill_id: 1113, skill_name: 'Prime Factorisation', topic: 'Real Numbers', subtopic: 'The Fundamental Theorem of Arithmetic' },
                        { skill_id: 1114, skill_name: 'Fundamental Theorem of Arithmetic', topic: 'Real Numbers', subtopic: 'The Fundamental Theorem of Arithmetic' },
                        { skill_id: 1115, skill_name: 'HCF and LCM Using Prime Factorisation', topic: 'Real Numbers', subtopic: 'The Fundamental Theorem of Arithmetic' },
                        { skill_id: 1116, skill_name: 'Applications of HCF and LCM', topic: 'Real Numbers', subtopic: 'The Fundamental Theorem of Arithmetic' },
                        { skill_id: 1117, skill_name: 'Proving Irrational Numbers', topic: 'Real Numbers', subtopic: 'Revisiting Irrational Numbers' },
                        { skill_id: 1118, skill_name: 'Operations on Irrational Numbers', topic: 'Real Numbers', subtopic: 'Revisiting Irrational Numbers' },
                        { skill_id: 1119, skill_name: 'Real Numbers Chapter Assessment', topic: 'Real Numbers', subtopic: 'Real Numbers Chapter Assessment' },

                        // Arithmetic Progressions
                        { skill_id: 1105, skill_name: 'Number Patterns Recognition', topic: 'Arithmetic Progressions', subtopic: 'Patterns and AP Fundamentals' },
                        { skill_id: 1106, skill_name: 'Understanding Arithmetic Progressions', topic: 'Arithmetic Progressions', subtopic: 'Patterns and AP Fundamentals' },
                        { skill_id: 1107, skill_name: 'Identifying Terms and Common Difference', topic: 'Arithmetic Progressions', subtopic: 'Identifying Terms and Common Difference' },
                        { skill_id: 1108, skill_name: 'Finding Specific Terms of an AP', topic: 'Arithmetic Progressions', subtopic: 'Finding Specific Terms of an AP' },
                        { skill_id: 1109, skill_name: 'Finding the Sum of Terms of an AP', topic: 'Arithmetic Progressions', subtopic: 'Finding the Sum of Terms of an AP' },
                        { skill_id: 1110, skill_name: 'Arithmetic Progressions Chapter Assessment', topic: 'Arithmetic Progressions', subtopic: 'Chapter Test' },

                        // Quadratic Equations
                        { skill_id: 1120, skill_name: 'Understanding Quadratic Equations', topic: 'Quadratic Equations', subtopic: 'Foundations and Meaning of Quadratic Equations' },
                        { skill_id: 1121, skill_name: 'Forming Quadratic Equations', topic: 'Quadratic Equations', subtopic: 'Representing Real-Life Situations Mathematically' },
                        { skill_id: 1122, skill_name: 'Checking Whether an Equation Is Quadratic', topic: 'Quadratic Equations', subtopic: 'Identifying and Verifying Quadratic Equations' },
                        { skill_id: 1123, skill_name: 'Solving Quadratic Equations by Factorisation', topic: 'Quadratic Equations', subtopic: 'Finding Roots by Factorisation' },
                        { skill_id: 1124, skill_name: 'Applying Quadratic Equations to Word Problems', topic: 'Quadratic Equations', subtopic: 'Solving Word Problems Using Factorisation' },
                        { skill_id: 1125, skill_name: 'Understanding the Nature of Roots', topic: 'Quadratic Equations', subtopic: 'Understanding Roots and Their Nature' },
                        { skill_id: 1126, skill_name: 'Finding Roots Using the Discriminant', topic: 'Quadratic Equations', subtopic: 'Using the Discriminant to Analyse Roots' },
                        { skill_id: 1127, skill_name: 'Real-Life Applications of Quadratic Equations', topic: 'Quadratic Equations', subtopic: 'Applying Quadratic Equations to Real-Life Situations' },
                        { skill_id: 1128, skill_name: 'Quadratic Equations Chapter Assessment', topic: 'Quadratic Equations', subtopic: 'Quadratic Equations Chapter Assessment' }
                    ]);
                } else if (grade === '8') {
                    // Set all 9 Grade 8 skills for proper counting
                    setSkills([
                        { skill_id: 'local-8-exp-negative', skill_name: 'Powers with Negative Exponents', topic: 'Exponents and Powers' },
                        { skill_id: 'local-8-exp-laws', skill_name: 'Laws of Exponents', topic: 'Exponents and Powers' },
                        { skill_id: 'local-8-exp-application', skill_name: 'Application of Laws of Exponents', topic: 'Exponents and Powers' },
                        { skill_id: 'local-8-exp-standard', skill_name: 'Standard Form for Small Numbers', topic: 'Exponents and Powers' },
                        { skill_id: 'local-8-exp-comparing', skill_name: 'Comparing Large and Small Numbers', topic: 'Exponents and Powers' },
                        { skill_id: 'local-8-rn-commutativity', skill_name: 'Commutativity', topic: 'Rational Numbers' },
                        { skill_id: 'local-8-rn-associativity', skill_name: 'Associativity', topic: 'Rational Numbers' },
                        { skill_id: 'local-8-rn-identity', skill_name: 'Additive and Multiplicative Identity', topic: 'Rational Numbers' },
                        { skill_id: 'local-8-rn-distributivity', skill_name: 'Distributivity', topic: 'Rational Numbers' },
                        { skill_id: 'local-8-mens-polygon', skill_name: 'Area of Polygon', topic: 'Mensuration' },
                        { skill_id: 'local-8-mens-sa-cuboid', skill_name: 'Surface Area of Cuboid', topic: 'Mensuration' },
                        { skill_id: 'local-8-mens-sa-cube', skill_name: 'Surface Area of Cube', topic: 'Mensuration' },
                        { skill_id: 'local-8-mens-sa-cylinder', skill_name: 'Surface Area of Cylinder', topic: 'Mensuration' },
                        { skill_id: 'local-8-mens-vol-cube', skill_name: 'Volume of Cube', topic: 'Mensuration' },
                        { skill_id: 'local-8-mens-vol-cuboid', skill_name: 'Volume of Cuboid', topic: 'Mensuration' },
                        { skill_id: 'local-8-mens-vol-cylinder', skill_name: 'Volume of Cylinder', topic: 'Mensuration' },
                        { skill_id: 'local-8-mens-vol-capacity', skill_name: 'Volume and Capacity', topic: 'Mensuration' },
                        { skill_id: 'local-8-fact-common', skill_name: 'Method of Common Factors', topic: 'Factorisation' },
                        { skill_id: 'local-8-fact-regrouping', skill_name: 'Factorisation by Regrouping', topic: 'Factorisation' },
                        { skill_id: 'local-8-fact-identities', skill_name: 'Factorisation Using Identities', topic: 'Factorisation' },
                        { skill_id: 'local-8-fact-form-xpla-xplb', skill_name: 'Factors of the form (x+a)(x+b)', topic: 'Factorisation' },
                        { skill_id: 'local-8-fact-div-mono-mono', skill_name: 'Division of Monomial by Monomial', topic: 'Factorisation' },
                        { skill_id: 'local-8-fact-div-poly-mono', skill_name: 'Division of Polynomial by Monomial', topic: 'Factorisation' },
                        { skill_id: 'local-8-fact-div-poly-poly', skill_name: 'Division of Polynomial by Polynomial', topic: 'Factorisation' },
                        { skill_id: 'local-8-exp-test', skill_name: 'Exponents and Powers Chapter Assessment', topic: 'Exponents and Powers' },
                        { skill_id: 'local-8-rn-test', skill_name: 'Rational Numbers Chapter Assessment', topic: 'Rational Numbers' },
                        { skill_id: 'local-8-mens-test', skill_name: 'Mensuration Chapter Assessment', topic: 'Mensuration' },
                        { skill_id: 'local-8-fact-test', skill_name: 'Factorisation Chapter Assessment', topic: 'Factorisation' },
                        { skill_id: '1247', skill_name: 'Identify Perfect Squares', topic: 'Squares and Square Roots' },
                        { skill_id: '1248', skill_name: 'Properties of Square Numbers', topic: 'Squares and Square Roots' },
                        { skill_id: '1249', skill_name: 'Square Using Identity Patterns', topic: 'Squares and Square Roots' },
                        { skill_id: '1250', skill_name: 'Pythagorean Triplets', topic: 'Squares and Square Roots' },
                        { skill_id: '1251', skill_name: 'Concept of Square Root', topic: 'Squares and Square Roots' },
                        { skill_id: '1252', skill_name: 'Square Root via Prime Factorization', topic: 'Squares and Square Roots' },
                        { skill_id: '1253', skill_name: 'Square Root via Long Division', topic: 'Squares and Square Roots' },
                        { skill_id: '1254', skill_name: 'Square Root of Decimals', topic: 'Squares and Square Roots' },
                        { skill_id: '1255', skill_name: 'Squares and Square Roots Test', topic: 'Squares and Square Roots' }
                    ]);
                } else {
                    const response = await api.getSkills(grade);
                    setSkills(response || []);
                }
            } catch (error) {
                console.error("Failed to fetch skills", error);
            } finally {
                setLoading(false);
            }
        };

        if (grade) {
            fetchSkills();
        }
    }, [grade]);

    // Group skills by topic (Chapter Level)
    const skillsByTopic = (skills || []).reduce((acc, skill) => {
        const topicName = (skill.topic || 'General').toLowerCase();
        const gradeNum = parseInt(grade.replace('grade', ''));

        // Filter by grade - Grade 8: we'll hardcode everything, so skip database skills
        if (gradeNum === 8) return acc;

        const topic = skill.topic || 'General';
        if (!acc[topic]) acc[topic] = [];
        acc[topic].push(skill);
        return acc;
    }, {});

    // Hardcode all Grade 8 skills for Exponents and Powers (5 skills)
    if (parseInt(grade.replace('grade', '')) === 8) {
        skillsByTopic['Exponents and Powers'] = [
            {
                skill_id: 'local-8-exp-negative',
                skill_name: 'Powers with Negative Exponents',
                topic: 'Exponents and Powers',
                subtopic: 'Understanding Exponents',
                isLocal: true,
                path: '/senior/grade/8/exponents-powers/negative-exponents'
            },
            {
                skill_id: 'local-8-exp-laws',
                skill_name: 'Laws of Exponents',
                topic: 'Exponents and Powers',
                subtopic: 'Understanding Exponents',
                isLocal: true,
                path: '/senior/grade/8/exponents-powers/laws-of-exponents'
            },
            {
                skill_id: 'local-8-exp-application',
                skill_name: 'Application of Laws of Exponents',
                topic: 'Exponents and Powers',
                subtopic: 'Understanding Exponents',
                isLocal: true,
                path: '/senior/grade/8/exponents-powers/laws-application'
            },
            {
                skill_id: 'local-8-exp-standard',
                skill_name: 'Standard Form for Small Numbers',
                topic: 'Exponents and Powers',
                subtopic: 'Understanding Exponents',
                isLocal: true,
                path: '/senior/grade/8/exponents-powers/standard-form'
            },
            {
                skill_id: 'local-8-exp-comparing',
                skill_name: 'Comparing Large and Small Numbers',
                topic: 'Exponents and Powers',
                subtopic: 'Understanding Exponents',
                isLocal: true,
                path: '/senior/grade/8/exponents-powers/comparing-numbers'
            },
            {
                skill_id: 'local-8-exp-test',
                skill_name: 'Exponents and Powers Chapter Assessment',
                topic: 'Exponents and Powers',
                subtopic: 'Exponents and Powers Chapter Assessment',
                isLocal: true,
                path: '/senior/grade/8/exponents-and-powers/chapter-test'
            }
        ];

        // Hardcode all Grade 8 skills for Rational Numbers (4 skills + 1 test)
        skillsByTopic['Rational Numbers'] = [
            {
                skill_id: 'local-8-rn-commutativity',
                skill_name: 'Commutativity',
                topic: 'Rational Numbers',
                subtopic: 'Properties of Rational Numbers',
                isLocal: true,
                path: '/senior/grade/8/rational-numbers/commutativity'
            },
            {
                skill_id: 'local-8-rn-associativity',
                skill_name: 'Associativity',
                topic: 'Rational Numbers',
                subtopic: 'Properties of Rational Numbers',
                isLocal: true,
                path: '/senior/grade/8/rational-numbers/associativity'
            },
            {
                skill_id: 'local-8-rn-identity',
                skill_name: 'Additive and Multiplicative Identity',
                topic: 'Rational Numbers',
                subtopic: 'Properties of Rational Numbers',
                isLocal: true,
                path: '/senior/grade/8/rational-numbers/identity'
            },
            {
                skill_id: 'local-8-rn-distributivity',
                skill_name: 'Distributivity',
                topic: 'Rational Numbers',
                subtopic: 'Properties of Rational Numbers',
                isLocal: true,
                path: '/senior/grade/8/rational-numbers/distributivity'
            },
            {
                skill_id: 'local-8-rn-test',
                skill_name: 'Rational Numbers Chapter Assessment',
                topic: 'Rational Numbers',
                subtopic: 'Rational Numbers Chapter Assessment',
                isLocal: true,
                path: '/senior/grade/8/rational-numbers/chapter-test'
            }
        ];

        // Hardcode all Grade 8 skills for Mensuration (8 skills + 1 test)
        skillsByTopic['Mensuration'] = [
            {
                skill_id: 'local-8-mens-polygon',
                skill_name: 'Area of Polygon',
                topic: 'Mensuration',
                subtopic: 'Area',
                isLocal: true,
                path: '/senior/grade/8/mensuration/area-of-polygon'
            },
            {
                skill_id: 'local-8-mens-sa-cuboid',
                skill_name: 'Surface Area of Cuboid',
                topic: 'Mensuration',
                subtopic: 'Surface Area',
                isLocal: true,
                path: '/senior/grade/8/mensuration/surface-area-cuboid'
            },
            {
                skill_id: 'local-8-mens-sa-cube',
                skill_name: 'Surface Area of Cube',
                topic: 'Mensuration',
                subtopic: 'Surface Area',
                isLocal: true,
                path: '/senior/grade/8/mensuration/surface-area-cube'
            },
            {
                skill_id: 'local-8-mens-sa-cylinder',
                skill_name: 'Surface Area of Cylinder',
                topic: 'Mensuration',
                subtopic: 'Surface Area',
                isLocal: true,
                path: '/senior/grade/8/mensuration/surface-area-cylinder'
            },
            {
                skill_id: 'local-8-mens-vol-cube',
                skill_name: 'Volume of Cube',
                topic: 'Mensuration',
                subtopic: 'Volume',
                isLocal: true,
                path: '/senior/grade/8/mensuration/volume-of-cube'
            },
            {
                skill_id: 'local-8-mens-vol-cuboid',
                skill_name: 'Volume of Cuboid',
                topic: 'Mensuration',
                subtopic: 'Volume',
                isLocal: true,
                path: '/senior/grade/8/mensuration/volume-of-cuboid'
            },
            {
                skill_id: 'local-8-mens-vol-cylinder',
                skill_name: 'Volume of Cylinder',
                topic: 'Mensuration',
                subtopic: 'Volume',
                isLocal: true,
                path: '/senior/grade/8/mensuration/volume-of-cylinder'
            },
            {
                skill_id: 'local-8-mens-vol-capacity',
                skill_name: 'Volume and Capacity',
                topic: 'Mensuration',
                subtopic: 'Volume',
                isLocal: true,
                path: '/senior/grade/8/mensuration/volume-and-capacity'
            },
            {
                skill_id: 'local-8-mens-test',
                skill_name: 'Mensuration Chapter Assessment',
                topic: 'Mensuration',
                subtopic: 'Mensuration Chapter Assessment',
                isLocal: true,
                path: '/senior/grade/8/mensuration/chapter-test'
            }
        ];

        // Hardcode all Grade 8 skills for Factorisation (7 skills + 1 test)
        skillsByTopic['Factorisation'] = [
            {
                skill_id: 'local-8-fact-common',
                skill_name: 'Method of Common Factors',
                topic: 'Factorisation',
                subtopic: 'Factorisation Methods',
                isLocal: true,
                path: '/senior/grade/8/factorisation/common-factors'
            },
            {
                skill_id: 'local-8-fact-regrouping',
                skill_name: 'Factorisation by Regrouping',
                topic: 'Factorisation',
                subtopic: 'Factorisation Methods',
                isLocal: true,
                path: '/senior/grade/8/factorisation/regrouping'
            },
            {
                skill_id: 'local-8-fact-identities',
                skill_name: 'Factorisation Using Identities',
                topic: 'Factorisation',
                subtopic: 'Factorisation Methods',
                isLocal: true,
                path: '/senior/grade/8/factorisation/using-identities'
            },
            {
                skill_id: 'local-8-fact-form-xpla-xplb',
                skill_name: 'Factors of the form (x+a)(x+b)',
                topic: 'Factorisation',
                subtopic: 'Factorisation Methods',
                isLocal: true,
                path: '/senior/grade/8/factorisation/factors-form-xpla-xplb'
            },
            {
                skill_id: 'local-8-fact-div-mono-mono',
                skill_name: 'Division of Monomial by Monomial',
                topic: 'Factorisation',
                subtopic: 'Division of Algebraic Expressions',
                isLocal: true,
                path: '/senior/grade/8/factorisation/division-monomial-by-monomial'
            },
            {
                skill_id: 'local-8-fact-div-poly-mono',
                skill_name: 'Division of Polynomial by Monomial',
                topic: 'Factorisation',
                subtopic: 'Division of Algebraic Expressions',
                isLocal: true,
                path: '/senior/grade/8/factorisation/division-polynomial-by-monomial'
            },
            {
                skill_id: 'local-8-fact-div-poly-poly',
                skill_name: 'Division of Polynomial by Polynomial',
                topic: 'Factorisation',
                subtopic: 'Division of Algebraic Expressions',
                isLocal: true,
                path: '/senior/grade/8/factorisation/division-polynomial-by-polynomial'
            },
            {
                skill_id: 'local-8-fact-test',
                skill_name: 'Factorisation Chapter Assessment',
                topic: 'Factorisation',
                subtopic: 'Factorisation Chapter Assessment',
                isLocal: true,
                path: '/senior/grade/8/factorisation/chapter-test'
            }
        ];

        // Hardcode all Grade 8 skills for Squares and Square Roots (8 skills + 1 test)
        skillsByTopic['Squares and Square Roots'] = [
            {
                skill_id: '1247',
                skill_name: 'Identify Perfect Squares',
                topic: 'Squares and Square Roots',
                subtopic: 'Squares',
                isLocal: true,
                path: '/senior/grade/8/squares-and-square-roots/identify-perfect-squares'
            },
            {
                skill_id: '1248',
                skill_name: 'Properties of Square Numbers',
                topic: 'Squares and Square Roots',
                subtopic: 'Squares',
                isLocal: true,
                path: '/senior/grade/8/squares-and-square-roots/properties-of-square-numbers'
            },
            {
                skill_id: '1249',
                skill_name: 'Square Using Identity Patterns',
                topic: 'Squares and Square Roots',
                subtopic: 'Squares',
                isLocal: true,
                path: '/senior/grade/8/squares-and-square-roots/square-using-identity-patterns'
            },
            {
                skill_id: '1250',
                skill_name: 'Pythagorean Triplets',
                topic: 'Squares and Square Roots',
                subtopic: 'Squares',
                isLocal: true,
                path: '/senior/grade/8/squares-and-square-roots/pythagorean-triplets'
            },
            {
                skill_id: '1251',
                skill_name: 'Concept of Square Root',
                topic: 'Squares and Square Roots',
                subtopic: 'Square Roots',
                isLocal: true,
                path: '/senior/grade/8/squares-and-square-roots/concept-of-square-root'
            },
            {
                skill_id: '1252',
                skill_name: 'Square Root via Prime Factorization',
                topic: 'Squares and Square Roots',
                subtopic: 'Square Roots',
                isLocal: true,
                path: '/senior/grade/8/squares-and-square-roots/square-root-prime-factorization'
            },
            {
                skill_id: '1253',
                skill_name: 'Square Root via Long Division',
                topic: 'Squares and Square Roots',
                subtopic: 'Square Roots',
                isLocal: true,
                path: '/senior/grade/8/squares-and-square-roots/square-root-long-division'
            },
            {
                skill_id: '1254',
                skill_name: 'Square Root of Decimals',
                topic: 'Squares and Square Roots',
                subtopic: 'Square Roots',
                isLocal: true,
                path: '/senior/grade/8/squares-and-square-roots/square-root-of-decimals'
            },
            {
                skill_id: '1255',
                skill_name: 'Squares and Square Roots Test',
                topic: 'Squares and Square Roots',
                subtopic: 'Squares and Square Roots Chapter Assessment',
                isLocal: true,
                path: '/senior/grade/8/squares-and-square-roots/chapter-test'
            }
        ];

        // Introduction to Graphs (NCERT Ch. 15 — Grade 8)
        skillsByTopic['Introduction to Graphs'] = [
            {
                skill_id: 'local-8-graphs-landing',
                skill_name: 'Introduction to Graphs Chapter',
                topic: 'Introduction to Graphs',
                subtopic: 'Line Graphs & Applications',
                isLocal: true,
                path: '/senior/grade/8/introduction-to-graphs'
            }
        ];
    }

    const topics = Object.keys(skillsByTopic);

    // Handle Closing Modal on Escape Key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setSelectedTopic(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Helper to group skills by subtopic for the modal
    const getSubtopicsForSelected = () => {
        if (!selectedTopic) return {};
        return skillsByTopic[selectedTopic].reduce((acc, skill) => {
            const sub = skill.subtopic || 'General';
            if (!acc[sub]) acc[sub] = [];
            acc[sub].push(skill);
            return acc;
        }, {});
    };

    if (loading) {
        return (
            <div className="senior-loading">
                <div className="animate-pulse">Loading curriculum...</div>
            </div>
        );
    }

    /* ─── Grade 11 Subject Picker ─── */
    if (grade === '11') {
        const subjects = [
            { key: 'maths', label: 'Mathematics', icon: '📐', desc: 'Algebra, Trigonometry, Calculus & more', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', shadow: 'rgba(102,126,234,0.4)' },
            { key: 'physics', label: 'Physics', icon: '⚛️', desc: 'Mechanics, Waves, Thermodynamics & more', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', shadow: 'rgba(245,87,108,0.4)' },
            { key: 'chemistry', label: 'Chemistry', icon: '🧪', desc: 'Organic, Inorganic & Physical Chemistry', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', shadow: 'rgba(79,172,254,0.4)' },
            { key: 'biology', label: 'Biology', icon: '🧬', desc: 'Botany, Zoology, Human Physiology & more', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', shadow: 'rgba(67,233,123,0.4)' },
        ];
        return (
            <div className="senior-syllabus-page">
                <SEO title="Grade 11 — Choose Your Subject" description="Pick a subject to start practising Grade 11 topics." />
                <header className="senior-header-container">
                    <div className="header-inner">
                        <nav className="breadcrumb">
                            <Link to="/" className="home-link">Home</Link>
                            <ChevronRight size={14} />
                            <span>Grade 11</span>
                        </nav>
                        <div className="page-title">
                            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#4F46E5', background: '#EEF2FF', padding: '4px 12px', borderRadius: '20px', marginBottom: '10px', display: 'inline-block', letterSpacing: '0.05em' }}>GRADE 11</span>
                            <h1>Choose Your Subject</h1>
                        </div>
                        <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.5rem' }}>Select a subject to explore chapters, practice skills and take tests.</p>
                    </div>
                </header>
                <main className="senior-content-grid">
                    <div className="g11-subject-grid">
                        {subjects.map(s => (
                            <div key={s.key} className="g11-subject-card" style={{ '--card-gradient': s.gradient, '--card-shadow': s.shadow }} onClick={() => navigate(`/senior/grade/11/${s.key}`)}>
                                <div className="g11-card-bg"></div>
                                <div className="g11-card-content">
                                    <span className="g11-icon">{s.icon}</span>
                                    <h3>{s.label}</h3>
                                    <p>{s.desc}</p>
                                    <span className="g11-explore">Explore <ChevronRight size={16} /></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        );
    }

    if (!skills || skills.length === 0 || topics.length === 0) {
        return (
            <div className="senior-syllabus-page">
                <SEO title={`Grade ${grade} Mathematics`} description="Grade syllabus" />
                <div style={{ padding: '100px 20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📚</div>
                    <h2 style={{ color: '#1e293b', marginBottom: '10px' }}>No Content Available</h2>
                    <p style={{ color: '#64748b' }}>We are currently updating the curriculum for Grade {grade}. Please check back later!</p>
                    <Link to="/" style={{ display: 'inline-block', marginTop: '30px', color: '#4F46E5', fontWeight: '600' }}>← Back Home</Link>
                </div>
            </div>
        );
    }

    const subtopics = getSubtopicsForSelected();

    return (
        <div className="senior-syllabus-page">
            <SEO title={`Grade ${grade} Mathematics - Advanced Curriculum`} description={`Master Grade ${grade} math skills.`} />

            {/* Header / Breadcrumbs */}
            <header className="senior-header-container">
                <div className="header-inner">
                    <nav className="breadcrumb">
                        <Link to="/" className="home-link">Home</Link>
                        <ChevronRight size={14} />
                        <Link to="/" className="home-link">Math</Link>
                        <ChevronRight size={14} />
                        <span>Grade {grade}</span>
                    </nav>

                    <div className="page-title">
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            color: '#4F46E5',
                            background: '#EEF2FF',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            marginBottom: '10px',
                            display: 'inline-block',
                            letterSpacing: '0.05em'
                        }}>HIGH SCHOOL MATHEMATICS</span>
                        <h1>Grade {grade} Curriculum</h1>
                    </div>

                    <div className="page-subtitle">
                        <span><BookOpen size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> {topics.length} Chapters</span>
                        <span><Activity size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> {skills.length} Skills</span>
                    </div>
                </div>
            </header>

            {/* Main Content - Grid Layout */}
            <main className="senior-content-grid">
                <div className="topics-grid-container">
                    {topics.map(topic => (
                        <div
                            key={topic}
                            className="topic-card"
                            onClick={() => {
                                const topicSkills = skillsByTopic[topic];
                                if (topicSkills.length === 1 && topicSkills[0].path) {
                                    handleSkillClick(topicSkills[0]);
                                } else {
                                    setSelectedTopic(topic);
                                }
                            }}
                        >
                            <div className="topic-card-icon">
                                <Layout size={32} />
                            </div>
                            <h3><LatexText text={capitalizeFirstLetter(topic)} /></h3>
                            <div className="topic-meta">
                                {skillsByTopic[topic].length} {skillsByTopic[topic].length === 1 ? 'Skill' : 'Skills'}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Modal Overlay */}
            {selectedTopic && (
                <div className="modal-overlay" onClick={() => setSelectedTopic(null)}>
                    <div className="skills-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>
                                <Grid size={24} color="#4F46E5" />
                                <LatexText text={capitalizeFirstLetter(selectedTopic)} />
                            </h2>
                            <button
                                className="modal-close-btn-text"
                                onClick={() => setSelectedTopic(null)}
                                title="Close"
                            >
                                Close
                            </button>
                        </div>

                        <div className="modal-body">
                            {/* Render Subtopics as Sections */}
                            <div className="subtopics-list">
                                {Object.keys(subtopics)
                                    .filter(subtopic => !subtopic.toLowerCase().includes('assessment') && !subtopic.toLowerCase().includes('test'))
                                    .map((subtopic) => (
                                        <div key={subtopic} className="subtopic-section">
                                            <div
                                                className="subtopic-header"
                                                onClick={() => setExpandedSubtopic(expandedSubtopic === subtopic ? null : subtopic)}
                                            >
                                                <div className="subtopic-title">
                                                    <LatexText text={subtopic} />
                                                </div>
                                                <div className="subtopic-header-right">
                                                    <span className="subtopic-skill-count">
                                                        {subtopics[subtopic].length} {subtopics[subtopic].length === 1 ? 'Skill' : 'Skills'}
                                                    </span>
                                                    <ChevronRight
                                                        size={20}
                                                        className={`chevron-icon ${expandedSubtopic === subtopic ? 'expanded' : ''}`}
                                                    />
                                                </div>
                                            </div>

                                            {expandedSubtopic === subtopic && (
                                                <div className="modal-skills-grid">
                                                    {subtopics[subtopic].map(skill => (
                                                        <div
                                                            key={skill.skill_id}
                                                            className="skill-card-modal"
                                                            onClick={() => handleSkillClick(skill)}
                                                        >
                                                            <h4><LatexText text={capitalizeFirstLetter(skill.skill_name)} /></h4>
                                                            <div className="skill-card-footer">
                                                                <span className="skill-badge">ID: {skill.skill_id}</span>
                                                                <span className="start-btn">
                                                                    Start <ChevronRight size={16} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                {/* Distinguished Chapter Assessment Section */}
                                {Object.keys(subtopics)
                                    .filter(subtopic => subtopic.toLowerCase().includes('assessment') || subtopic.toLowerCase().includes('test'))
                                    .map((subtopic) => (
                                        <div key={subtopic} style={{ marginTop: '2rem' }}>
                                            {subtopics[subtopic].map(skill => (
                                                <div
                                                    key={skill.skill_id}
                                                    className="chapter-assessment-card group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2"
                                                    onClick={() => handleSkillClick(skill)}
                                                    style={{
                                                        background: 'linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)',
                                                        color: 'white',
                                                        borderRadius: '16px',
                                                        padding: '1.5rem',
                                                        cursor: 'pointer',
                                                        boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)',
                                                        transition: 'all 0.3s ease',
                                                        border: '2px solid transparent'
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                                        <div style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '0.75rem', borderRadius: '12px', flexShrink: 0 }}>
                                                            <Activity size={24} color="white" />
                                                        </div>
                                                        <div>
                                                            <h4 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.25rem', lineHeight: '1.2' }}>
                                                                <LatexText text={capitalizeFirstLetter(skill.skill_name)} />
                                                            </h4>
                                                            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', fontWeight: '500', lineHeight: '1.3' }}>
                                                                Take the final test to master this chapter
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div style={{
                                                        background: 'white',
                                                        color: '#4F46E5',
                                                        padding: '0.75rem 1.5rem',
                                                        borderRadius: '12px',
                                                        fontWeight: '700',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                                        marginTop: '0.5rem',
                                                        alignSelf: 'flex-end'
                                                    }} className="group-hover:scale-105 transition-transform sm:mt-0 sm:self-auto shrink-0">
                                                        Start Test <ChevronRight size={18} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <LoginPromptModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        </div>
    );
};

export default SeniorGradeSyllabus;
