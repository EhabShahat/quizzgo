import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Save, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Question } from "@/data/questions";
import MultipleChoiceSection from "./question-form/MultipleChoiceSection";
import TrueFalseSection from "./question-form/TrueFalseSection";
import TimeLimitSection from "./question-form/TimeLimitSection";

interface QuestionFormProps {
  onSubmit: (question: Omit<Question, 'id' | 'created_at'>) => void;
  editingQuestion?: Question | null;
  onCancelEdit?: () => void;
}

const QuestionForm = ({ onSubmit, editingQuestion, onCancelEdit }: QuestionFormProps) => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("0");
  const [questionType, setQuestionType] = useState<'multiple-choice' | 'true-false'>('multiple-choice');
  const [trueFalseAnswer, setTrueFalseAnswer] = useState("True");
  const [timeLimit, setTimeLimit] = useState(5);

  useEffect(() => {
    if (editingQuestion) {
      setQuestionText(editingQuestion.text);
      setQuestionType(editingQuestion.type);
      setTimeLimit(editingQuestion.time_limit);
      
      if (editingQuestion.type === 'multiple-choice') {
        setOptions(editingQuestion.options);
        setCorrectAnswer(editingQuestion.options.indexOf(editingQuestion.correct_answer).toString());
      } else {
        setTrueFalseAnswer(editingQuestion.correct_answer);
      }
    }
  }, [editingQuestion]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const resetForm = () => {
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("0");
    setTrueFalseAnswer("True");
    setQuestionType('multiple-choice');
    setTimeLimit(5);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const questionData: Omit<Question, 'id' | 'created_at'> = {
      text: questionText,
      options: questionType === 'true-false' ? ["True", "False"] : options,
      correct_answer: questionType === 'true-false' ? trueFalseAnswer : options[parseInt(correctAnswer)],
      time_limit: timeLimit,
      type: questionType
    };

    onSubmit(questionData);
    resetForm();
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">
        {editingQuestion ? "Edit Question" : "Add New Question"}
      </h2>
      
      <Tabs value={questionType} onValueChange={(value) => setQuestionType(value as 'multiple-choice' | 'true-false')}>
        <TabsList className="bg-white/5 border-white/10">
          <TabsTrigger value="multiple-choice" className="data-[state=active]:bg-white/10">
            Multiple Choice
          </TabsTrigger>
          <TabsTrigger value="true-false" className="data-[state=active]:bg-white/10">
            True/False
          </TabsTrigger>
        </TabsList>

        <div className="space-y-4 mt-4">
          <Label htmlFor="question" className="text-white">Question</Label>
          <Input
            id="question"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Enter question"
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
            required
          />

          <TimeLimitSection 
            timeLimit={timeLimit}
            onTimeLimitChange={setTimeLimit}
          />
        </div>

        <TabsContent value="multiple-choice">
          <MultipleChoiceSection
            options={options}
            correctAnswer={correctAnswer}
            onOptionChange={handleOptionChange}
            onCorrectAnswerChange={setCorrectAnswer}
          />
        </TabsContent>

        <TabsContent value="true-false">
          <TrueFalseSection
            value={trueFalseAnswer}
            onChange={setTrueFalseAnswer}
          />
        </TabsContent>
      </Tabs>

      <div className="flex gap-4 flex-col">
        <button
          type="button"
          onClick={resetForm}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Clear Form
        </button>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-lg py-3 flex items-center justify-center gap-2 transition-colors"
          >
            {editingQuestion ? (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Add Question
              </>
            )}
          </button>
          {editingQuestion && onCancelEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white rounded-lg py-3"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default QuestionForm;