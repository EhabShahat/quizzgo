export interface Question {
  id: number;
  text: string;
  options: string[];
  correct_answer: string;
  timeLimit: number;
  type: 'multiple-choice' | 'true-false';
}

export const questions: Question[] = [
  {
    id: 1,
    text: "What is the capital of Japan?",
    options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
    correct_answer: "Tokyo",
    timeLimit: 5,
    type: "multiple-choice"
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct_answer: "Mars",
    timeLimit: 5,
    type: "multiple-choice"
  },
  {
    id: 3,
    text: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correct_answer: "Leonardo da Vinci",
    timeLimit: 5,
    type: "multiple-choice"
  },
  {
    id: 4,
    text: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    correct_answer: "Pacific Ocean",
    timeLimit: 5,
    type: "multiple-choice"
  },
  {
    id: 5,
    text: "Is the Earth flat?",
    options: ["True", "False"],
    correct_answer: "False",
    timeLimit: 5,
    type: "true-false"
  }
];