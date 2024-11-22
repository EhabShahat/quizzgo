import { Trash2, Edit2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Question } from "@/data/questions";

interface QuestionListProps {
  questions: Question[];
  onDelete: (id: number) => void;
  onEdit: (question: Question) => void;
  onQuestionsUpdate?: (questions: Question[]) => void;
}

const QuestionList = ({ questions, onDelete, onEdit, onQuestionsUpdate }: QuestionListProps) => {
  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('questions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      onDelete(id);
      toast.success("Question deleted successfully");
    } catch (error) {
      console.error('Error deleting question:', error);
      toast.error("Failed to delete question");
    }
  };

  return (
    <div className="glass-card p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Question List</h2>
      </div>
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
                      option === question.correct_answer
                        ? "text-green-400"
                        : "text-white/70"
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(question)}
                className="p-2 text-white/50 hover:text-blue-400 transition-colors"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(question.id)}
                className="p-2 text-white/50 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;