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
    question: "What is the value of the acceleration due to gravity (g) on the surface of the Earth?",
    options: ["8.9 m/s²", "9.8 m/s²", "10.5 m/s²", "6.7 m/s²"],
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
    question: "Which of the following is NOT one of the main states of matter?",
    options: ["Solid", "Liquid", "Gas", "Vacuum"],
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
    question: "Which gas is primarily absorbed by plants during the process of photosynthesis?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "Which color of the visible spectrum has the shortest wavelength?",
    options: ["Red", "Green", "Blue", "Violet"],
    correctAnswer: 3
  },
  {
    id: 9,
    question: "What is the pH level of chemically pure, neutral water at 25 °C?",
    options: ["5.0", "7.0", "9.0", "14.0"],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "A car covers 100km in 2 hours. What is its average speed?",
    options: ["200 km/h", "50 km/h", "25 km/h", "100 km/h"],
    correctAnswer: 1
  }
];

