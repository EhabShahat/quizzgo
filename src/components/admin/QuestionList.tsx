import { Trash2, Edit2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Question } from "@/data/questions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface QuestionListProps {
  questions: Question[];
  onEdit: (question: Question) => void;
  onQuestionsUpdate?: (questions: Question[]) => void;
}

const QuestionList = ({ questions, onEdit, onQuestionsUpdate }: QuestionListProps) => {
  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('questions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      if (onQuestionsUpdate) {
        onQuestionsUpdate(questions.filter(q => q.id !== id));
      }
      toast.success("Question deleted successfully");
    } catch (error) {
      console.error('Error deleting question:', error);
      toast.error("Failed to delete question");
    }
  };

  const handleDeleteAll = async () => {
    try {
      const { error } = await supabase
        .from('questions')
        .delete()
        .neq('id', 0); // This will delete all questions

      if (error) throw error;

      if (onQuestionsUpdate) {
        onQuestionsUpdate([]);
      }
      toast.success("All questions deleted successfully");
    } catch (error) {
      console.error('Error deleting all questions:', error);
      toast.error("Failed to delete all questions");
    }
  };

  return (
    <div className="glass-card p-4 sm:p-6 mt-6 w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Question List</h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <AlertTriangle className="w-4 h-4" />
              Delete All
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="sm:max-w-[425px]">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete all questions
                from the database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
              <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAll}
                className="bg-red-500 hover:bg-red-600 w-full sm:w-auto"
              >
                Delete All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {questions.map((question) => (
          <div
            key={question.id}
            className="bg-white/5 p-4 rounded-lg space-y-2 hover:bg-white/10 transition-colors"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1 space-y-1">
                <h3 className="text-white font-medium break-words">{question.text}</h3>
                <p className="text-white/60 text-sm">
                  Time limit: {question.time_limit} seconds
                </p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => onEdit(question)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white flex-1 sm:flex-none justify-center"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="sm:hidden">Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(question.id)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors flex-1 sm:flex-none justify-center"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="sm:hidden">Delete</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`p-2 rounded ${
                    option === question.correct_answer
                      ? "bg-green-500/20 text-green-400"
                      : "bg-white/5 text-white/80"
                  } text-sm break-words`}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        ))}
        {questions.length === 0 && (
          <div className="text-center text-white/60 py-8">
            No questions available. Add some questions to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionList;