import { Trash2 } from "lucide-react";
import type { Question } from "@/data/questions";

interface QuestionListProps {
  questions: Question[];
  onDelete: (id: number) => void;
}

const QuestionList = ({ questions, onDelete }: QuestionListProps) => {
  return (
    <div className="glass-card p-6 mt-6">
      <h2 className="text-2xl font-bold text-white mb-4">Question List</h2>
      <div className="space-y-4">
        {questions.map((question) => (
          <div
            key={question.id}
            className="p-4 bg-white/5 rounded-lg border border-white/10 flex justify-between items-center group"
          >
            <div className="flex-1">
              <h3 className="text-white font-medium">{question.text}</h3>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`text-sm ${
                      option === question.correctAnswer
                        ? "text-green-400"
                        : "text-white/70"
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => onDelete(question.id)}
              className="p-2 text-white/50 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;