/**
 * Centralized SEO Configuration for skill100.ai
 *
 * Single source of truth for all page metadata, structured data,
 * and SEO-related constants across the platform.
 */

export const BASE_URL = 'https://skill100.ai';

export const DEFAULT_OG_IMAGE = `${BASE_URL}/logo.jpg`;

const BRAND_KEYWORDS = 'skill100, skill100.ai, online learning, mathematics, math practice, K-12 education, CBSE syllabus';

/**
 * JSON-LD EducationalOrganization schema for the homepage.
 */
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'skill100.ai',
  alternateName: 'Skill100',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.jpg`,
  description:
    'skill100.ai provides comprehensive K-12 mathematics education through interactive practice sessions, adaptive learning, and personalized feedback.',
};

/**
 * Generate JSON-LD Course structured data for educational content pages.
 */
export const generateEducationalSchema = ({
  name,
  description,
  educationalLevel = 'K-12',
  subject = 'Mathematics',
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name,
  description,
  provider: {
    '@type': 'Organization',
    name: 'skill100.ai',
    sameAs: BASE_URL,
  },
  educationalLevel,
  about: {
    '@type': 'Thing',
    name: subject,
  },
});

/**
 * SEO metadata for all major public routes.
 */
export const SEO_CONFIG = {
  home: {
    title: 'skill100.ai | Master the Art of Learning',
    description:
      'Unlock your potential with skill100.ai. Explore comprehensive mathematics education for grades 1-12, featuring interactive practice, adaptive learning, and personalized feedback.',
    keywords: `learn to learn, mathematics education, grade 1-12 math, interactive math practice, ${BRAND_KEYWORDS}`,
    canonical: '/',
    structuredData: ORGANIZATION_SCHEMA,
  },

  learnToLearn: {
    title: 'Learn to Learn | Master Learning Strategies | skill100.ai',
    description:
      'Discover effective learning strategies including active recall, spaced repetition, and focused practice. Master the art of learning with skill100.ai.',
    keywords: `learn to learn, learning strategies, active recall, spaced repetition, study techniques, ${BRAND_KEYWORDS}`,
    canonical: '/learn-to-learn',
    structuredData: generateEducationalSchema({
      name: 'Learn to Learn - Mastering Learning Strategies',
      description: 'A comprehensive course on effective learning techniques and strategies',
      subject: 'Learning Science',
    }),
  },

  math: {
    title: 'Mathematics Practice | Grades 1-12 | skill100.ai',
    description:
      'Choose your grade level and start practicing mathematics. Comprehensive curriculum covering grades 1-12 aligned with CBSE standards.',
    keywords: `mathematics, math practice, K-12 math, CBSE mathematics, grade selection, ${BRAND_KEYWORDS}`,
    canonical: '/math',
  },

  practice: {
    title: 'Practice & Improve Your Skills | skill100.ai',
    description:
      'Select your grade and topic to start practicing. Interactive exercises with instant feedback help you master concepts at your own pace.',
    keywords: `math practice, interactive exercises, skill building, ${BRAND_KEYWORDS}`,
    canonical: '/practice',
  },

  rapidMath: {
    title: 'Rapid Math | Speed & Accuracy Challenge | skill100.ai',
    description:
      'Improve your mental math speed and accuracy with timed practice sessions. Build fluency in mathematical operations.',
    keywords: `rapid math, mental math, speed mathematics, math fluency, timed practice, ${BRAND_KEYWORDS}`,
    canonical: '/rapid-math',
  },

  internship: {
    title: 'Internship Program | skill100.ai',
    description:
      'Join our internship program and gain hands-on experience in education technology, content creation, and more.',
    keywords: `internship, education technology, student internship, edtech careers, ${BRAND_KEYWORDS}`,
    canonical: '/internship',
  },

  login: {
    title: 'Login | skill100.ai',
    description:
      'Sign in to your skill100.ai account to access personalized learning, track progress, and continue your educational journey.',
    keywords: `login, sign in, student login, ${BRAND_KEYWORDS}`,
    canonical: '/login',
  },

  register: {
    title: 'Create Account | Join skill100.ai',
    description:
      'Create your free account on skill100.ai and start your personalized learning journey. Join thousands of students mastering mathematics.',
    keywords: `register, sign up, create account, free math learning, ${BRAND_KEYWORDS}`,
    canonical: '/register',
  },

  ai: {
    title: 'Artificial Intelligence | skill100.ai',
    description:
      'Explore AI models, theory, and applications. Learn how artificial intelligence is transforming education and learning.',
    keywords: `artificial intelligence, AI, machine learning, AI in education, ${BRAND_KEYWORDS}`,
    canonical: '/ai',
  },
};

/**
 * Generate SEO metadata for grade-specific syllabus pages.
 *
 * @param {'junior' | 'middle' | 'senior' | 'math'} level - Grade level category
 * @param {string | number} grade - Grade number (1-12)
 */
export const getGradePageSEO = (level, grade) => {
  const gradeNum = parseInt(grade, 10);

  const topicsByRange = {
    junior: 'numbers, shapes, addition, subtraction, basic multiplication, patterns',
    middle: 'fractions, decimals, geometry, algebra basics, data handling, symmetry',
    senior: 'advanced algebra, trigonometry, calculus, matrices, probability, statistics',
  };

  const range = gradeNum <= 4 ? 'junior' : gradeNum <= 7 ? 'middle' : 'senior';
  const topics = topicsByRange[range];

  return {
    title: `Grade ${gradeNum} Mathematics | Interactive Practice | skill100.ai`,
    description: `Comprehensive Grade ${gradeNum} mathematics curriculum. Master ${topics} through interactive practice sessions with instant feedback and detailed explanations.`,
    keywords: `grade ${gradeNum} math, class ${gradeNum} mathematics, ${topics}, CBSE grade ${gradeNum}, ${BRAND_KEYWORDS}`,
    canonical: `/${level}/grade/${gradeNum}`,
    structuredData: generateEducationalSchema({
      name: `Grade ${gradeNum} Mathematics`,
      description: `Complete mathematics course for Grade ${gradeNum} students`,
      educationalLevel: `Grade ${gradeNum}`,
    }),
  };
};
