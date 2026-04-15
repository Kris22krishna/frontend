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

const GRADE_9_TOPIC_SKILL_COUNTS = {
    'Number System': 5,
    Polynomials: 4,
    'Coordinate Geometry': 4,
    'Lines and Angles': 4,
    'Linear Equations in Two Variables': 4,
    "Introduction to Euclid's Geometry": 3,
    Triangles: 4,
    Quadrilaterals: 3,
    Circles: 3,
};

const SeniorGradeSyllabus = () => {
    const { grade } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [skills, setSkills] = useState([]);
    const [activeSubject, setActiveSubject] = useState('mathematics'); // For Grade 10 and Grade 8
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
        if (!isAuthenticated && (grade === '10' || grade === '8' || grade === '9')) {
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
                        { skill_id: 12000, skill_name: 'Matrices: Interactive Chapter', topic: 'Matrices', subtopic: 'Complete Chapter', isLocal: true, path: '/senior/grade/12/matrices' },
                        { skill_id: 12100, skill_name: 'Determinants: Interactive Chapter', topic: 'Determinants', subtopic: 'Complete Chapter', isLocal: true, path: '/senior/grade/12/determinants' },
                        { skill_id: 12200, skill_name: 'Relations: Interactive Chapter', topic: 'Relations', subtopic: 'Complete Chapter', isLocal: true, path: '/senior/grade/12/relations' },
                        { skill_id: 12300, skill_name: 'Functions: Interactive Chapter', topic: 'Functions', subtopic: 'Complete Chapter', isLocal: true, path: '/senior/grade/12/functions' },
                        { skill_id: 12400, skill_name: 'Inverse Trigonometric Functions: Interactive Chapter', topic: 'Inverse Trigonometric Functions', subtopic: 'Complete Chapter', isLocal: true, path: '/senior/grade/12/inverse-trigonometric-functions' }
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
                        { skill_id: 1128, skill_name: 'Quadratic Equations Chapter Assessment', topic: 'Quadratic Equations', subtopic: 'Quadratic Equations Chapter Assessment' },

                        // Polynomials
                        { skill_id: 1233, skill_name: 'Understanding Polynomials and Their Degrees', topic: 'Polynomials', subtopic: 'Understanding Types and Degrees of Polynomials' },
                        { skill_id: 1234, skill_name: 'Evaluating Polynomials and Identifying Zeroes', topic: 'Polynomials', subtopic: 'Evaluating Polynomials and Identifying Zeroes' },
                        { skill_id: 1235, skill_name: 'Geometrical Interpretation of Zeroes', topic: 'Polynomials', subtopic: 'Geometrical Interpretation of Zeroes' },
                        { skill_id: 1236, skill_name: 'Number of Zeroes from Graphical Behaviour', topic: 'Polynomials', subtopic: 'Number of Zeroes from Graphical Behaviour' },
                        { skill_id: 1237, skill_name: 'Relationship Between Zeroes and Coefficients (Quadratic)', topic: 'Polynomials', subtopic: 'Relationship Between Zeroes and Coefficients (Quadratic)' },
                        { skill_id: 1238, skill_name: 'Constructing Quadratic Polynomials from Given Conditions', topic: 'Polynomials', subtopic: 'Constructing Quadratic Polynomials from Given Conditions' },
                        { skill_id: 1239, skill_name: 'Relationship Between Zeroes and Coefficients (Cubic)', topic: 'Polynomials', subtopic: 'Relationship Between Zeroes and Coefficients (Cubic)' },
                        { skill_id: 1240, skill_name: 'Polynomials Chapter Assessment', topic: 'Polynomials', subtopic: 'Polynomials Chapter Assessment' },

                        // Surface Areas and Volumes
                        { skill_id: 1300, skill_name: 'Surface Areas and Volumes: Interactive Chapter', topic: 'Surface Areas and Volumes', subtopic: 'Complete Chapter', isLocal: true, path: '/surface-areas-and-volumes' },

                        // Introduction to Trigonometry
                        { skill_id: 1400, skill_name: 'Introduction to Trigonometry: Interactive Chapter', topic: 'Introduction to Trigonometry', subtopic: 'Complete Chapter', isLocal: true, path: '/introduction-to-trigonometry' },

                        // Probability
                        { skill_id: 10148, skill_name: 'Probability: Interactive Chapter', topic: 'Probability', subtopic: 'Complete Chapter', isLocal: true, path: '/senior/grade/10/probability' },

                        // Real Numbers
                        { skill_id: 10149, skill_name: 'Real Numbers: Interactive Chapter', topic: 'Real Numbers', subtopic: 'Complete Chapter', isLocal: true, path: '/senior/grade/10/real-numbers' },

                        // Triangles
                        { skill_id: 10150, skill_name: 'Triangles: Interactive Chapter', topic: 'Triangles', subtopic: 'Complete Chapter', isLocal: true, path: '/senior/grade/10/triangles' },

                        // Coordinate Geometry
                        { skill_id: 10151, skill_name: 'Coordinate Geometry: Interactive Chapter', topic: 'Coordinate Geometry', subtopic: 'Complete Chapter', isLocal: true, path: '/senior/grade/10/coordinate-geometry' },

                        // Circles
                        { skill_id: 10152, skill_name: 'Circles: Interactive Chapter', topic: 'Circles', subtopic: 'Complete Chapter', isLocal: true, path: '/senior/grade/10/circles' },

                        // Areas Related to Circles
                        { skill_id: 10153, skill_name: 'Areas Related to Circles: Interactive Chapter', topic: 'Areas Related to Circles', subtopic: 'Complete Chapter', isLocal: true, path: '/senior/grade/10/areas-related-to-circles' }
                    ]);
                } else if (grade === '9') {
                    setSkills([
                        // Number System Hub
                        { skill_id: 1240, skill_name: 'Number System: Master Hub', topic: 'Number System', subtopic: 'Complete Chapter', isLocal: true, path: '/senior/grade/9/number-system', displaySkillCount: GRADE_9_TOPIC_SKILL_COUNTS['Number System'] },
                        
                        // Polynomials Hub
                        { skill_id: 1241, skill_name: 'Polynomials: Master Hub', topic: 'Polynomials', subtopic: 'Complete Chapter', isLocal: true, path: '/senior/grade/9/polynomials', displaySkillCount: GRADE_9_TOPIC_SKILL_COUNTS.Polynomials },

                        // Coordinate Geometry Hub
                        { skill_id: 1242, skill_name: 'Coordinate Geometry: Master Hub', topic: 'Coordinate Geometry', subtopic: 'Complete Chapter', isLocal: true, path: '/practice/class-9/coordinate-geometry', displaySkillCount: GRADE_9_TOPIC_SKILL_COUNTS['Coordinate Geometry'] },

                        // Lines and Angles Hub
                        { skill_id: 1243, skill_name: 'Lines and Angles: Master Hub', topic: 'Lines and Angles', subtopic: 'Complete Chapter', isLocal: true, path: '/practice/class-9/lines-and-angles', displaySkillCount: GRADE_9_TOPIC_SKILL_COUNTS['Lines and Angles'] },

                        // Linear Equations in Two Variables Hub
                        { skill_id: 1244, skill_name: 'Linear Equations in Two Variables: Master Hub', topic: 'Linear Equations in Two Variables', subtopic: 'Complete Chapter', isLocal: true, path: '/practice/class-9/linear-equations-two-variables', displaySkillCount: GRADE_9_TOPIC_SKILL_COUNTS['Linear Equations in Two Variables'] },

                        // Euclid's Geometry Hub
                        { skill_id: 1245, skill_name: 'Introduction to Euclid\'s Geometry: Master Hub', topic: 'Introduction to Euclid\'s Geometry', subtopic: 'Complete Chapter', isLocal: true, path: '/practice/class-9/euclids-geometry', displaySkillCount: GRADE_9_TOPIC_SKILL_COUNTS["Introduction to Euclid's Geometry"] },

                        // Triangles Hub
                        { skill_id: 1246, skill_name: 'Triangles: Master Hub', topic: 'Triangles', subtopic: 'Complete Chapter', isLocal: true, path: '/practice/class-9/triangles', displaySkillCount: GRADE_9_TOPIC_SKILL_COUNTS.Triangles },

                        // Quadrilaterals Hub
                        { skill_id: 1247, skill_name: 'Quadrilaterals: Master Hub', topic: 'Quadrilaterals', subtopic: 'Complete Chapter', isLocal: true, path: '/practice/class-9/quadrilaterals', displaySkillCount: GRADE_9_TOPIC_SKILL_COUNTS.Quadrilaterals },
                        
                        // Circles Hub
                        { skill_id: 1248, skill_name: 'Circles: Master Hub', topic: 'Circles', subtopic: 'Complete Chapter', isLocal: true, path: '/practice/class-9/circles', displaySkillCount: GRADE_9_TOPIC_SKILL_COUNTS.Circles }
                        
                        // Heron's Formula Hub
                        { skill_id: 1249, skill_name: 'Heron\'s Formula: Master Hub', topic: 'Heron\'s Formula', subtopic: 'Complete Chapter', isLocal: true, path: '/practice/class-9/herons-formula' },
                        
                        // Surface Areas and Volumes Hub
                        { skill_id: 1250, skill_name: 'Surface Areas & Volumes: Master Hub', topic: 'Surface Areas and Volumes', subtopic: 'Complete Chapter', isLocal: true, path: '/practice/class-9/surface-areas-and-volumes' }

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
                        { skill_id: '1255', skill_name: 'Squares and Square Roots Test', topic: 'Squares and Square Roots' },
                        { skill_id: 'local-8-graphs-landing', skill_name: 'Introduction to Graphs Chapter', topic: 'Introduction to Graphs' },
                        { skill_id: 'local-8-dh-landing', skill_name: 'Data Handling Chapter', topic: 'Data Handling' },
                        { skill_id: 'local-8-proportions-landing', skill_name: 'Direct and Inverse Proportions Chapter', topic: 'Direct and Inverse Proportions' },
                        { skill_id: 'local-8-cq-landing', skill_name: 'Comparing Quantities Chapter', topic: 'Comparing Quantities' },
                        { skill_id: 'local-8-leq-landing', skill_name: 'Linear Equations Chapter', topic: 'Linear Equations in One Variable' },
                        { skill_id: 'local-8-ccr-landing', skill_name: 'Cubes and Cube Roots Chapter', topic: 'Cubes and Cube Roots' },
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

        // Direct and Inverse Proportions (NCERT Ch. 13 — Grade 8)
        skillsByTopic['Direct and Inverse Proportions'] = [
            {
                skill_id: 'local-8-proportions-landing',
                skill_name: 'Direct and Inverse Proportions Chapter',
                topic: 'Direct and Inverse Proportions',
                subtopic: 'Direct & Inverse Proportion',
                isLocal: true,
                path: '/senior/grade/8/direct-and-inverse-proportions'
            }
        ];

        // Data Handling (NCERT Ch. 5 — Grade 8)
        skillsByTopic['Data Handling'] = [
            {
                skill_id: 'local-8-dh-landing',
                skill_name: 'Data Handling Chapter',
                topic: 'Data Handling',
                subtopic: 'Organising Data, Charts, Probability',
                isLocal: true,
                path: '/senior/grade/8/data-handling'
            }
        ];

        // Cubes and Cube Roots (NCERT Ch. 7 — Grade 8)
        skillsByTopic['Cubes and Cube Roots'] = [
            {
                skill_id: 'local-8-ccr-landing',
                skill_name: 'Cubes and Cube Roots Chapter',
                topic: 'Cubes and Cube Roots',
                subtopic: 'Perfect Cubes, Cube Roots, Estimating',
                isLocal: true,
                path: '/senior/grade/8/cubes-and-cube-roots'
            }
        ];

        // Understanding Quadrilaterals (NCERT Ch. 3 — Grade 8)
        skillsByTopic['Understanding Quadrilaterals'] = [
            {
                skill_id: 'local-8-uq-landing',
                skill_name: 'Understanding Quadrilaterals Chapter',
                topic: 'Understanding Quadrilaterals',
                subtopic: 'Polygons, Angles, and Special Quadrilaterals',
                isLocal: true,
                path: '/senior/grade/8/understanding-quadrilaterals'
            }
        ];

        // Comparing Quantities (NCERT Ch. 8 — Grade 8)
        skillsByTopic['Comparing Quantities'] = [
            {
                skill_id: 'local-8-cq-landing',
                skill_name: 'Comparing Quantities Chapter',
                topic: 'Comparing Quantities',
                subtopic: 'Percentages, Profit & Loss, Interest',
                isLocal: true,
                path: '/senior/grade/8/comparing-quantities'
            }
        ];

        // Triangles Syllabus
        skillsByTopic['Triangles'] = [
            {
                skill_id: 1246,
                skill_name: 'Triangles Hub',
                topic: 'Triangles',
                subtopic: 'Interactive Learning',
                points: 0,
                progress: 0,
                path: '/practice/class-9/triangles'
            }
        ];

        // Quadrilaterals Syllabus
        skillsByTopic['Quadrilaterals'] = [
            {
                skill_id: 1247,
                skill_name: 'Quadrilaterals Hub',
                topic: 'Quadrilaterals',
                subtopic: 'Interactive Learning',
                points: 0,
                progress: 0,
                path: '/practice/class-9/quadrilaterals'
            }
        ];

        // Linear Equations in One Variable (NCERT Ch. 2 — Grade 8)
        skillsByTopic['Linear Equations in One Variable'] = [
            {
                skill_id: 'local-8-leq-landing',
                skill_name: 'Linear Equations Chapter',
                topic: 'Linear Equations in One Variable',
                subtopic: 'Variables, Balancing, Word Problems',
                isLocal: true,
                path: '/senior/grade/8/linear-equations'
            }
        ];
    }

    const topics = Object.keys(skillsByTopic);

    const getTopicDisplaySkillCount = (topic) =>
        (skillsByTopic[topic] || []).reduce(
            (count, skill) => count + (skill.displaySkillCount ?? 1),
            0
        );

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
                        <span>Grade {grade}</span>
                    </nav>

                    <div className="page-title">
                        {(grade === '10' || grade === '9' || grade === '8') ? (
                            <div style={{ marginBottom: '12px' }}>
                                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>Grade {grade} — Select Subject</div>
                                <div className="subjToggleWrap" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    background: '#f1f5f9', borderRadius: '100px', padding: '6px', boxShadow: '0 4px 20px rgba(0,0,0,0.08), inset 0 1px 2px rgba(0,0,0,0.06)'
                                }}>
                                    <button
                                        onClick={() => setActiveSubject('mathematics')}
                                        style={{
                                            fontFamily: 'Outfit, system-ui, sans-serif', fontSize: '1.1rem', fontWeight: '800',
                                            padding: '14px 40px', borderRadius: '100px', border: 'none', cursor: 'pointer',
                                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)', letterSpacing: '0.02em',
                                            background: activeSubject === 'mathematics' ? 'linear-gradient(135deg, #4F46E5, #7C3AED)' : 'transparent',
                                            color: activeSubject === 'mathematics' ? '#fff' : '#64748b',
                                            boxShadow: activeSubject === 'mathematics' ? '0 6px 20px rgba(79,70,229,0.45)' : 'none',
                                            transform: activeSubject === 'mathematics' ? 'scale(1.04)' : 'scale(1)'
                                        }}
                                    >
                                        📐 Mathematics
                                    </button>
                                    <button
                                        onClick={() => setActiveSubject('science')}
                                        style={{
                                            fontFamily: 'Outfit, system-ui, sans-serif', fontSize: '1.1rem', fontWeight: '800',
                                            padding: '14px 40px', borderRadius: '100px', border: 'none', cursor: 'pointer',
                                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)', letterSpacing: '0.02em',
                                            background: activeSubject === 'science' ? 'linear-gradient(135deg, #0891b2, #059669)' : 'transparent',
                                            color: activeSubject === 'science' ? '#fff' : '#64748b',
                                            boxShadow: activeSubject === 'science' ? '0 6px 20px rgba(8,145,178,0.45)' : 'none',
                                            transform: activeSubject === 'science' ? 'scale(1.04)' : 'scale(1)'
                                        }}
                                    >
                                        🔬 Science
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content - Grid Layout */}
            <main className="senior-content-grid">
                {(grade === '10' || grade === '9') && activeSubject === 'science' ? (
                    <div className="science-chapter-grid" style={{
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', animation: 'chemFadeIn 0.35s ease'
                    }}>
                        {grade === '10' ? (
                            <div
                                className="science-chapter-card"
                                onClick={() => handleSkillClick({ isLocal: true, path: '/senior/grade/10/science/chemical-reactions' })}
                                style={{
                                    background: 'linear-gradient(135deg, #0a1628, #0c2240)', border: '1px solid rgba(8,145,178,0.3)',
                                    borderRadius: '20px', padding: '24px', cursor: 'pointer', transition: 'all 0.25s',
                                    position: 'relative', overflow: 'hidden'
                                }}
                            >
                                <span style={{
                                    display: 'inline-block', fontSize: '0.62rem', fontWeight: '700', letterSpacing: '0.16em',
                                    textTransform: 'uppercase', background: 'rgba(8,145,178,0.15)', color: '#38bdf8',
                                    border: '1px solid rgba(56,189,248,0.3)', padding: '3px 12px', borderRadius: '100px', marginBottom: '14px'
                                }}>Chapter 1</span>
                                <span style={{ fontSize: '2.4rem', marginBottom: '12px', display: 'block' }}>⚗️</span>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#e6edf3', marginBottom: '6px', fontFamily: '"Outfit", sans-serif' }}>
                                    Chemical Reactions & Equations
                                </h3>
                                <p style={{ fontSize: '0.8rem', color: '#7d8590', marginBottom: '16px', lineHeight: '1.5' }}>
                                    Master equations, experiments, and reaction types with the interactive virtual lab.
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                                    <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', color: '#94a3b8', borderRadius: '20px', padding: '2px 10px' }}>Virtual Lab</span>
                                    <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', color: '#94a3b8', borderRadius: '20px', padding: '2px 10px' }}>Balancer</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#38bdf8' }}>Enter Module →</span>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="science-chapter-card"
                                onClick={() => handleSkillClick({ isLocal: true, path: '/senior/grade/9/science/matter-in-our-surroundings' })}
                                style={{
                                    background: 'linear-gradient(135deg, #0a1628, #0c2240)', border: '1px solid rgba(8,145,178,0.3)',
                                    borderRadius: '20px', padding: '24px', cursor: 'pointer', transition: 'all 0.25s',
                                    position: 'relative', overflow: 'hidden'
                                }}
                            >
                                <span style={{
                                    display: 'inline-block', fontSize: '0.62rem', fontWeight: '700', letterSpacing: '0.16em',
                                    textTransform: 'uppercase', background: 'rgba(8,145,178,0.15)', color: '#38bdf8',
                                    border: '1px solid rgba(56,189,248,0.3)', padding: '3px 12px', borderRadius: '100px', marginBottom: '14px'
                                }}>Chapter 1</span>
                                <span style={{ fontSize: '2.4rem', marginBottom: '12px', display: 'block' }}>🧊</span>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#e6edf3', marginBottom: '6px', fontFamily: '"Outfit", sans-serif' }}>
                                    Matter in Our Surroundings
                                </h3>
                                <p style={{ fontSize: '0.8rem', color: '#7d8590', marginBottom: '16px', lineHeight: '1.5' }}>
                                    Explore the physical nature of matter, states of matter, and the effect of temperature and pressure.
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                                    <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', color: '#94a3b8', borderRadius: '20px', padding: '2px 10px' }}>States of Matter</span>
                                    <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', color: '#94a3b8', borderRadius: '20px', padding: '2px 10px' }}>Phase Change</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#38bdf8' }}>Enter Module →</span>
                                </div>
                            </div>
                        )}
                    </div>
                ) : grade === '8' && activeSubject === 'science' ? (
                    <div className="science-chapter-grid" style={{
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', animation: 'chemFadeIn 0.35s ease'
                    }}>
                        <div
                            className="science-chapter-card"
                            onClick={() => handleSkillClick({ isLocal: true, path: '/senior/grade/8/science/investigative-science' })}
                            style={{
                                background: 'linear-gradient(135deg, #0f172a, #1e293b)', border: '1px solid rgba(13,148,136,0.3)',
                                borderRadius: '20px', padding: '24px', cursor: 'pointer', transition: 'all 0.25s',
                                position: 'relative', overflow: 'hidden'
                            }}
                        >
                            <span style={{
                                display: 'inline-block', fontSize: '0.62rem', fontWeight: '700', letterSpacing: '0.16em',
                                textTransform: 'uppercase', background: 'rgba(13,148,136,0.15)', color: '#2dd4bf',
                                border: '1px solid rgba(45,212,191,0.3)', padding: '3px 12px', borderRadius: '100px', marginBottom: '14px'
                            }}>Chapter 1</span>
                            <span style={{ fontSize: '2.4rem', marginBottom: '12px', display: 'block' }}>🔬</span>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#e6edf3', marginBottom: '6px', fontFamily: '"Outfit", sans-serif' }}>
                                Exploring the Investigative World of Science
                            </h3>
                            <p style={{ fontSize: '0.8rem', color: '#7d8590', marginBottom: '16px', lineHeight: '1.5' }}>
                                Master the scientific method, variable control, and test hypotheses through our Virtual Puri Simulator!
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                                <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', color: '#94a3b8', borderRadius: '20px', padding: '2px 10px' }}>Virtual Lab</span>
                                <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', color: '#94a3b8', borderRadius: '20px', padding: '2px 10px' }}>5W1H Pattern</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#2dd4bf' }}>Enter Module →</span>
                            </div>
                        </div>
                    </div>
                ) : (
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
                                    {getTopicDisplaySkillCount(topic)} {getTopicDisplaySkillCount(topic) === 1 ? 'Skill' : 'Skills'}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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
