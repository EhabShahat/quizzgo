import { Timer } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface QuestionCardProps {
  currentQuestion: any;
  currentQuestionIndex: number;
  questionsLength: number;
  timeLeft: number;
  handleAnswer: (answer: string) => void;
  colors: string[];
}

export const QuestionCard = ({
  currentQuestion,
  currentQuestionIndex,
  questionsLength,
  timeLeft,
  handleAnswer,
  colors
}: QuestionCardProps) => {
  const getButtonColors = () => {
    if (currentQuestion.type === 'true-false') {
      return ["#E21B3C", "#1368CE"]; // Red for True, Blue for False
    }
    return colors;
  };

  return (
    <div className="glass-card p-6 space-y-8">
      {/* Question Header */}
      <div className="flex justify-between items-center">
        <span className="text-white/90 text-lg">
          Question {currentQuestionIndex + 1}/{questionsLength}
        </span>
        <div className="flex items-center gap-2 bg-[#2D2D3A] px-4 py-2 rounded-full">
          <Timer className="w-4 h-4 text-white" />
          <span className="text-white font-bold">{timeLeft}s</span>
        </div>
      </div>

      {/* Question Text */}
      <h2 className="text-2xl font-bold text-white text-center">
        {currentQuestion.text}
      </h2>

      {/* Answer Options */}
      <div className={`grid gap-4 ${currentQuestion.type === 'true-false' ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {currentQuestion.options.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className="w-full p-6 rounded-xl text-white text-xl font-bold transition-transform hover:scale-105 text-center"
            style={{ backgroundColor: getButtonColors()[index] }}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <Progress 
          value={(timeLeft / currentQuestion.time_limit) * 100} 
          className="h-2 bg-white/20"
        />
      </div>
    </div>
  );
};