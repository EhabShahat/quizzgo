import { User } from "lucide-react";

interface RunnerUpProps {
  rank: number;
  name: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
}

export const RunnerUp = ({ rank, name, score, correctAnswers, totalQuestions }: RunnerUpProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-4 hover:bg-white/20 transition-all duration-300 transform hover:scale-102 hover:translate-x-1">
      <div className="bg-purple-500/20 p-2 rounded-full">
        <User className="w-6 h-6 text-purple-300" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-medium">{name}</h3>
          <span className="text-white/60 text-sm">#{rank}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/80">{score} points</span>
          <span className="text-white/60">
            {correctAnswers}/{totalQuestions} correct
          </span>
        </div>
      </div>
    </div>
  );
};