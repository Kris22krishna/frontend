---
trigger: manual
---

1. Requirement Analysis
✔ Review Topics

Carefully check the provided list of topics and subtopics before generating questions.

✔ Order Matters (Strict Rule)

The generateQuestions function MUST generate questions in the exact order of subtopics provided by the user.

Do NOT randomize topic order unless explicitly requested.

⭐ Textbook Alignment Requirement (CRITICAL)

For each topic or subtopic, question generation must follow textbook progression.

Mandatory Structure

First 2–3 questions MUST be based on concepts from the initial pages of the textbook section corresponding to that topic/subtopic.

Questions should reflect:

Definitions

Basic examples

Introductory exercises

Fundamental understanding

Later questions can:

Increase difficulty

Combine concepts

Use application-based problems

Educational Principle

Learning must mirror textbook pedagogy:

Concept Introduction → Basic Practice → Progressive Difficulty

Implementation Implication
if (i === 0) {
  // Introductory concept — textbook starting page level
}
else if (i === 1) {
  // Basic example — early textbook exercise
}
else if (i === 2) {
  // Foundational application
}


This applies to every topic set.

⭐ Randomized Numerical Values Requirement (NEW — MANDATORY)

All numerical values used in questions MUST be randomly generated.

Rules

Only the structure of the question remains fixed.

The numbers must change each time generateQuestions() runs.

Random numbers must:

Be educationally appropriate

Avoid extreme or impractical values

Produce clean answers when possible (integers or simple fractions)

Example

Instead of:

Solve: 12 + 8


Use:

const a = randInt(10, 20);
const b = randInt(5, 15);

Solve: a + b

Recommended Utility Function
const randInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

Educational Constraints

Randomization must ensure:

No division by zero

No impossible geometry

Reasonable difficulty for grade level

Consistent with textbook examples

Deterministic Topic Order + Random Numbers

Important distinction:

Element	Behavior
Topic order	Deterministic
Question concept	Deterministic
Numbers	Randomized
2. Component Implementation Standards

When creating or modifying practice components (.jsx files), adhere to the following:

Progressive Difficulty & Ordered Topics

Q1–Q10 MUST follow the exact sequence of subtopics provided.

Deterministic logic required:

if (i === 0) ...
else if (i === 1) ...


Difficulty should increase gradually within the same topic.

Answer Persistence Design
State Structure
const [answers, setAnswers] = useState({});

Storage Pattern

When checking an answer:

setAnswers(prev => ({
  ...prev,
  [qIndex]: {
    selectedOption,
    isCorrect: isRight
  }
}));

Restoration Hook

Use a useEffect dependent on [qIndex, answers] to restore:

selectedOption

isCorrect

isSubmitted

useEffect(() => {
  // restore answer state
}, [qIndex, answers]);

Modal Control (CRITICAL)

Use a separate useEffect dependent only on [qIndex]:

useEffect(() => {
  setShowExplanationModal(false);
}, [qIndex]);


This prevents modal closing when answers update.

Navigation Controls
Previous Button

Rules:

Enabled if qIndex > 0

Works even after submission

Must NOT reset state manually

const handlePrevious = () => {
  setQIndex(prev => prev - 1);
};


Restoration hook handles UI state.

Rich Content & Visual Standards
LatexContent

Wrap ALL math and question text:

<LatexContent content={questionText} />

Mascot Integration

Requirements:

Import mascotImg

Show mascot:

In feedback-mini for correct answers

Inside ExplanationModal

Detailed Solutions

Each question MUST include:

Step-by-step explanation

LaTeX formulas

Clear reasoning process

3. Chapter Test Standards
Mixed Question Pool

Chapter tests should:

Use shuffle/randomizer

Select questions from all subtopics

Unlike practice sessions, order is NOT fixed.

Persistence

Chapter tests MUST implement the same answer persistence pattern.

Scoring

Calculate score using:

const score =
  Object.values(answers).filter(val => val.isCorrect).length;

4. Integration
Syllabus Sync

Register component in:

MiddleGradeSyllabus.jsx

Routing

Ensure unique route exists in:

App.jsx

5. Summary Checklist for Verification

✔ Subtopics follow ordered sequence
✔ First 2–3 questions come from textbook initial pages
✔ Numbers are randomly generated
✔ Progressive difficulty maintained
✔ Answer persistence stores { selectedOption, isCorrect }
✔ Modal visibility decoupled from answer state
✔ Previous button allows full review
✔ Mascot present and imported
✔ LatexContent used consistently