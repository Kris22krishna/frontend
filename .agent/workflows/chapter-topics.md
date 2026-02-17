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

Progressive Difficulty: Although subtopics are ordered, ensure within each subtopic/question, the complexity is appropriate (start simple).
Question Generation:
Create a loop (usually 10 questions) that deterministically selects the subtopic based on the index (e.g., Q1-Q2 for Subtopic 1, Q3-Q4 for Subtopic 2, etc.).
Ensure coverage of all listed subtopics.
Rich Content Rendering:
ALWAYS use 
LatexContent
 for rendering question text and options.
format: <LatexContent html={expression} />.
Detailed Solutions:
The solution property of the question object must be comprehensive.
Include step-by-step logic, formulas used, and final calculation.
Use LaTeX formatting ($...$$) for math equations.
Previous Button:
Implement a "Previous" button in the navigation controls.
It should be disabled when qIndex === 0 or when the session is submitted/finished (if applicable, though usually only 
Next
 changes state).
Styling:
Use the standard "Junior/Middle Practice" unique styling (vibrant colors, glassmorphism, lucide-react icons).
3. Chapter Test Component
Create a New Component: For every chapter, create a ChapterNameTest.jsx.
Aggregation: This component should import logic or re-implement generation to pull a random mix of questions from all the topics in that chapter.
Purpose: To test the student on the entire chapter after they finish individual topics.
4. Navigation & Integration
Update Syllabus: Register the new components (topics + chapter test) in the appropriate Grade Syllabus file (e.g., 
MiddleGradeSyllabus.jsx
).
Route: Ensure routes are correctly set up in the main 
App.jsx
 or router configuration.
5. Artifact Updates
Update 
task.md
: Check off progress.
Update 
walkthrough.md
: Document the new feature and verify the ordered progression.
Summary for User
When finishing the task, provide a brief summary confirming:

Ordered progression implemented.
Detailed solutions added.
Katex rendering used.
Previous button added.
Chapter Test created.