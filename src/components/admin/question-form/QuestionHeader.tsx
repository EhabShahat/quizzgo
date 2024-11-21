import { Question } from "@/data/questions";

interface QuestionHeaderProps {
  editingQuestion: Question | null;
}

const QuestionHeader = ({ editingQuestion }: QuestionHeaderProps) => {
  return (
    <h2 className="text-2xl font-bold text-white">
      {editingQuestion ? "Edit Question" : "Add New Question"}
    </h2>
  );
};

export default QuestionHeader;