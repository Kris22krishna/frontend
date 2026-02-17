---
description: Agent Workflow for New Chapter Implementation This document outlines the mandatory procedure for the agent when a user provides a new chapter with topics and subtopics.
---

1. Requirement Analysis
Review Topics: Carefully check the provided list of topics and subtopics.
Order Matters: The 
generateQuestions
 function MUST generate questions in the exact order of subtopics provided by the user. Do not randomize the order of topics unless explicitly asked.
2. Component Implementation Standards
When creating or modifying practice components (
.jsx
 files), adhere to the following:

Progressive Difficulty & Ordered Topics:
Q1-Q10 MUST follow the exact sequence of subtopics provided.
Implement this deterministically in 
generateQuestions
 (e.g., if (i === 0) ... else if (i === 1) ...).
Answer Persistence Design:
State Structure: const [answers, setAnswers] = useState({});
Storage: When checking an answer, store: setAnswers(prev => ({ ...prev, [qIndex]: { selectedOption, isCorrect: isRight } }));.
Restoration Hook: Use a useEffect dependent on [qIndex, answers] to restore selectedOption, isCorrect, and isSubmitted.
Modal Control (CRITICAL): Use a separate useEffect dependent only on [qIndex] to call setShowExplanationModal(false). This prevents the modal from closing prematurely when the answers state updates on submission.
Navigation Controls:
Previous Button: Always enabled if qIndex > 0 (even after submission).
Logic: 
handlePrevious
 should only update qIndex. Do NOT reset selection/submission state manually; let the restoration useEffect handle it.
Rich Content & Visuals:
LatexContent: Wrap ALL math and question text.
Mascot Integration: Import mascotImg. Show in feedback-mini for correct answers and inside 
ExplanationModal
.
Detailed Solutions: Include step-by-step LaTeX formulas in the solution property.
3. Chapter Test Standards
Mixed Pool: Use a shuffle/randomizer to pick questions from all chapter subtopics.
Persistence: chapter tests MUST implement the same answer persistence pattern as practice sessions.
Scoring: Calculate results using Object.values(answers).filter(val => val.isCorrect).length.
4. Integration
Sync with Syllabus: Register in 
MiddleGradeSyllabus.jsx
.
Routing: Ensure a unique route exists in 
App.jsx
.
5. Summary Checklist for Verification
 Subtopics follow ordered sequence.
 Answer persistence stores { selectedOption, isCorrect }.
 Modal visibility is decoupled from answer state (separate qIndex effect).
 "Previous" button allows full review of previous answers.
 Mascot is present and imported correctly.
 LatexContent is used consistently.