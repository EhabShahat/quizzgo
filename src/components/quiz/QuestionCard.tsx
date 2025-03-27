
import { Timer } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect } from "react";
import { playTickSound } from "@/utils/audio";

interface QuestionCardProps {
  currentQuestion: any;
  currentQuestionIndex: number;
  questionsLength: number;
  timeLeft: number;
  totalTime: number; // New prop for total time
  handleAnswer: (answer: string) => void;
  colors: string[];
}

export const QuestionCard = ({
  currentQuestion,
  currentQuestionIndex,
  questionsLength,
  timeLeft,
  totalTime, // Use this to calculate percentage
  handleAnswer,
  colors
}: QuestionCardProps) => {
  const getButtonColors = () => {
    if (currentQuestion.type === 'true-false') {
      return ["#E21B3C", "#1368CE"]; // Red for True, Blue for False
    }
    return colors;
  };
  
  // Add sound effect logic based on timer progress
  useEffect(() => {
    // Calculate progress percentage
    const progressPercentage = (timeLeft / totalTime) * 100;
    
    // Play ticking sound when timer reaches 75% or less
    if (progressPercentage <= 75 && progressPercentage > 0) {
      playTickSound();
    }
  }, [timeLeft, totalTime]);

  return (
    <div className="glass-card p-4 sm:p-6 space-y-4 sm:space-y-8 w-full max-w-[95vw] sm:max-w-2xl mx-auto">
      {/* Question Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-white/90 text-base sm:text-lg">
          Question {currentQuestionIndex + 1}/{questionsLength}
        </span>
        <div className="flex items-center gap-2 bg-[#2D2D3A] px-3 sm:px-4 py-2 rounded-full">
          <Timer className="w-4 h-4 text-white" />
          <span className="text-white font-bold">{timeLeft}s</span>
        </div>
      </div>

      {/* Question Text */}
      <h2 className="text-xl sm:text-2xl font-bold text-white text-center px-2">
        {currentQuestion.text}
      </h2>

      {/* Answer Options */}
      <div className={`grid gap-3 sm:gap-4 ${currentQuestion.type === 'true-false' ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {currentQuestion.options.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className="w-full p-4 sm:p-6 rounded-xl text-white text-lg sm:text-xl font-bold transition-transform hover:scale-105 text-center break-words"
            style={{ backgroundColor: getButtonColors()[index] }}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-2 sm:mt-4">
        <Progress 
          value={(timeLeft / totalTime) * 100} 
          className="h-2 bg-white/20"
        />
      </div>
    </div>
  );
};
