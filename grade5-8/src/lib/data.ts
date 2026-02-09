export type QuestionType = 'mcq' | 'image' | 'input';

export interface Question {
  id: number;
  type: QuestionType;
  text: string;
  image?: string;
  options?: string[]; // For MCQ
  correctAnswer?: string;
  explanation?: string;
  hint?: string; // For input
}

export type AssessmentMode = 'junior' | 'senior';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    type: 'mcq',
    text: "Which of the following geometric shapes has the sum of interior angles equal to 360 degrees?",
    options: ["Triangle", "Square", "Pentagon", "Hexagon"],
    correctAnswer: "Square",
    explanation: "A square is a quadrilateral, and the sum of interior angles of any quadrilateral is 360 degrees. A triangle is 180 degrees, a pentagon is 540 degrees, and a hexagon is 720 degrees."
  },
  {
    id: 2,
    type: 'image',
    text: "Observe the biological diagram below. Which labeled part represents the nucleus?",
    image: "https://images.unsplash.com/photo-1698892289193-eb8b082ecce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZGlhZ3JhbSUyMGJpb2xvZ3klMjBjZWxsfGVufDF8fHx8MTc3MDIwMzQ2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    options: ["Part A", "Part B", "Part C", "Part D"],
    correctAnswer: "Part B",
    explanation: "The nucleus is typically the central, spherical organelle in a cell that contains genetic material. In this diagram, Part B points to this central structure."
  },
  {
    id: 3,
    type: 'input',
    text: "Calculate the velocity of a car traveling 100 meters in 5 seconds. Enter your answer in m/s.",
    hint: "Formula: Velocity = Distance / Time",
    correctAnswer: "20",
    explanation: "Velocity = Distance / Time = 100m / 5s = 20 m/s."
  },
  {
    id: 4,
    type: 'mcq',
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    explanation: "Paris is the capital and most populous city of France."
  },
  {
    id: 5,
    type: 'mcq',
    text: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    explanation: "Mars is often called the 'Red Planet' due to the reddish iron oxide prevalent on its surface."
  }
];

// Generate more dummy questions to fill the palette
for (let i = 6; i <= 30; i++) {
  QUESTIONS.push({
    id: i,
    type: 'mcq',
    text: `Sample question text for question #${i}. This is a placeholder to demonstrate the layout.`,
    options: ["Option A", "Option B", "Option C", "Option D"]
  });
}
