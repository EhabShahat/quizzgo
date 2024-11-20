export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  timeLimit: number; // in seconds
}

export const questions: Question[] = [
  {
    id: 1,
    text: "What is the capital of Japan?",
    options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
    correctAnswer: "Tokyo",
    timeLimit: 10,
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    timeLimit: 10,
  },
  {
    id: 3,
    text: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci",
    timeLimit: 10,
  },
  {
    id: 4,
    text: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    correctAnswer: "Pacific Ocean",
    timeLimit: 10,
  }
];