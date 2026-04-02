export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

export const physicsLogicQuiz: Question[] = [
  {
    id: 1,
    question: "What is the unit of Force in the International System of Units (SI)?",
    options: ["Joule", "Pascal", "Newton", "Watt"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "According to Newton's First Law of Motion, an object at rest will remain at rest unless acted upon by a...?",
    options: ["Friction", "Gravity", "External Unbalanced Force", "Momentum"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "If 1=5, 2=25, 3=125, then 4=625. What is 5 equal to?",
    options: ["5", "3125", "2500", "1"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Which of the following travels the fastest in a vacuum?",
    options: ["Sound", "Light", "Electricity", "Heat"],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Find the odd one out: Apple, Banana, Orange, Ferrari",
    options: ["Apple", "Banana", "Orange", "Ferrari"],
    correctAnswer: 3
  },
  {
    id: 6,
    question: "What is the formula for Momentum?",
    options: ["Mass x Gravity", "Mass x Velocity", "Force x Distance", "Work / Time"],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "If 'A' is the father of 'B', but 'B' is not the son of 'A', then what is the relationship of 'B' to 'A'?",
    options: ["Grandson", "Nephew", "Daughter", "Cousin"],
    correctAnswer: 2
  },
  {
    id: 8,
    question: "Which color of the visible spectrum has the shortest wavelength?",
    options: ["Red", "Green", "Blue", "Violet"],
    correctAnswer: 3
  },
  {
    id: 9,
    question: "If you have 3 apples and you take away 2, how many apples do you have?",
    options: ["1", "2", "3", "5"],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "A car covers 100km in 2 hours. What is its average speed?",
    options: ["200 km/h", "50 km/h", "25 km/h", "100 km/h"],
    correctAnswer: 1
  }
];
