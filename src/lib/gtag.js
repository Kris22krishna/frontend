// lib/gtag.js - GA4 Event Tracking for Learners Platform
// Measurement ID: G-DPVP197Z95

export const GA_MEASUREMENT_ID = 'G-DPVP197Z95'

// Base event helper — safe for React/client-side rendering
const event = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}

// --------------------------------------------------
// Call after login or signup to link user across sessions
// Pass your internal database user ID
// --------------------------------------------------
export const setUserId = (userId) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      user_id: String(userId)
    })
  }
}

// --------------------------------------------------
// Auth Events
// --------------------------------------------------

// Call on successful signup form submission
export const trackSignUp = (method = 'email') => {
  event('sign_up', { method })
}

// Call on successful login
export const trackLogin = (method = 'email') => {
  event('login', { method })
}

// Call on logout
export const trackLogout = () => {
  event('logout', {})
}

// --------------------------------------------------
// Practice/Assessment Events
// --------------------------------------------------

// Call when user clicks "Start Practice" or "Start Assessment" button
export const trackPracticeStarted = (practiceId, practiceName, skillCategory) => {
  event('practice_started', {
    practice_id: practiceId,
    practice_name: practiceName,
    skill_category: skillCategory
  })
}

// Call when user completes a practice session (submits final answer)
export const trackPracticeCompleted = (practiceId, practiceName, skillCategory, score, timeTakenSeconds) => {
  event('practice_completed', {
    practice_id: practiceId,
    practice_name: practiceName,
    skill_category: skillCategory,
    score: score,
    time_taken_seconds: timeTakenSeconds,
    pass_or_fail: score >= 50 ? 'pass' : 'fail'
  })
}

// Call when user leaves practice mid-session
// Use inside a useEffect with a beforeunload listener
export const trackPracticeAbandoned = (practiceId, questionsAnswered, totalQuestions) => {
  event('practice_abandoned', {
    practice_id: practiceId,
    questions_answered: questionsAnswered,
    total_questions: totalQuestions
  })
}

// Call when result/score page loads
export const trackResultViewed = (practiceId, score) => {
  event('result_viewed', {
    practice_id: practiceId,
    score: score
  })
}

// Call when user clicks "Retake" button
export const trackPracticeRetaken = (practiceId, attemptNumber) => {
  event('practice_retaken', {
    practice_id: practiceId,
    attempt_number: attemptNumber
  })
}

// --------------------------------------------------
// Navigation Events
// --------------------------------------------------

// Call when user navigates to a topic/chapter
export const trackTopicViewed = (topicName, grade) => {
  event('topic_viewed', {
    topic_name: topicName,
    grade: grade
  })
}

// Call when user navigates to learning/content page
export const trackContentViewed = (contentName, contentType) => {
  event('content_viewed', {
    content_name: contentName,
    content_type: contentType // 'lesson', 'example', etc.
  })
}

// --------------------------------------------------
// Dashboard Events
// --------------------------------------------------

// Call when student views their dashboard
export const trackStudentDashboardViewed = () => {
  event('student_dashboard_viewed', {})
}

// Call when teacher views their dashboard
export const trackTeacherDashboardViewed = () => {
  event('teacher_dashboard_viewed', {})
}

// Call when parent views their dashboard
export const trackParentDashboardViewed = () => {
  event('parent_dashboard_viewed', {})
}

// --------------------------------------------------
// Engagement Events
// --------------------------------------------------

// Call when user completes a single question
export const trackQuestionAnswered = (questionId, isCorrect, timeTakenSeconds) => {
  event('question_answered', {
    question_id: questionId,
    is_correct: isCorrect,
    time_taken_seconds: timeTakenSeconds
  })
}

// Call when user clicks hint
export const trackHintUsed = (questionId) => {
  event('hint_used', {
    question_id: questionId
  })
}
